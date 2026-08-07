// exportImage.ts — single reusable high-resolution PNG export utility.
//
// The exportable canvases (FrameCanvas 1080x1080, BuilderCardCanvas 1080x1350)
// are rendered at their native size and only scaled down for preview via a CSS
// transform on their wrapper. Browser screenshotting must therefore target a
// transform-free, native-size copy of the element.
//
// html2canvas (~200 kB) is loaded on demand on the first export so it never
// bloats the initial bundle. The export buttons surface a loading state while
// the chunk resolves.
//
// Resolution strategy: the export target is a FIXED canvas, independent of
// the user's display. Each asset is specified at its base resolution (the
// design size, e.g. 1080x1080) and exported at `EXPORT_RESOLUTION` x larger —
// 2x default means 2160x2160 for the frame and 2160x2700 for the Builder ID on
// every device, whatever the screen size or devicePixelRatio. Output is fixed,
// crisp and identical to the on-screen design.
//
// Capturing at the target multiplier and emitting at the exact same canvas
// resolution means nothing is unnecessarily resampled, so transparency,
// gradients, shadows and borders are preserved exactly. For PNG exports the
// source image is the design itself (no lossy compression), keeping text and
// QR modules sharp; supersampled captures are downscaled with high-quality
// smoothing only when a caller asks for a smaller output.

export type ExportSpec = {
  width: number
  height: number
  filename: string
}

type CaptureOptions = {
  /** Output resolution multiplier (>= 1). 2x = double the design size. */
  scale?: number
}

/** Canonical export specs keyed by asset (base/design resolution). */
export const EXPORT_SPECS: Record<string, ExportSpec> = {
  frame: { width: 1080, height: 1080, filename: 'profile-frame.png' },
  builder: { width: 1080, height: 1350, filename: 'builder-id.png' },
}

/**
 * Fixed export resolution multiplier. Always 2x so every export is high
 * resolution (2160x2160 frame / 2160x2700 Builder ID) on any device, without
 * relying on window.devicePixelRatio.
 */
export const EXPORT_RESOLUTION = 2

/**
 * Minimum and maximum allowed multipliers, in case a caller asks for a custom
 * output size (1x base, and a high cap for very large prints).
 */
export const EXPORT_MIN_RESOLUTION = 1
export const EXPORT_MAX_RESOLUTION = 4

/**
 * Picks the fixed output multiplier: an explicit value wins (clamped to a sane
 * range); otherwise the constant 2x default is used.
 */
export function resolveOutputScale(scale?: number): number {
  if (typeof scale === 'number' && Number.isFinite(scale) && scale >= 1) {
    return Math.min(EXPORT_MAX_RESOLUTION, Math.max(EXPORT_MIN_RESOLUTION, Math.round(scale)))
  }
  return EXPORT_RESOLUTION
}

// html2canvas is loaded on demand on the first export rather than in the
// initial bundle.
function loadHtml2canvas(): Promise<typeof import('html2canvas').default> {
  return import('html2canvas').then((mod) => mod.default)
}

/**
 * Waits until everything the capture needs is ready: web fonts (so custom
 * fonts like Fraunces / JetBrains Mono / Caveat are fully loaded), every
 * <img> (loaded or errored, so a broken src can never hang the export) and a
 * layout frame (so gradients, shadows and the photo position are settled).
 */
async function waitForAssets(root: HTMLElement): Promise<void> {
  if (document.fonts?.ready) {
    try {
      await document.fonts.ready
    } catch {
      /* fonts API unavailable — continue */
    }
  }

  const images = Array.from(root.querySelectorAll('img'))
  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) return resolve()
          img.addEventListener('load', () => resolve(), { once: true })
          img.addEventListener('error', () => resolve(), { once: true })
        }),
    ),
  )

  // Give the compositor one extra frame so box-shadows, transforms and
  // rounded corners are rasterized before capture.
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
}

/**
 * Deep-clones an export target into an off-screen, native-size, transform-free
 * copy. Cloning isolates the export from the preview's CSS scale transform and
 * any surrounding layout so nothing shifts after export.
 */
function cloneForExport(node: HTMLElement): HTMLElement {
  const clone = node.cloneNode(true) as HTMLElement
  const style = clone.style
  style.position = 'fixed'
  style.left = '-10000px'
  style.top = '0'
  style.width = `${node.offsetWidth}px`
  style.height = `${node.offsetHeight}px`
  style.transform = 'none'
  style.margin = '0'
  style.pointerEvents = 'none'
  clone.setAttribute('aria-hidden', 'true')
  clone.removeAttribute('role')
  return clone
}

/**
 * Captures an element into a canvas via html2canvas, supersampled and with
 * transparency preserved. The element is rendered at its native size times
 * `scale`; no DOM queries — callers pass the element reference directly.
 *
 * @returns a canvas at (element native size × scale) resolution.
 */
