import { forwardRef, memo, useMemo } from 'react'
import { Flame } from 'lucide-react'
import { Birds, DotGrid, Grain, SunRays, TravelStamp, buildBuilderId } from './decorations.jsx'
import {
  CoastalLandscape,
  CoastBanner,
  CoordinateStamp,
  Frangipani,
  Hibiscus,
  MonsteraLeaf,
  PalmFrond,
  PostcardPaper,
  SwirlOrnament,
} from './botanicals.jsx'

// Fixed render size of the exportable frame (html2canvas capture target).
export const FRAME_SIZE = 1080

export const CENTER = { x: 50, y: 50 }

// All geometry for the illustrated Goa travel poster. All colors are applied
// as inline hex/rgba (html2canvas cannot resolve oklab/color-mix), so the
// export canvas stays self-contained. The artwork is composed into five clear
// clusters that grow inward from the corners: top-left (logo + monstera +
// birds), top-right (travel stamp + palm + postcard + coordinates), left-lower
// (one coastal scene), right-lower (hibiscus + palms + foliage) and the
// continuous coastline along the bottom — never scattering objects alone.
export const FRAME = {
  size: FRAME_SIZE,
  radiusCanvas: 64,
  photoCenterX: 540,
  photoCenterY: 400,
  photoOuter: 692, // gold ring wrapper
  photoInner: 656, // visible photo circle
  forestRing: 676, // thin forest ring between gold ring and photo
  dashedRing: 716, // outer dashed gold ring
  ringGoldWidth: 4,
  ringPad: 14,
  logoBox: 56,
  logoIcon: 25,
  logoRadius: 16,
  stampSize: 150,
  identityTop: 748,
  nameFontSize: 66,
  roleFontSize: 18,
  titleFontSize: 18,
  idFontSize: 18,
  coastTop: 982,
  coastHeight: 70,
  grainOpacity: 0.06,
}

const C = {
  paper: '#F7F1E2',
  card: '#FFFDF5',
  sand: '#D9CCB0',
  sandDeep: '#C8B58F',
  ink: '#1D2621',
  stone: '#5F665C',
  forest: '#0F5A3A',
  forestDeep: '#07381F',
  tropical: '#2F7D5B',
  moss: '#6A9B7D',
  gold: '#FFD43B',
  mustard: '#FFC23F',
  coral: '#FF5E57',
  stampInk: '#C23B2E',
  ocean: '#0F6FA8',
  sea: '#6BC5E8',
  seafoam: '#DDF5FF',
  paperGradient: 'linear-gradient(165deg, #FBF6E8 0%, #F1E8D0 100%)',
  gradientGreen:
    'linear-gradient(135deg, #0d6b43 0%, #137a4f 50%, #2fbc7d 100%)',
  sunDisc:
    'radial-gradient(circle at 50% 50%, rgba(255, 208, 59, 0.95) 0%, rgba(255, 154, 38, 0.55) 46%, rgba(255, 122, 26, 0) 70%)',
  foamBand:
    'linear-gradient(180deg, rgba(221,245,255,0) 0%, rgba(221,245,255,0.85) 100%)',
  goldWash:
    'radial-gradient(circle at 28% 20%, rgba(255, 208, 59, 0.18), transparent 62%)',
  skyWash:
    'radial-gradient(circle at 50% 6%, rgba(107, 197, 232, 0.18), transparent 55%)',
  seaWash:
    'radial-gradient(circle at 82% 46%, rgba(107, 197, 232, 0.14), transparent 55%)',
  coralWash:
    'radial-gradient(circle at 10% 76%, rgba(255, 94, 87, 0.12), transparent 55%)',
  mossWash:
    'radial-gradient(circle at 90% 80%, rgba(47, 125, 91, 0.12), transparent 55%)',
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
  if (len <= 8) return 66
  if (len <= 12) return 56
  if (len <= 16) return 48
  if (len <= 22) return 40
  return 34
}

const r = (deg) => `rotate(${deg}deg)`

/**
 * The Goa Explorer profile frame at a fixed 1080x1080 size — a premium
 * illustrated travel poster. Warm textured paper, watercolor washes and a
 * stitched postcard border frame a large circular photo set in gold
 * decorative rings under a rising sun. The artwork is composed into five
 * clear clusters that grow inward from the corners: top-left (HH Goa logo
 * with one large monstera leaf and a few birds), top-right (passport travel
 * stamp with an arching palm frond, a postcard and a coordinates stamp),
 * left-lower (a single coastal scene of a Portuguese church on a promontory
 * with waves and a small sailboat), right-lower (a large hibiscus with palm
 * leaves and tropical foliage overlapping naturally) and one continuous
 * illustrated coastline along the bottom with sea, sand, waves, sailboats
 * and grass. The builder's name, role, title and builder number anchor the
 * lower panel above the sea. The center stays open for the photo.
 *
 * The root node carries `id="export-frame"` and the forwarded ref so html2canvas
 * can capture it at full 1080x1080 resolution.
 */
