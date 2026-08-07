import { memo, useId } from 'react'

const toNumber = (value, fallback) => {
  const num = Number(value)
  return typeof value === 'number' && Number.isFinite(num) ? num : fallback
}

/**
 * Outline palm frond used as tropical decoration. Generates a midrib plus
 * alternating leaflets so it reads as a stylized frond. Color comes from
 * `currentColor`, so set it via className/style on the caller.
 */
export const PalmLeaf = memo(function PalmLeaf({ className = '', style, size = 320 }) {
  const x0 = 28
  const y0 = 292
  const x1 = 292
  const y1 = 28
  const dx = x1 - x0
  const dy = y1 - y0
  const length = Math.hypot(dx, dy)
  const ux = dx / length
  const uy = dy / length
  const px = -uy
  const py = ux

  const leaflets = []
  const count = 15
  for (let i = 0; i < count; i++) {
    const t = (i + 0.5) / count
    const baseX = x0 + ux * length * t
    const baseY = y0 + uy * length * t
    const side = i % 2 === 0 ? 1 : -1
    const growth = Math.sin(t * Math.PI)
    const leafLength = 30 + 92 * growth
    const tipX = baseX + px * side * leafLength - ux * 16
    const tipY = baseY + py * side * leafLength - uy * 16
    const ctrlX = baseX + px * side * leafLength * 0.62
    const ctrlY = baseY + py * side * leafLength * 0.62
    leaflets.push(
      `M ${baseX.toFixed(1)} ${baseY.toFixed(1)} Q ${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)}`,
    )
  }

  return (
    <svg
      viewBox="0 0 320 320"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M 28 292 Q 150 168 292 28" />
      {leaflets.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
})

/**
 * Organic blob built from harmonically-modulated radii. Set `harmonics` as an
 * array of [frequency, amplitude] pairs to reshape the silhouette. Color comes
 * from `currentColor`.
 */
export const BlobShape = memo(function BlobShape({
  className = '',
  style,
  size = 320,
  harmonics = [
    [3, 14],
    [5, -8],
    [7, 5],
  ],
}) {
  const cx = size / 2
  const cy = size / 2
  const baseRadius = size * 0.34
  const points = 90
  let path = ''
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2
    let radius = baseRadius
    for (const [freq, amp] of harmonics) radius += amp * Math.sin(freq * angle + 1)
    const x = cx + radius * Math.cos(angle)
    const y = cy + radius * Math.sin(angle)
    path += `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)} `
  }
  path += 'Z'

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  )
})

/**
 * Decorative L-shaped corner bracket drawn as an SVG stroke. Color comes from
 * `currentColor`; flip with `scaleX`/`scaleY` transforms as needed.
 */
export const CornerBracket = memo(function CornerBracket({
  className = '',
  style,
  size = 64,
  strokeWidth = 3,
  radius = 18,
}) {
  const half = strokeWidth / 2
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d={`M ${size - radius} ${half} H ${half} V ${size - radius}`} />
    </svg>
  )
})

/**
 * Dot grid rendered as a tiled SVG pattern. Each instance gets a unique pattern
 * id so multiple grids can coexist on one canvas.
 */
export const DotGrid = memo(function DotGrid({
  className = '',
  style,
  spacing = 28,
  dotSize = 1.6,
  color = 'rgba(255, 255, 255, 0.5)',
  opacity = 1,
}) {
  const id = useId()
  const gridId = `dot-grid-${id}`
  return (
    <svg width="100%" height="100%" className={className} style={style} aria-hidden="true">
      <defs>
        <pattern id={gridId} width={spacing} height={spacing} patternUnits="userSpaceOnUse">
          <circle cx={spacing / 2} cy={spacing / 2} r={dotSize} fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${gridId})`} opacity={opacity} />
    </svg>
  )
})

const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='linear' slope='0.55'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`

const NOISE_DATA_URI = `url("data:image/svg+xml;utf8,${encodeURIComponent(NOISE_SVG)}")`

/**
 * Subtle film-grain overlay. Rendered as a tiled SVG turbulence image so it
 * captures cleanly and blends over the whole canvas.
 */
export const Grain = memo(function Grain({ className = '', style, opacity = 0.08 }) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ ...style, backgroundImage: NOISE_DATA_URI, backgroundSize: '140px 140px', opacity: toNumber(opacity, 0.08) }}
    />
  )
})

