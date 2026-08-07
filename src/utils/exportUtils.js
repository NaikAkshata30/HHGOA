// exportUtils.js — capture and download the generated canvases as PNGs.
// The canvas components always render at their native size (FrameCanvas
// 1080x1080, BuilderCardCanvas 1080x1350) and are only scaled down for preview
// via a CSS transform on their wrapper. html2canvas measures the target's
// on-screen bounding box, so we clone the target, move the clone off-screen at
// native size, capture that clone at 2x and downscale to the exact target
// resolution. Supersampling (2x -> target) keeps text, gradients and edges crisp.

// html2canvas is ~200 kB, so it is loaded on demand on the first export rather
// than in the initial bundle. The export buttons already surface a loading
// state while this chunk resolves.
function loadHtml2canvas() {
  return import('html2canvas').then((mod) => mod.default)
}

// Internal capture resolution multiplier. Rendering at 2x then downscaling to
// the target size gives clean anti-aliasing on text and strokes.
export const EXPORT_QUALITY_SCALE = 2

// Canonical export specs keyed by asset.
export const EXPORT_SPECS = {
  frame: { width: 1080, height: 1080, filename: 'hh-goa-profile-frame.png' },
  builder: { width: 1080, height: 1350, filename: 'hh-goa-builder-id.png' },
}

// Waits for web fonts and images so nothing renders blank or fuzzy at capture
// time. Resolves once every image has loaded or errored, so a broken src can
// never hang the export.
async function waitForAssets(root) {
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
        new Promise((resolve) => {
          if (img.complete) return resolve()
          img.addEventListener('load', resolve, { once: true })
          img.addEventListener('error', resolve, { once: true })
        }),
    ),
  )
}

// Deep-clones an export target into an off-screen, native-size, transform-free
// copy. Cloning isolates the export from the preview's CSS scale transform and
// any surrounding layout.
function cloneForExport(node) {
  const clone = node.cloneNode(true)
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
 * Captures an element into a canvas via html2canvas.
 * The element is rendered at its native size times `scale`; no DOM queries —
 * callers pass the element reference directly.
 *
 * @param {HTMLElement} node element to capture
 * @param {{ scale?: number }} [options]
 * @returns {Promise<HTMLCanvasElement>} captured canvas
 */
export async function captureCanvasElement(node, { scale = EXPORT_QUALITY_SCALE } = {}) {
  if (!node) throw new Error('Export target is not ready yet.')

  const clone = cloneForExport(node)
  document.body.appendChild(clone)

  try {
    await waitForAssets(clone)
    const html2canvas = await loadHtml2canvas()
    return await html2canvas(clone, {
      scale,
      backgroundColor: null, // keep rounded-corner transparency
      useCORS: true,
      allowTaint: false,
      logging: false,
      imageTimeout: 15000,
      removeContainer: true,
    })
  } finally {
    if (clone.parentNode) clone.parentNode.removeChild(clone)
  }
}

/**
 * Returns a canvas exactly width x height. Supersampled captures are
 * downscaled with high-quality smoothing; already-matching canvases are
 * returned unchanged.
 */
export function fitToSize(canvas, width, height) {
  if (canvas.width === width && canvas.height === height) return canvas

  const out = document.createElement('canvas')
  out.width = width
  out.height = height
  const ctx = out.getContext('2d')
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(canvas, 0, 0, width, height)
  return out
}

/**
 * Triggers a browser download of a canvas as a lossless PNG.
 */
export function downloadCanvas(canvas, filename) {
  const link = document.createElement('a')
  link.href = canvas.toDataURL('image/png')
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Captures, resizes and downloads the profile frame (1080x1080 PNG).
 * @param {HTMLElement} node the FrameCanvas element
 */
export async function exportFrame(node) {
  const spec = EXPORT_SPECS.frame
  const canvas = await captureCanvasElement(node)
  downloadCanvas(fitToSize(canvas, spec.width, spec.height), spec.filename)
}

/**
 * Captures, resizes and downloads the Builder ID card (1080x1350 PNG).
 * @param {HTMLElement} node the BuilderCardCanvas element
 */
export async function exportBuilderCard(node) {
  const spec = EXPORT_SPECS.builder
  const canvas = await captureCanvasElement(node)
  downloadCanvas(fitToSize(canvas, spec.width, spec.height), spec.filename)
}

/**
 * Downloads both assets in sequence. Each export is isolated so a failure on
 * one never blocks the other. Resolves with an array of per-asset results:
 * either the asset key, or `{ key, error }` on failure.
 *
 * @param {{ frameNode: HTMLElement, builderNode: HTMLElement }} nodes
 * @returns {Promise<Array<string | { key: string, error: Error }>>}
 */
export async function exportAll({ frameNode, builderNode }) {
  const exports = [
    { key: 'frame', run: () => exportFrame(frameNode) },
    { key: 'builder', run: () => exportBuilderCard(builderNode) },
  ]

  const results = []
  for (const { key, run } of exports) {
    try {
      await run()
      results.push(key)
    } catch (error) {
      results.push({ key, error })
    }
  }
  return results
}