const FrameCanvas = forwardRef(function FrameCanvas(
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
  const builderLabel = `HH-GOA-${builderId.slice(3)}`

  const frame = FRAME
  const outerLeft = frame.photoCenterX - frame.photoOuter / 2
  const outerTop = frame.photoCenterY - frame.photoOuter / 2

  return (
    <div
      ref={ref}
      id="export-frame"
      role="img"
      aria-label={`Goa Explorer builder travel poster for ${displayName}`}
      className="relative select-none overflow-hidden"
      style={{
        width: frame.size,
        height: frame.size,
        borderRadius: frame.radiusCanvas,
        background: C.paperGradient,
        boxShadow: 'inset 0 0 140px rgba(29, 38, 33, 0.14)',
      }}
    >
      {/* ---- Watercolor washes ---- */}
      <div className="absolute" style={{ width: 760, height: 760, top: -140, left: -160, background: C.goldWash, zIndex: 1 }} />
      <div className="absolute" style={{ width: 860, height: 420, top: -120, left: 110, background: C.skyWash, zIndex: 1 }} />
      <div className="absolute" style={{ width: 720, height: 720, top: 120, right: -180, background: C.seaWash, zIndex: 1 }} />
      <div className="absolute" style={{ width: 680, height: 680, bottom: -180, left: -160, background: C.coralWash, zIndex: 1 }} />
      <div className="absolute" style={{ width: 640, height: 640, bottom: -160, right: -140, background: C.mossWash, zIndex: 1 }} />

      {/* Paper dot texture */}
      <DotGrid
        className="absolute inset-0"
        spacing={32}
        dotSize={1.5}
        color="rgba(150, 116, 64, 0.14)"
        opacity={0.5}
      />

      {/* ---- Rising sun behind the photo ---- */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{ left: frame.photoCenterX - 410, top: 30, width: 820, height: 820, zIndex: 1 }}
      >
        <SunRays size={820} rays={16} color={C.gold} opacity={0.26} />
      </div>
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          left: frame.photoCenterX - 140,
          top: -20,
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: C.sunDisc,
          zIndex: 1,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          left: frame.photoCenterX - 122,
          top: -2,
          width: 244,
          height: 244,
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 194, 63, 0.65)',
          zIndex: 1,
        }}
      />

      {/* ---- Postcard frame + stitch ---- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{ inset: 20, borderRadius: 44, border: `1.5px solid ${C.sandDeep}`, zIndex: 2 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{ inset: 27, borderRadius: 37, border: `1px dashed rgba(200, 181, 143, 0.75)`, zIndex: 2 }}
      />
      {/* Corner pinholes */}
      {[
        { left: 44, top: 44 },
        { right: 44, top: 44 },
        { left: 44, bottom: 44 },
        { right: 44, bottom: 44 },
      ].map((pos, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute"
          style={{
            width: 15,
            height: 15,
            transform: 'rotate(45deg)',
            backgroundColor: C.forest,
            borderRadius: 2,
            zIndex: 2,
            ...pos,
          }}
        />
      ))}

      {/* ================================================================ */}
      {/* Illustrated wrapping — five composed clusters, corners inward     */}
      {/* ================================================================ */}

      {/* ---- Zone 1 · TOP LEFT — logo, one large monstera, small birds ---- */}
      <div aria-hidden="true" className="absolute" style={{ left: -18, top: -28, zIndex: 3, transform: r(-12) }}>
        <MonsteraLeaf style={{ width: 290, height: 316 }} />
      </div>
      <div aria-hidden="true" className="absolute" style={{ left: 170, top: 158, zIndex: 3 }}>
        <Birds size={92} style={{ color: 'rgba(15, 106, 168, 0.75)' }} />
      </div>
      <div aria-hidden="true" className="absolute" style={{ left: 322, top: 124, zIndex: 3 }}>
        <Birds size={52} style={{ color: 'rgba(15, 106, 168, 0.55)' }} />
      </div>

      {/* ---- Zone 2 · TOP RIGHT — travel stamp, palm, postcard, coords ---- */}
      <div aria-hidden="true" className="absolute" style={{ left: 940, top: -46, zIndex: 3, transform: r(100) }}>
        <PalmFrond style={{ width: 300, height: 196 }} />
      </div>
      <div aria-hidden="true" className="absolute" style={{ left: 806, top: 140, zIndex: 4, transform: 'rotate(6deg)' }}>
        <PostcardPaper style={{ width: 170, height: 127 }} />
      </div>
      <div aria-hidden="true" className="absolute" style={{ left: 932, top: 222, zIndex: 4, transform: 'rotate(-12deg)' }}>
        <CoordinateStamp style={{ width: 70, height: 70 }} />
      </div>

      {/* ---- Zone 3 · LEFT LOWER — one coastal scene ---- */}
      <div aria-hidden="true" className="absolute" style={{ left: 22, top: 710, zIndex: 3 }}>
        <CoastalLandscape style={{ width: 208, height: 286 }} />
      </div>

      {/* ---- Zone 4 · RIGHT LOWER — hibiscus, palms, foliage cluster ---- */}
      <div aria-hidden="true" className="absolute" style={{ left: 838, top: 622, zIndex: 3, transform: r(148) }}>
        <PalmFrond style={{ width: 252, height: 165 }} />
      </div>
      <div aria-hidden="true" className="absolute" style={{ left: 900, top: 716, zIndex: 3, transform: r(-20) }}>
        <PalmFrond style={{ width: 196, height: 128 }} />
      </div>
      <div aria-hidden="true" className="absolute" style={{ left: 852, top: 690, zIndex: 4, transform: r(10) }}>
        <Hibiscus style={{ width: 168, height: 185 }} />
      </div>
      <div aria-hidden="true" className="absolute" style={{ left: 990, top: 822, zIndex: 4, transform: r(-12) }}>
        <Frangipani style={{ width: 92, height: 92 }} />
      </div>

      {/* ---- Circular photo with gold decorative rings ---- */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          left: frame.photoCenterX - frame.dashedRing / 2,
          top: frame.photoCenterY - frame.dashedRing / 2,
          width: frame.dashedRing,
          height: frame.dashedRing,
          borderRadius: '50%',
          border: '2px dashed rgba(255, 194, 63, 0.85)',
          transform: 'rotate(6deg)',
          zIndex: 5,
        }}
      />
      <div
        className="relative z-10"
        style={{
          left: outerLeft,
          top: outerTop,
          width: frame.photoOuter,
          height: frame.photoOuter,
          borderRadius: '50%',
          border: `${frame.ringGoldWidth}px solid ${C.mustard}`,
          padding: frame.ringPad,
          background: 'rgba(255, 253, 245, 0.92)',
          boxShadow: '0 26px 54px rgba(29, 38, 33, 0.24)',
        }}
      >
        {/* Thin forest ring */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            inset: 8,
            borderRadius: '50%',
            border: `2.5px solid ${C.forest}`,
          }}
        />
        {/* Gold studs on the ring */}
        {[
          { left: '50%', top: -7 },
          { left: '50%', top: 'auto', bottom: -7 },
          { left: -7, top: '50%' },
          { right: -7, top: '50%' },
        ].map((pos, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute"
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: C.mustard,
              border: `2.5px solid ${C.card}`,
              marginLeft: i === 0 || i === 1 ? -7 : 0,
              marginTop: i === 2 || i === 3 ? -7 : 0,
              zIndex: 2,
              ...pos,
            }}
          />
        ))}
        <div
          className="relative overflow-hidden"
          style={{
            width: frame.photoInner,
            height: frame.photoInner,
            borderRadius: '50%',
          }}
        >
          <img
            src={previewUrl}
            alt="Your uploaded photo inside the frame"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{ objectPosition: `${position.x}% ${position.y}%` }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ borderRadius: '50%', boxShadow: 'inset 0 0 0 1.5px rgba(29, 38, 33, 0.12)' }}
          />
        </div>
      </div>

      {/* Journal tape over the photo ring */}
      <div
        aria-hidden="true"
        className="absolute flex items-center justify-center"
        style={{
          left: frame.photoCenterX - 76,
          top: frame.photoCenterY - frame.photoOuter / 2 - 10,
          width: 152,
          height: 42,
          transform: 'rotate(-4deg)',
          background: 'rgba(255, 253, 245, 0.82)',
          border: `1px solid ${C.sand}`,
          borderRadius: 4,
          boxShadow: '0 6px 14px rgba(29, 38, 33, 0.14)',
          zIndex: 15,
        }}
      >
        <span style={{ fontFamily: HAND, fontSize: 24, color: C.stone, letterSpacing: '0.02em' }}>
          goa · season 2026
        </span>
      </div>

      {/* ---- Top row: HH logo + BUILT IN GOA stamp ---- */}
      <header
        className="absolute flex items-start justify-between"
        style={{ left: 40, right: 36, top: 26, zIndex: 15 }}
      >
        <div className="flex items-center" style={{ gap: 12 }}>
          <span
            className="grid place-items-center"
            style={{
              width: frame.logoBox,
              height: frame.logoBox,
              borderRadius: frame.logoRadius,
              backgroundImage: C.gradientGreen,
              color: C.gold,
              boxShadow: '0 12px 26px rgba(15, 90, 58, 0.35)',
            }}
          >
            <Flame size={frame.logoIcon} strokeWidth={2.4} />
          </span>
          <div>
            <p style={{ fontFamily: MONO, fontSize: 16, fontWeight: 700, letterSpacing: '0.2em', color: C.ink }}>
              HACKER HOUSE GOA
            </p>
            <p style={{ fontFamily: MONO, fontSize: 13, fontWeight: 600, letterSpacing: '0.26em', color: C.stone, marginTop: 2 }}>
              Official Builder
            </p>
          </div>
        </div>
        <TravelStamp
          size={frame.stampSize}
          color={C.stampInk}
          rotate={10}
          lines={['Built', 'in Goa']}
        />
      </header>

      {/* ---- Identity panel: name, role, title, builder number ---- */}
      <div
        className="absolute inset-x-0 flex flex-col items-center"
        style={{ top: frame.identityTop, padding: '0 40px', zIndex: 15 }}
      >
        <div aria-hidden="true">
          <SwirlOrnament style={{ width: 120, height: 22 }} />
        </div>

        <p
          className="text-center uppercase"
          style={{
            fontFamily: SERIF,
            fontWeight: 900,
            fontSize: nameFontSize(displayName),
            lineHeight: 1.03,
            letterSpacing: '-0.015em',
            color: C.ink,
            maxWidth: 620,
            marginTop: 4,
          }}
        >
          {displayName}
        </p>

        <p
          className="flex items-center gap-3 text-center font-semibold uppercase"
          style={{
            fontFamily: MONO,
            fontSize: frame.roleFontSize,
            letterSpacing: '0.12em',
            color: C.stone,
            maxWidth: 600,
            marginTop: 5,
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
            <circle cx="4" cy="4" r="3.2" fill={C.coral} />
          </svg>
          {displayStack}
          <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
            <circle cx="4" cy="4" r="3.2" fill={C.coral} />
          </svg>
        </p>

        <span
          className="frame-pill uppercase"
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: frame.titleFontSize,
            letterSpacing: '0.05em',
            padding: '7px 30px',
            marginTop: 7,
          }}
        >
          {displayTitle}
        </span>

        <div
          className="flex items-center"
          style={{
            gap: 10,
            marginTop: 7,
            padding: '6px 18px',
            borderRadius: 999,
            background: 'rgba(255, 253, 245, 0.95)',
            border: `1.5px solid ${C.forest}`,
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
            <circle cx="4" cy="4" r="3.4" fill={C.gold} />
          </svg>
          <span
            style={{ fontFamily: MONO, fontSize: frame.idFontSize, fontWeight: 700, letterSpacing: '0.14em', color: C.forest }}
          >
            {builderLabel}
          </span>
        </div>
      </div>

      {/* ---- Zone 5 · BOTTOM — one continuous coastline ---- */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0"
        style={{ top: 972, height: 12, background: C.foamBand, zIndex: 13 }}
      />
      <div aria-hidden="true" className="absolute" style={{ left: 36, top: frame.coastTop, zIndex: 14 }}>
        <CoastBanner
          style={{
            width: 1008,
            height: frame.coastHeight,
            borderRadius: 22,
          }}
        />
      </div>

      {/* #FrameInGoa stamped into the sand */}
      <div
        className="absolute"
        style={{
          left: 372,
          top: 1032,
          transform: 'rotate(-3deg)',
          zIndex: 15,
        }}
      >
        <p
          className="font-bold uppercase"
          style={{ fontFamily: MONO, fontSize: 20, letterSpacing: '0.3em', color: C.forest, opacity: 0.9 }}
        >
          #FrameInGoa
        </p>
      </div>

      {/* Film grain over everything */}
      <Grain className="pointer-events-none absolute inset-0 z-30" opacity={frame.grainOpacity} />
    </div>
  )
})

export default memo(FrameCanvas)