/**
 * Deterministic builder pass number shared by the export canvases, e.g.
 * "HH-047". Derived from the identity fields so the number stays consistent
 * across the profile frame and the Builder ID card and updates live.
 */
export function buildBuilderId(name = '', stack = '') {
  const seed = `${name}|${stack}`
  let hash = 2166136261
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  const num = (hash >>> 0) % 1000
  return `HH-${String(num).padStart(3, '0')}`
}

/** Stacked calm-water wave lines. Color via `currentColor`. */
export const WaveLines = memo(function WaveLines({ className = '', style, size = 320, waves = 3 }) {
  const paths = []
  for (let i = 0; i < waves; i++) {
    const y = 12 + i * 13
    paths.push(`M 0 ${y} Q 40 ${y - 6} 80 ${y} T 160 ${y} T 240 ${y} T 320 ${y}`)
  }
  return (
    <svg
      viewBox="0 0 320 52"
      width={size}
      height={size * 0.16}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
})

/** Organic coastline contour — a drifting survey line. Color via `currentColor`. */
export const Coastline = memo(function Coastline({ className = '', style, size = 360 }) {
  return (
    <svg
      viewBox="0 0 360 64"
      width={size}
      height={size * 0.18}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M 2 30 C 16 6 28 46 44 34 C 60 22 70 8 86 22 C 100 34 112 26 126 34 C 142 44 158 14 174 24 C 190 34 204 44 220 30 C 236 16 250 34 266 28 C 282 20 296 32 314 22 C 328 14 344 30 358 16" />
    </svg>
  )
})

/** A few flying birds drawn as minimal arcs. Color via `currentColor`. */
export const Birds = memo(function Birds({ className = '', style, size = 84 }) {
  return (
    <svg
      viewBox="0 0 84 36"
      width={size}
      height={size * 0.43}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M8 26 Q 15 20 22 26 Q 29 20 36 26" />
      <path d="M30 14 Q 36 9 42 14 Q 48 9 54 14" />
      <path d="M54 28 Q 60 23 66 28 Q 72 23 78 28" />
    </svg>
  )
})

/** Tiny sailing-boat silhouette. Color via `currentColor`. */
export const Boat = memo(function Boat({ className = '', style, size = 64 }) {
  return (
    <svg
      viewBox="0 0 64 40"
      width={size}
      height={size * 0.62}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M6 20 H 58 L 48 30 H 16 Z" />
      <path d="M31 20 V 5 M31 5 L 43 15 M31 5 L 20 14" />
      <path d="M14 35 Q 24 31 32 35 Q 40 39 50 35" />
    </svg>
  )
})

/** Thin flowing wave rule used as a premium divider. Color via `currentColor`. */
export const WaveRule = memo(function WaveRule({ className = '', style, flip = false }) {
  return (
    <svg
      className={`block w-full ${className}`}
      style={style}
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        d={
          flip
            ? 'M0 12 Q 60 18 120 12 T 240 12 T 360 12 T 480 12 T 600 12 T 720 12 T 840 12 T 960 12 T 1080 12 T 1200 12'
            : 'M0 12 Q 60 6 120 12 T 240 12 T 360 12 T 480 12 T 600 12 T 720 12 T 840 12 T 960 12 T 1080 12 T 1200 12'
        }
      />
    </svg>
  )
})

/**
 * Rubber-ink travel stamp: double circle (dashed inner ring) with centered mono
 * text. Built from plain divs so it rasterizes reliably in html2canvas. Color
 * and lines are props; rotate via the `rotate` prop (degrees).
 */
export const TravelStamp = memo(function TravelStamp({
  className = '',
  style,
  size = 260,
  lines = ['GOA EXPLORER', 'OFFICIAL BUILDER', 'SEASON 2026'],
  color = '#C23B2E',
  rotate = 0,
}) {
  const fontSize = Math.max(13, Math.round(size * 0.066))
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        ...style,
        width: size,
        height: size,
        borderRadius: '50%',
        border: `2.5px solid ${color}`,
        boxShadow: `inset 0 0 0 1.5px ${color}`,
        background: `${color}12`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Math.round(size * 0.03),
        padding: '0 16%',
        textAlign: 'center',
        opacity: 0.92,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 9,
          borderRadius: '50%',
          border: `1.5px dashed ${color}`,
          opacity: 0.75,
        }}
      />
      {lines.map((line) => (
        <p
          key={line}
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontWeight: 700,
            fontSize,
            lineHeight: 1.12,
            letterSpacing: '0.14em',
            color,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {line}
        </p>
      ))}
    </div>
  )
})

