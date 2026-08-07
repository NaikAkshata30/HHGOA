import { forwardRef, memo, useMemo } from 'react'
import { Compass, Flame } from 'lucide-react'
import {
  Birds,
  DotGrid,
  Grain,
  PalmLeaf,
  TravelStamp,
  WaveLines,
  WaveRule,
  buildBuilderId,
} from '../frame/decorations.jsx'
import BuilderQR from './BuilderQR.jsx'

// Fixed render size of the exportable Builder ID card (html2canvas target).
export const BUILDER_CARD = {
  width: 1080,
  height: 1350,
  radiusCanvas: 56,
  safeInset: 72,
  headerHeight: 190,
  logoBox: 62,
  logoIcon: 26,
  logoRadius: 16,
  photoWidth: 356,
  photoHeight: 404,
  photoPadding: 14,
  photoRadius: 28,
  matRadius: 36,
  stampSize: 250,
  qrSize: 220,
  patternOpacity: 0.5,
}

export const CENTER = { x: 50, y: 50 }

// All colors are inline hex/rgba (html2canvas cannot resolve oklab/color-mix),
// keeping the export canvas self-contained and reliable.
const C = {
  paper: '#F7F1E2',
  card: '#FFFDF5',
  paperSoft: '#EFE5CC',
  sand: '#D9CCB0',
  matBorder: '#E4D9BC',
  ink: '#1D2621',
  stone: '#5F665C',
  forest: '#0F5A3A',
  forestDeep: '#07381F',
  moss: '#6A9B7D',
  gold: '#FFD43B',
  rose: '#FF2D7A',
  stampInk: '#C23B2E',
  sea: '#6BC5E8',
  deepSea: '#0F6FA8',
  foam: '#DDF5FF',
  paperGradient: 'linear-gradient(160deg, #FAF5E7 0%, #F1E8D0 100%)',
  headerGradient: 'linear-gradient(135deg, #07381F 0%, #0F5A3A 55%, #2F7D5B 130%)',
  gradientGreen:
    'linear-gradient(135deg, #0d6b43 0%, #137a4f 50%, #2fbc7d 100%)',
  gradientYellow:
    'linear-gradient(135deg, #FFC23F 0%, #FFD43B 55%, #FFB53C 100%)',
  sunDisc:
    'radial-gradient(circle at 50% 50%, rgba(255,197,97,0.9) 0%, rgba(255,122,26,0.35) 48%, rgba(255,122,26,0) 68%)',
}

const SERIF = "'Fraunces', Georgia, 'Times New Roman', serif"
const MONO = "'JetBrains Mono', ui-monospace, 'SF Mono', monospace"
const HAND = "'Caveat', 'Segoe Script', cursive"

const clamp = (value, fallback, min = 0, max = 100) => {
  const num = Number(value)
  if (Number.isNaN(num)) return fallback
  return Math.min(max, Math.max(min, num))
}

const nameFontSize = (value) => {
  const len = (value || '').length
  if (len <= 9) return 80
  if (len <= 13) return 62
  if (len <= 18) return 46
  return 40
}

/**
 * The Goa Explorer Builder ID — a premium travel passport at a fixed
 * 1080x1350 size. Forest passport band, coast portrait, big serif name, role,
 * builder title, builder number, coordinates, a rubber travel stamp and a QR
 * placeholder. Hacker House Goa appears once, small, in the footer.
 * `imagePosition` controls the photo focus point as { x, y } percentages.
 *
 * The root node carries `id="export-builder-card"` and the forwarded ref so
 * html2canvas can capture it at full resolution.
 */
