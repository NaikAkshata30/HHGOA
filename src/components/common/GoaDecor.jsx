import { memo } from 'react'

/**
 * Editorial Goa decoration set for the website chrome.
 *
 * These are deliberately separate from `src/components/frame/decorations.jsx`
 * (which belongs to the export canvases). Everything here is stroke-based,
 * colored via `currentColor` and aria-hidden so it can be layered anywhere
 * without hurting the export pipeline or accessibility.
 */

/** Half sun rising over the horizon, with short rays. */
export const SunArc = memo(function SunArc({ className = '', size = 120, rays = 7 }) {
  const cx = 60
  const cy = 82
  const r = 44
  const rayLines = []
  for (let i = 0; i < rays; i++) {
    const angle = Math.PI - (Math.PI * i) / (rays - 1)
    const x1 = cx + Math.cos(angle) * r
    const y1 = cy - Math.sin(angle) * r
    const x2 = cx + Math.cos(angle) * (r + 11)
    const y2 = cy - Math.sin(angle) * (r + 11)
    rayLines.push(`M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`)
  }
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M 16 82 A 44 44 0 0 1 104 82" />
      <circle cx={cx} cy={cy} r={6} fill="currentColor" stroke="none" />
      {rayLines.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
})

/** Stacked sine wave lines — calm water. */
export const WaveLines = memo(function WaveLines({ className = '', size = 320, wave = 3 }) {
  const waves = []
  for (let i = 0; i < wave; i++) {
    const y = 12 + i * 13
    waves.push(`M 0 ${y} Q 40 ${y - 6} 80 ${y} T 160 ${y} T 240 ${y} T 320 ${y}`)
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
      aria-hidden="true"
    >
      {waves.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
})

/** Organic coastline contour — a drifting survey line. */
export const Coastline = memo(function Coastline({ className = '', size = 360 }) {
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
      aria-hidden="true"
    >
      <path d="M 2 30 C 16 6 28 46 44 34 C 60 22 70 8 86 22 C 100 34 112 26 126 34 C 142 44 158 14 174 24 C 190 34 204 44 220 30 C 236 16 250 34 266 28 C 282 20 296 32 314 22 C 328 14 344 30 358 16" />
    </svg>
  )
})

/** Minimal compass rose — thin circle, crosshair and cardinal ticks. */
export const CompassRose = memo(function CompassRose({ className = '', size = 64 }) {
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

/** Small rubber-stamp style badge used as an editorial microdetail. */
export function Stamp({ children, className = '', tone = 'forest' }) {
  const tones = {
    forest: 'border-forest/40 text-forest',
    rose: 'border-rose/40 text-rose',
    gold: 'border-gold/70 text-coal',
    sand: 'border-sand text-stone',
  }
  return (
    <span
      className={`stamp px-3 ${tones[tone]} ${className}`}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}

/** Filled wave band used to transition between sections. Color via `currentColor`. */
export const WaveDivider = memo(function WaveDivider({ className = '', flip = false }) {
  return (
    <svg
      className={`block w-full ${className}`}
      viewBox="0 0 1440 56"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d={
          flip
            ? 'M0 0 L1440 0 L1440 24 C 1376 48 1296 10 1216 30 C 1136 50 1056 20 976 30 C 896 40 816 14 736 26 C 656 38 576 12 496 26 C 416 40 336 10 256 22 C 176 34 96 14 32 28 L0 12 Z'
            : 'M0 0 L0 44 C 60 12 140 52 220 30 C 300 8 380 38 460 26 C 540 14 620 46 700 34 C 780 22 860 54 940 42 C 1020 30 1100 60 1180 36 C 1260 12 1340 48 1440 20 L1440 0 Z'
        }
      />
    </svg>
  )
})

/**
 * Editorial ticker band. The track holds two copies of the same line and
 * slides on a loop; reduced-motion collapses it to a static strip.
 */
export function Marquee({ items = [], className = '' }) {
  const line = items.join('  ✦  ')
  return (
    <div
      className={`relative overflow-hidden bg-forest text-cream ${className}`}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.3em]">
        <span className="px-6">{line}</span>
        <span className="px-6">{line}</span>
      </div>
    </div>
  )
}

/** Tiny sailing-boat silhouette. */
export const Boat = memo(function Boat({ className = '', size = 64 }) {
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
      aria-hidden="true"
    >
      <path d="M6 20 H 58 L 48 30 H 16 Z" />
      <path d="M31 20 V 5 M31 5 L 43 15 M31 5 L 20 14" />
      <path d="M14 35 Q 24 31 32 35 Q 40 39 50 35" />
    </svg>
  )
})

/** A few flying birds, drawn as minimal arcs. */
export const Birds = memo(function Birds({ className = '', size = 84 }) {
  return (
    <svg
      viewBox="0 0 84 36"
      width={size}
      height={size * 0.43}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M8 26 Q 15 20 22 26 Q 29 20 36 26" />
      <path d="M30 14 Q 36 9 42 14 Q 48 9 54 14" />
      <path d="M54 28 Q 60 23 66 28 Q 72 23 78 28" />
    </svg>
  )
})

/** Minimal palm-leaf outline — midrib plus a few leaflets. */
export const PalmLeaf = memo(function PalmLeaf({ className = '', size = 120 }) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 106 Q 60 60 106 14" />
      <path d="M32 78 Q 26 60 42 56" />
      <path d="M50 66 Q 48 46 66 44" />
      <path d="M68 54 Q 68 36 88 32" />
      <path d="M58 82 Q 64 74 78 78" />
      <path d="M42 90 Q 48 88 54 92" />
    </svg>
  )
})

/** Thin flowing wave rule used as a premium divider. */
export const WaveRule = memo(function WaveRule({ className = '', flip = false }) {
  return (
    <svg
      className={`block w-full ${className}`}
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

/** Abstract light shimmering on still water — short horizontal dashes. */
export const Reflections = memo(function Reflections({ className = '', size = 90 }) {
  return (
    <svg
      viewBox="0 0 120 22"
      width={size}
      height={size * 0.18}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 5 H 44" strokeDasharray="9 7" />
      <path d="M28 11 H 62" strokeDasharray="13 8" />
      <path d="M14 17 H 52" strokeDasharray="7 6" />
    </svg>
  )
})