/**
 * Stylized QR placeholder — a deterministic 9x9 matrix with classic finder
 * patterns, seeded from a number so each identity gets its own pattern. SVG
 * rects only, export-safe. Color via the `color` prop.
 */
export const QRPlaceholder = memo(function QRPlaceholder({
  className = '',
  style,
  size = 210,
  seed = 0,
  color = '#0F5A3A',
}) {
  const N = 9
  const cell = 9
  const origin = 9
  const rects = []
  let state = (seed >>> 0) || 0x9e3779b9
  const rnd = () => {
    state = (Math.imul(state, 48271) % 2147483647) >>> 0
    return state / 2147483647
  }
  const isFinder = (r, c) =>
    (r <= 2 && c <= 2) || (r <= 2 && c >= 6) || (r >= 6 && c <= 2)
  const finderDark = (r, c) => {
    const lr = r % 3
    const lc = c % 3
    return lr === 0 || lr === 2 || lc === 0 || lc === 2 || (lr === 1 && lc === 1)
  }
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const dark = isFinder(r, c) ? finderDark(r, c) : rnd() < 0.46
      if (!dark) continue
      rects.push(
        <rect
          key={`${r}-${c}`}
          x={origin + c * cell}
          y={origin + r * cell}
          width={cell}
          height={cell}
          fill={color}
        />,
      )
    }
  }
  return (
    <svg
      viewBox="0 0 99 99"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
    >
      {rects}
    </svg>
  )
})

/**
 * Hand-illustrated monstera leaf in line-art: broad paddle outline with split
 * fenestrations, midrib and veins. Color via `currentColor`.
 */
export const Monstera = memo(function Monstera({ className = '', style, size = 240 }) {
  return (
    <svg
      viewBox="0 0 240 240"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M120 28 C 64 34 32 82 38 132 C 44 180 78 206 120 210 C 162 206 196 180 202 132 C 208 82 176 34 120 28 Z" />
      <path d="M38 94 Q 64 100 70 118" />
      <path d="M36 124 Q 62 130 68 148" />
      <path d="M42 154 Q 64 158 68 170" />
      <path d="M202 94 Q 176 100 170 118" />
      <path d="M204 124 Q 178 130 172 148" />
      <path d="M198 154 Q 176 158 172 170" />
      <path d="M120 208 C 120 158 118 108 120 30" />
      <path d="M120 152 L 96 130" />
      <path d="M120 152 L 144 130" />
      <path d="M120 118 L 100 94" />
      <path d="M120 118 L 140 94" />
      <path d="M120 86 L 105 68" />
      <path d="M120 86 L 135 68" />
      <path d="M120 212 C 118 226 122 234 130 240" />
    </svg>
  )
})

/**
 * Hand-illustrated hibiscus flower — five filled petals with veins, gold
 * center and stamen. Petals rotate around the center; colors are props.
 */
export const Hibiscus = memo(function Hibiscus({
  className = '',
  style,
  size = 120,
  petal = '#FF5E57',
  center = '#FFD43B',
  vein = '#C23B2E',
}) {
  const petals = []
  const petalPath = 'M60 66 C 44 50 40 26 60 14 C 80 26 76 50 60 66 Z'
  for (let i = 0; i < 5; i++) {
    petals.push(
      <g key={i} transform={`rotate(${i * 72} 60 60)`}>
        <path d={petalPath} fill={petal} />
        <path d="M60 60 L60 34" stroke={vein} strokeWidth={1.6} strokeLinecap="round" fill="none" />
        <path d="M60 42 C 55 36 54 30 56 24" stroke={vein} strokeWidth={1.4} strokeLinecap="round" fill="none" />
        <path d="M60 42 C 65 36 66 30 64 24" stroke={vein} strokeWidth={1.4} strokeLinecap="round" fill="none" />
      </g>,
    )
  }
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className={className} style={style} aria-hidden="true">
      {petals}
      <circle cx={60} cy={60} r={10} fill={center} />
      <circle cx={60} cy={60} r={4.5} fill={vein} />
      <path d="M60 60 L60 42" stroke={vein} strokeWidth={2} strokeLinecap="round" />
      <circle cx={60} cy={41} r={3} fill={vein} />
    </svg>
  )
})

