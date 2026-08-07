import { useEffect, useMemo, useState } from 'react'
import QRCode from 'qrcode'

// QR code render options — pure, high-contrast, generous quiet zone.
// - Level H (30% error correction) for reliable scanning.
// - Black modules on a pure white background (no gradients/transparency).
// - margin 4 = the standard 4-module quiet zone, baked into the SVG.
// - crispEdges for sharp, square modules (qrcode emits this itself).
// Full `width`/`height` attributes are set so the SVG is its own integer size
// and the browser never stretches a small raster.

/**
 * Builds the URL the Builder ID QR encodes. It must be a real, publicly
 * reachable URL (scanned from a phone over cellular data) — never a dev-host.
 *
 * Resolution order:
 *   1. VITE_SITE_URL — primary, Vite-native production URL. Setting this pins
 *      the QR to your canonical deployment regardless of where the builder is
 *      rendered (even a local preview). See `.env.example`.
 *   2. VITE_APP_URL  — legacy fallback already used for the X share link.
 *   3. window.location.origin — safe in production (equals the deployed
 *      domain); only wrong when served from localhost during local dev, which
 *      is harmless — a warning is logged so it's never silent.
 */
export function buildQrPayload(builderId = 'HH-000') {
  const siteUrl =
    import.meta.env.VITE_SITE_URL || import.meta.env.VITE_APP_URL || ''

  const base = siteUrl
    ? siteUrl.trim()
    : typeof window !== 'undefined'
      ? window.location.origin
      : ''

  if (!/^https?:\/\//i.test(base)) {
    // eslint-disable-next-line no-console
    console.warn(`[Builder QR] URL "${base}" is not http(s); the QR may be unscannable.`)
  }
  if (!siteUrl && import.meta.env.PROD) {
    // eslint-disable-next-line no-console
    console.warn(
      `[Builder QR] Using runtime origin "${base}". Set VITE_SITE_URL to pin the QR to a canonical public URL.`,
    )
  }

  return `${base.replace(/\/+$/g, '')}/?builder=${encodeURIComponent(builderId)}`
}

/**
 * A real, scannable QR for the Builder ID. Encodes the builder's app URL with
 * the Builder number, rendered as a vector SVG that stays pixel-perfect both
 * on-screen and inside the exported high-resolution Builder ID.
 */
export default function BuilderQR({ size = 220, builderId = 'HH-000' }) {
  const payload = useMemo(() => buildQrPayload(builderId), [builderId])
  const [svg, setSvg] = useState('')

  useEffect(() => {
    let cancelled = false
    // Dev/verification log of the encoded payload.
    // eslint-disable-next-line no-console
    console.debug('[Builder QR] payload:', payload)

    QRCode.toString(payload, {
      type: 'svg',
      errorCorrectionLevel: 'H',
      margin: 4,
      width: size,
      height: size,
      color: { dark: '#000000', light: '#ffffff' },
    })
      .then((value) => {
        if (!cancelled) setSvg(value)
      })
      .catch((error) => {
        console.error('[Builder QR] generation failed:', error)
      })
    return () => {
      cancelled = true
    }
  }, [payload, size])

  return (
    <div
      aria-hidden="true"
      className="grid place-items-center"
      style={{
        width: size,
        height: size,
        background: '#ffffff',
        borderRadius: 4,
        overflow: 'hidden',
      }}
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  )
}