const BuilderCardCanvas = forwardRef(function BuilderCardCanvas(
  {
    previewUrl,
    name = 'Your Name',
    stack = 'Your stack',
    title = 'Builder',
    imagePosition = CENTER,
  },
  ref,
) {
  const position = {
    x: clamp(imagePosition?.x, 50),
    y: clamp(imagePosition?.y, 50),
  }

  const displayName = (name || 'Your Name').trim() || 'Your Name'
  const displayStack = (stack || 'Your stack').trim() || 'Your stack'
  const displayTitle = (title || 'Builder').trim() || 'Builder'

  const builderId = useMemo(() => buildBuilderId(displayName, displayStack), [displayName, displayStack])

  const card = BUILDER_CARD
  const ariaLabel = `Goa Explorer Builder ID card${
    displayName !== 'Your Name' ? ` for ${displayName}` : ''
  }`

  return (
    <div
      ref={ref}
      id="export-builder-card"
      role="img"
      aria-label={ariaLabel}
      className="relative flex select-none flex-col overflow-hidden"
      style={{
        width: card.width,
        height: card.height,
        borderRadius: card.radiusCanvas,
        background: C.paperGradient,
      }}
    >
      {/* Paper texture */}
      <DotGrid
        className="absolute inset-0"
        spacing={34}
        dotSize={1.7}
        color="rgba(150, 116, 64, 0.16)"
        opacity={card.patternOpacity}
      />

      {/* ---- Passport band ---- */}
      <header
        className="relative z-10 flex items-center"
        style={{ height: card.headerHeight, padding: `0 ${card.safeInset}px`, background: C.headerGradient, flexShrink: 0 }}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-5">
            <span
              className="grid place-items-center"
              style={{
                width: card.logoBox,
                height: card.logoBox,
                borderRadius: card.logoRadius,
                backgroundImage: C.gradientYellow,
                color: C.ink,
                boxShadow: '0 12px 26px rgba(7, 56, 31, 0.4)',
              }}
            >
              <Flame size={card.logoIcon} strokeWidth={2.4} />
            </span>
            <div>
              <p
                className="font-bold uppercase"
                style={{ fontFamily: MONO, fontSize: 24, letterSpacing: '0.2em', color: '#FDF8EC' }}
              >
                Hacker House Goa
              </p>
              <p
                className="mt-1 font-semibold uppercase"
                style={{ fontFamily: MONO, fontSize: 14, letterSpacing: '0.3em', color: 'rgba(253, 248, 236, 0.72)' }}
              >
                Official Builder ID
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end" style={{ gap: 8 }}>
            <span
              className="font-bold uppercase"
              style={{
                fontFamily: MONO,
                fontSize: 20,
                letterSpacing: '0.2em',
                color: C.ink,
                backgroundImage: C.gradientYellow,
                borderRadius: 999,
                padding: '10px 24px',
              }}
            >
              Season 2026
            </span>
            <span
              className="flex items-center gap-2 font-semibold uppercase"
              style={{ fontFamily: MONO, fontSize: 15, letterSpacing: '0.26em', color: 'rgba(253, 248, 236, 0.8)' }}
            >
              <Compass size={18} strokeWidth={1.8} />
              Builder Pass
            </span>
          </div>
        </div>

        {/* Wave rule at the foot of the band */}
        <WaveRule
          className="absolute inset-x-0 bottom-0"
          style={{ color: 'rgba(221, 245, 255, 0.5)' }}
        />
      </header>

      {/* ---- Body ---- */}
      <div
        className="relative z-10 flex flex-1 flex-col"
        style={{ padding: `48px ${card.safeInset}px 38px` }}
      >
        {/* Coast portrait + identity */}
        <div className="flex items-center" style={{ gap: 48 }}>
          <div className="relative" style={{ width: card.photoWidth + card.photoPadding * 2 }}>
            <div
              style={{
                width: card.photoWidth + card.photoPadding * 2,
                padding: card.photoPadding,
                borderRadius: card.matRadius,
                background: C.card,
                border: `1.5px solid ${C.matBorder}`,
                boxShadow: '0 26px 48px rgba(29, 38, 33, 0.18)',
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  width: card.photoWidth,
                  height: card.photoHeight,
                  borderRadius: card.photoRadius,
                }}
              >
                <img
                  src={previewUrl}
                  alt="Your photo on the Builder ID card"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  style={{ objectPosition: `${position.x}% ${position.y}%` }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 border"
                  style={{ borderRadius: card.photoRadius, borderColor: 'rgba(29, 38, 33, 0.14)' }}
                />
              </div>
            </div>

            {/* Rubber stamp overlapping the portrait */}
            <div className="absolute" style={{ right: -54, top: -46, zIndex: 5 }}>
              <TravelStamp
                size={188}
                color={C.stampInk}
                rotate={-12}
                lines={['Official', 'Builder']}
              />
            </div>

            {/* Caption plate under the portrait */}
            <div
              className="mt-4 flex items-center justify-center"
              style={{
                padding: '12px 16px',
                borderRadius: 18,
                background: 'rgba(239, 230, 204, 0.8)',
                border: `1.5px solid ${C.sand}`,
              }}
            >
              <p
                className="font-semibold uppercase"
                style={{ fontFamily: MONO, fontSize: 15, letterSpacing: '0.3em', color: C.stone }}
              >
                Coast Portrait · Goa
              </p>
            </div>
          </div>

          {/* Identity */}
          <div className="flex flex-1 flex-col" style={{ gap: 12 }}>
            <p
              className="flex items-center gap-3 font-bold uppercase"
              style={{ fontFamily: MONO, fontSize: 20, letterSpacing: '0.3em', color: C.forest }}
            >
              <span
                className="inline-block"
                style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: C.deepSea }}
              />
              Goa Explorer · Profile
            </p>
            <p
              className="uppercase"
              style={{
                fontFamily: SERIF,
                fontWeight: 900,
                fontSize: nameFontSize(displayName),
                lineHeight: 1.04,
                letterSpacing: '-0.01em',
                color: C.ink,
              }}
            >
              {displayName}
            </p>
            <p
              className="flex items-center gap-3 font-semibold uppercase"
              style={{ fontFamily: MONO, fontSize: 27, letterSpacing: '0.1em', color: C.stone }}
            >
              <span className="inline-block size-2 rounded-full" style={{ backgroundColor: C.rose }} />
              {displayStack}
              <span className="inline-block size-2 rounded-full" style={{ backgroundColor: C.rose }} />
            </p>
            <span
              className="frame-pill inline-flex w-max uppercase"
              style={{
                fontFamily: SERIF,
                fontWeight: 700,
                fontSize: 25,
                letterSpacing: '0.04em',
                padding: '11px 34px',
                marginTop: 2,
              }}
            >
              {displayTitle}
            </span>
            <div style={{ marginTop: 10 }}>
              <p
                className="font-semibold uppercase"
                style={{ fontFamily: MONO, fontSize: 15, letterSpacing: '0.34em', color: C.stone }}
              >
                Builder No.
              </p>
              <div className="mt-1 flex items-center" style={{ gap: 10 }}>
                <span
                  aria-hidden="true"
                  className="inline-block"
                  style={{ width: 10, height: 10, transform: 'rotate(45deg)', backgroundColor: C.stampInk }}
                />
                <p
                  className="font-bold"
                  style={{ fontFamily: MONO, fontSize: 44, letterSpacing: '0.06em', color: C.forest }}
                >
                  {builderId}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coordinates strip */}
        <div
          className="flex items-center justify-between"
          style={{ marginTop: 34, padding: '20px 30px', borderRadius: 22, background: 'rgba(239, 230, 204, 0.75)', border: `1.5px solid ${C.sand}` }}
        >
          <p
            className="flex items-center gap-4 font-semibold"
            style={{ fontFamily: MONO, fontSize: 18, letterSpacing: '0.06em', color: C.ink }}
          >
            <Compass size={34} strokeWidth={1.6} style={{ color: C.deepSea }} />
            15.2993° N · 74.1240° E · Arabian Sea Coast
          </p>
          <div className="flex items-center" style={{ gap: 14 }}>
            <WaveLines size={120} waves={2} style={{ color: 'rgba(15, 106, 168, 0.55)' }} />
            <span
              className="font-bold uppercase"
              style={{ fontFamily: MONO, fontSize: 16, letterSpacing: '0.26em', color: C.deepSea }}
            >
              Goa Coast
            </span>
          </div>
        </div>

        {/* Travel stamp + QR zone */}
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center" style={{ gap: 26 }}>
            <div
              className="relative grid place-items-center"
              style={{ width: 320, height: 320 }}
            >
              <div
                aria-hidden="true"
                className="absolute"
                style={{ width: 320, height: 320, borderRadius: '50%', background: C.sunDisc }}
              />
              <PalmLeaf
                className="absolute"
                style={{ left: -14, bottom: -16, color: 'rgba(15, 90, 58, 0.4)', transform: 'rotate(120deg)' }}
                size={150}
              />
              <TravelStamp
                size={card.stampSize}
                color={C.stampInk}
                rotate={-8}
                lines={['Goa Explorer', 'Official Builder', 'Entered', 'Season 2026']}
              />
            </div>
            <div className="flex flex-col items-start" style={{ gap: 6 }}>
              <Birds size={96} style={{ color: 'rgba(15, 106, 168, 0.6)' }} />
              <p style={{ fontFamily: HAND, fontSize: 32, color: C.stone }}>
                pack light, ship heavy
              </p>
            </div>
          </div>

          <div
            className="flex flex-col items-center"
            style={{
              padding: '20px 26px',
              borderRadius: 26,
              background: C.card,
              border: `1.5px solid ${C.sand}`,
              boxShadow: '0 18px 36px rgba(29, 38, 33, 0.12)',
            }}
          >
            <BuilderQR size={card.qrSize} builderId={builderId} />
            <p
              className="mt-4 font-semibold uppercase"
              style={{ fontFamily: MONO, fontSize: 15, letterSpacing: '0.24em', color: C.stone }}
            >
              Scan · Verify · Connect
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="flex items-center justify-between"
          style={{ marginTop: 24, borderTop: `1px solid ${C.sand}`, paddingTop: 22 }}
        >
          <div className="flex items-center" style={{ gap: 12 }}>
            <span
              className="grid place-items-center"
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundImage: C.gradientGreen,
                color: C.gold,
              }}
            >
              <Flame size={18} strokeWidth={2.4} />
            </span>
            <span
              className="font-semibold uppercase"
              style={{ fontFamily: MONO, fontSize: 14, letterSpacing: '0.24em', color: C.stone }}
            >
              Est · 2026
            </span>
          </div>
          <p
            className="font-bold uppercase"
            style={{ fontFamily: MONO, fontSize: 17, letterSpacing: '0.26em', color: C.stone }}
          >
            Build · Ship · Belong
          </p>
          <p
            className="font-semibold uppercase"
            style={{ fontFamily: MONO, fontSize: 15, letterSpacing: '0.2em', color: C.stone }}
          >
            Goa Coast · Season 2026
          </p>
        </footer>
      </div>

      {/* Film grain over everything */}
      <Grain className="pointer-events-none absolute inset-0 z-30" opacity={0.07} />
    </div>
  )
})

export default memo(BuilderCardCanvas)