export async function captureCanvasElement(
  node: HTMLElement | null | undefined,
  options: CaptureOptions = {},
): Promise<HTMLCanvasElement> {
  if (!node) throw new Error('Export target is not ready yet.')

  const scale = resolveOutputScale(options.scale)
  const clone = cloneForExport(node)
  document.body.appendChild(clone)

  try {
    await waitForAssets(clone)
    const html2canvas = await loadHtml2canvas()
    return await html2canvas(clone, {
      scale,
      backgroundColor: null, // keep rounded-corner transparency
      useCORS: true, // draw cross-origin images (e.g. blob photo URLs)
      allowTaint: false, // never silently taint the canvas
      logging: false,
      imageTimeout: 15000,
      removeContainer: true,
    })
  } finally {
    if (clone.parentNode) clone.parentNode.removeChild(clone)
  }
}

/**
 * Returns a canvas exactly `width` x `height`. Supersampled captures are
 * downscaled with high-quality smoothing; already-matching canvases are
 * returned unchanged (no quality loss).
 */
export function fitToSize(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
): HTMLCanvasElement {
  if (canvas.width === width && canvas.height === height) return canvas

  const out = document.createElement('canvas')
  out.width = width
  out.height = height
  const ctx = out.getContext('2d')
  if (ctx) {
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(canvas, 0, 0, width, height)
  }
  return out
}

/**
 * Lossless PNG blob from a canvas. PNG is never re-compressed, so text, QR
 * modules and gradients stay sharp with zero compression artifacts.
 */
export function canvasToBlob(canvas: HTMLCanvasElement, type = 'image/png'): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Could not encode the export as a PNG.'))
    }, type)
  })
}

/** Triggers a browser download of a canvas as a lossless PNG. */
export async function downloadCanvas(canvas: HTMLCanvasElement, filename: string): Promise<void> {
  const blob = await canvasToBlob(canvas)
  downloadBlob(blob, filename)
}

/** Triggers a browser download of a Blob. */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  // Revoke on the next tick so the download has time to start.
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/**
 * Captures and downloads a single asset at its fixed high resolution:
 * (spec.width × scale) by (spec.height × scale). With the default 2x this is
 * 2160x2160 for the profile frame and 2160x2700 for the Builder ID.
 *
 * @param node     the canvas element (FrameCanvas or BuilderCardCanvas root)
 * @param spec     export spec ({ width, height, filename })
 * @param options  optional capture options (e.g. scale)
 */
export async function exportElement(
  node: HTMLElement | null | undefined,
  spec: ExportSpec,
  options: CaptureOptions = {},
): Promise<void> {
  const scale = resolveOutputScale(options.scale)
  const canvas = await captureCanvasElement(node, { scale })
  const width = Math.round(spec.width * scale)
  const height = Math.round(spec.height * scale)
  await downloadCanvas(fitToSize(canvas, width, height), spec.filename)
}

/**
 * Captures an asset and returns it as a ready-to-share PNG File at the fixed
 * high resolution. Used by the Web Share API flow.
 */
export async function elementToFile(
  node: HTMLElement | null | undefined,
  spec: ExportSpec,
  options: CaptureOptions = {},
): Promise<File> {
  const scale = resolveOutputScale(options.scale)
  const canvas = await captureCanvasElement(node, { scale })
  const width = Math.round(spec.width * scale)
  const height = Math.round(spec.height * scale)
  const blob = await canvasToBlob(fitToSize(canvas, width, height))
  return new File([blob], spec.filename, { type: 'image/png' })
}

/** Captures and downloads the profile frame at 2160x2160 PNG (2x). */
export async function exportFrame(node: HTMLElement | null | undefined): Promise<void> {
  await exportElement(node, EXPORT_SPECS.frame)
}

/** Captures and downloads the Builder ID card at 2160x2700 PNG (2x). */
export async function exportBuilderCard(node: HTMLElement | null | undefined): Promise<void> {
  await exportElement(node, EXPORT_SPECS.builder)
}

/**
 * Downloads both assets in sequence. Each export is isolated so a failure on
 * one never blocks the other. Resolves with an array of per-asset results:
 * either the asset key, or `{ key, error }` on failure.
 */
export async function exportAll({
  frameNode,
  builderNode,
}: {
  frameNode: HTMLElement | null | undefined
  builderNode: HTMLElement | null | undefined
}): Promise<Array<string | { key: string; error: Error }>> {
  const exports = [
    { key: 'frame', run: () => exportFrame(frameNode) },
    { key: 'builder', run: () => exportBuilderCard(builderNode) },
  ]

  const results: Array<string | { key: string; error: Error }> = []
  for (const { key, run } of exports) {
    try {
      await run()
      results.push(key)
    } catch (error) {
      results.push({ key, error: error instanceof Error ? error : new Error(String(error)) })
    }
  }
  return results
}