/**
 * Small island silhouette — filled land mound with a beach outline and a
 * single palm. Land via `land`, palm detail via `palm`.
 */
export const Island = memo(function Island({
  className = '',
  style,
  size = 200,
  land = '#0F6FA8',
  palm = '#F7F1E2',
}) {
  return (
    <svg
      viewBox="0 0 200 110"
      width={size}
      height={size * 0.55}
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M6 86 C 34 54 72 44 104 50 C 148 42 178 60 194 86 L194 110 L6 110 Z" fill={land} />
      <path
        d="M6 86 C 34 54 72 44 104 50 C 148 42 178 60 194 86"
        stroke={palm}
        strokeOpacity={0.75}
        strokeWidth={2}
      />
      <path d="M104 50 Q 98 34 106 18" stroke={palm} strokeWidth={3} strokeLinecap="round" />
      <path
        d="M106 18 Q 84 24 78 36 M106 18 Q 122 24 130 36 M106 18 Q 106 26 106 36"
        stroke={palm}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </svg>
  )
})

/**
 * Portuguese Goa church facade in line-art — gable, round oculus, arched door,
 * side window and a bell tower with crenellations and a cross.
 */
export const Church = memo(function Church({ className = '', style, size = 150, color = '#0F5A3A' }) {
  return (
    <svg
      viewBox="0 0 150 190"
      width={size}
      height={size * 190 / 150}
      fill="none"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M22 182 V98" />
      <path d="M98 182 V98" />
      <path d="M22 98 L60 84 L98 98" />
      <path d="M60 84 V46" />
      <circle cx="60" cy="58" r="8" />
      <path d="M48 98 L72 98 L72 182 L48 182 Z" />
      <path d="M56 182 V154 a 4 4 0 0 1 8 0 V182" />
      <path d="M30 152 V136 a 4 4 0 0 1 8 0 V152" />
      <path d="M98 182 V36" />
      <path d="M98 36 H116 M106 36 V20 M114 36 V20 M116 36 V182" />
      <path d="M110 20 V6 M103 12 H117" />
    </svg>
  )
})

/** Minimal compass rose — thin circle, crosshair and cardinal ticks. */
export const CompassRose = memo(function CompassRose({ className = '', style, size = 64 }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="27" />
      <circle cx="32" cy="32" r="1.8" fill="currentColor" stroke="none" />
      <path d="M 32 8 V 20 M 32 44 V 56 M 8 32 H 20 M 44 32 H 56" strokeDasharray="2.5 3.5" />
      <path d="M 32 14 L 36 25 L 32 22 L 28 25 Z" />
      <path d="M 32 50 L 36 39 L 32 42 L 28 39 Z" />
      <path d="M 14 32 L 25 28 L 22 32 L 25 36 Z" />
      <path d="M 50 32 L 39 28 L 42 32 L 39 36 Z" />
    </svg>
  )
})

/**
 * Radiating sun rays drawn as thin trapezoid wedges around a clear center.
 * Pairs with a radial sun disc. Color via the `color` prop.
 */
export const SunRays = memo(function SunRays({
  className = '',
  style,
  size = 320,
  rays = 14,
  color = '#FFD43B',
  opacity = 0.55,
}) {
  const cx = size / 2
  const cy = size / 2
  const r1 = size * 0.3
  const r2 = size * 0.47
  const half = (Math.PI * 2 / rays) * 0.34
  const wedges = []
  for (let i = 0; i < rays; i++) {
    const base = (i / rays) * Math.PI * 2
    const a0 = base - half
    const a1 = base + half
    const x1 = cx + Math.cos(a0) * r1
    const y1 = cy + Math.sin(a0) * r1
    const x2 = cx + Math.cos(a1) * r1
    const y2 = cy + Math.sin(a1) * r1
    const x3 = cx + Math.cos(a1) * r2
    const y3 = cy + Math.sin(a1) * r2
    const x4 = cx + Math.cos(a0) * r2
    const y4 = cy + Math.sin(a0) * r2
    wedges.push(
      `M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)} L ${x3.toFixed(1)} ${y3.toFixed(1)} L ${x4.toFixed(1)} ${y4.toFixed(1)} Z`,
    )
  }
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
    >
      <g fill={color} opacity={opacity}>
        {wedges.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  )
})
