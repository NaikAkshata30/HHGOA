import { forwardRef, memo, useEffect, useMemo, useState } from 'react'
import { DotGrid, Grain, buildBuilderId } from '../frame/decorations.jsx'

export const BUILDER_CARD = { width: 1080, height: 1350 }
export const CENTER = { x: 50, y: 50 }

const C = { cream: '#F8F0DC', forest: '#005C35', deep: '#003D24', gold: '#FFD21F', pink: '#FF1678', teal: '#55B4A7', pale: '#E7D9B7' }
const SERIF = "'Fraunces', Georgia, serif"
const MONO = "'JetBrains Mono', ui-monospace, monospace"
const clamp = (value, fallback = 50) => Math.min(100, Math.max(0, Number(value) || fallback))
const fit = (value = '', max = 64) => value.trim().slice(0, max)

function useFittedFontSize(text, maxWidth, maxSize, minSize, family, weight = 900, letterSpacing = 0) {
  const [size, setSize] = useState(maxSize)

  useEffect(() => {
    let active = true
    async function measure() {
      try { await document.fonts?.ready } catch { /* use available fallback */ }
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (!context || !active) return
      context.font = `${weight} ${maxSize}px ${family}`
      const measured = context.measureText(text.toUpperCase()).width + Math.max(0, text.length - 1) * letterSpacing
      const next = measured > maxWidth ? Math.max(minSize, Math.floor(maxSize * maxWidth / measured)) : maxSize
      if (active) setSize(next)
    }
    measure()
    return () => { active = false }
  }, [text, maxWidth, maxSize, minSize, family, weight, letterSpacing])

  return size
}

function GoaHorizon() {
  return (
    <svg viewBox="0 0 980 190" width="980" height="190" aria-hidden="true">
      <rect width="980" height="190" fill={C.cream} />
      <circle cx="490" cy="67" r="58" fill={C.gold} />
      <path d="M0 88 C72 52 126 72 190 62 C258 50 298 83 364 65 C406 53 439 63 490 75 C548 48 598 73 650 60 C723 42 761 78 827 58 C884 42 925 66 980 51 V101 H0Z" fill="#0B6A3F" />
      <path d="M0 96 C85 67 142 93 215 76 C282 60 324 92 385 76 C437 62 461 80 491 82 C538 63 580 87 637 73 C708 55 755 87 823 70 C887 54 932 78 980 64 V108 H0Z" fill={C.deep} />
      <g fill={C.deep} stroke={C.deep} strokeLinecap="round">
        <path d="M650 70 Q664 38 661 19" fill="none" strokeWidth="6" />
        <path d="M661 28 Q640 13 621 24 Q642 29 657 37 M663 28 Q681 8 699 17 Q681 27 666 37 M660 36 Q638 31 627 43 Q647 43 662 43 M665 37 Q685 28 699 40 Q683 44 665 44" />
        <path d="M322 75 Q314 48 320 31" fill="none" strokeWidth="5" />
        <path d="M320 37 Q303 24 289 34 Q305 38 318 45 M322 37 Q338 20 351 29 Q338 38 323 45 M320 44 Q301 41 296 51 Q309 52 322 50 M323 45 Q341 39 349 49 Q338 52 323 51" />
      </g>
      <rect y="96" width="980" height="94" fill={C.forest} />
      <path d="M0 105 Q58 93 116 105 T232 105 T348 105 T464 105 T580 105 T696 105 T812 105 T928 105 T1044 105" fill="none" stroke={C.teal} strokeWidth="5" opacity=".85" />
      <path d="M0 135 Q58 123 116 135 T232 135 T348 135 T464 135 T580 135 T696 135 T812 135 T928 135 T1044 135" fill="none" stroke="rgba(248,240,220,.68)" strokeWidth="4" />
      <path d="M0 169 Q58 157 116 169 T232 169 T348 169 T464 169 T580 169 T696 169 T812 169 T928 169 T1044 169" fill="none" stroke={C.gold} strokeWidth="3" opacity=".72" />
      <g fill="none" stroke={C.pink} strokeLinecap="round">
        <path d="M430 101 H550" strokeWidth="8" /><path d="M446 113 H534" strokeWidth="7" /><path d="M458 126 H522" strokeWidth="6" /><path d="M467 140 H513" strokeWidth="5" /><path d="M474 154 H506" strokeWidth="4" /><path d="M481 169 H499" strokeWidth="3" />
      </g>
      <g transform="translate(105 107)">
        <path d="M0 24 H72 L59 35 H12Z" fill={C.gold} /><path d="M34 22 V-18" stroke={C.cream} strokeWidth="4" /><path d="M31 -14 L5 18 H31Z" fill={C.cream} /><path d="M38 -10 L61 18 H38Z" fill={C.pink} />
      </g>
    </svg>
  )
}

function PalmWatermarks() {
  return (
    <svg viewBox="0 0 980 1260" width="980" height="1260" aria-hidden="true" style={{ opacity: .065 }}>
      <g fill="none" stroke={C.forest} strokeWidth="5" strokeLinecap="round">
        <path d="M54 385 Q91 266 73 165 M75 207 Q26 150 3 183 M78 208 Q131 143 166 176 M70 232 Q22 210 4 246 M84 238 Q136 204 173 235" />
        <path d="M920 423 Q883 292 904 191 M901 231 Q852 172 824 205 M904 229 Q946 166 978 193 M896 260 Q854 236 830 268 M910 260 Q950 233 979 259" />
      </g>
    </svg>
  )
}

const BuilderCardCanvas = forwardRef(function BuilderCardCanvas({
  previewUrl,
  name = 'Your Name',
  role = 'Builder',
  stack = 'Your stack',
  title = 'THE CURIOUS BUILDER',
  location = '',
  imagePosition = CENTER,
}, ref) {
  const displayName = fit(name, 32) || 'Your Name'
  const displayRole = fit(role, 30) || 'Builder'
  const displayStack = fit(stack, 64) || 'Your stack'
  const displayLocation = fit(location, 28)
  const position = { x: clamp(imagePosition?.x), y: clamp(imagePosition?.y) }
  const builderId = useMemo(() => buildBuilderId(displayName, `${displayRole}-${displayStack}`), [displayName, displayRole, displayStack])
  const builderLabel = `HH-GOA-${builderId.slice(3)}`
  const fittedNameSize = useFittedFontSize(displayName, 820, 82, 46, SERIF, 900, -2)
  const identityLine = `${displayRole} · ${displayStack}`
  const fittedIdentitySize = useFittedFontSize(identityLine, 820, 19, 14, MONO, 700, 2)
  const tagWidth = Math.min(620, Math.max(330, title.length * 14 + 70))

  return (
    <div
      ref={ref}
      id="export-builder-card"
      role="img"
      aria-label={`HH Goa 2026 Builder Pass for ${displayName}`}
      className="relative select-none overflow-hidden"
      style={{ width: 1080, height: 1350, borderRadius: 52, background: C.cream, color: C.deep, border: `2px solid ${C.gold}`, boxSizing: 'border-box' }}
    >
      <div className="absolute" style={{ inset: 10, borderRadius: 44, background: C.deep }} />
      <div className="absolute" style={{ inset: 26, border: `2px solid ${C.gold}`, borderRadius: 36 }} />
      <div className="absolute overflow-hidden" style={{ left: 46, right: 46, top: 46, bottom: 46, borderRadius: 28, background: C.cream }}>
        <DotGrid className="absolute inset-0" spacing={32} dotSize={1.3} color="rgba(0,61,36,.12)" opacity={.45} />
        <div className="absolute inset-0"><PalmWatermarks /></div>
        <div className="absolute pointer-events-none" style={{ inset: 12, border: `1.5px solid rgba(0,92,53,.5)`, borderRadius: 20, zIndex: 20 }} />

        <header className="absolute flex items-center justify-between" style={{ left: 54, right: 54, top: 42, height: 126 }}>
          <div className="overflow-hidden rounded-xl" style={{ width: 490, height: 108, background: C.forest }}>
            <img src="/hh-goa-official.png" alt="Hacker House Goa" className="h-full w-full object-contain" />
          </div>
          <div className="text-right">
            <p style={{ font: `900 37px/.95 ${SERIF}`, letterSpacing: '-.025em', color: C.deep }}>BUILDER</p>
            <p style={{ font: `900 37px/.95 ${SERIF}`, fontStyle: 'italic', letterSpacing: '-.025em', color: C.pink }}>PASS</p>
          </div>
        </header>

        <div className="absolute" style={{ left: 78, top: 217, width: 836, height: 546, borderRadius: 34, background: C.pink, transform: 'translate(-13px,13px) rotate(-1deg)' }} />
        <div className="absolute" style={{ left: 78, top: 217, width: 836, height: 546, borderRadius: 34, background: C.gold, transform: 'translate(14px,14px) rotate(1deg)' }} />
        <div className="absolute overflow-hidden" style={{ left: 78, top: 217, width: 836, height: 546, borderRadius: 34, border: `5px solid ${C.deep}`, background: C.pale, boxShadow: '0 24px 48px rgba(0,61,36,.18)' }}>
          <img
            src={previewUrl}
            alt="Builder portrait"
            decoding="async"
            data-export-cover="true"
            data-export-width="826"
            data-export-height="536"
            data-position-x={position.x}
            data-position-y={position.y}
            className="h-full w-full object-cover"
            style={{ objectPosition: `${position.x}% ${position.y}%` }}
          />
        </div>

        <section className="absolute" style={{ left: 78, right: 78, top: 811, zIndex: 6 }}>
          <p className="uppercase" style={{ width: 820, padding: '8px 0 10px', whiteSpace: 'nowrap', fontFamily: SERIF, fontWeight: 900, fontSize: fittedNameSize, lineHeight: 1.12, letterSpacing: '-.035em', color: C.deep }}>{displayName}</p>
          <p className="uppercase" style={{ marginTop: 5, width: 820, height: 34, whiteSpace: 'nowrap', fontFamily: MONO, fontWeight: 700, fontSize: fittedIdentitySize, lineHeight: '30px', letterSpacing: '.13em', color: C.forest }}>{displayRole}<span style={{ padding: '0 13px', color: C.pink }}>·</span>{displayStack}</p>

          <div className="mt-6 rounded-full" style={{ position: 'relative', width: tagWidth, height: 56, border: `2px solid ${C.deep}`, background: C.gold, boxShadow: `7px 7px 0 ${C.pink}` }}>
            <p className="uppercase" style={{ position: 'absolute', left: 18, right: 18, top: 15, height: 24, textAlign: 'center', whiteSpace: 'nowrap', fontFamily: MONO, fontWeight: 900, fontSize: 17, lineHeight: '24px', letterSpacing: '.13em', color: C.deep }}>{title || 'THE CURIOUS BUILDER'}</p>
          </div>

          <div className="mt-9 flex items-center justify-between border-t" style={{ borderColor: C.pale, paddingTop: 20 }}>
            <p style={{ font: `800 14px ${MONO}`, letterSpacing: '.17em', color: C.forest }}>{builderLabel}</p>
            {displayLocation && <p className="uppercase" style={{ font: `700 13px ${MONO}`, letterSpacing: '.17em', color: C.deep }}>{displayLocation}</p>}
          </div>

        </section>

        <div className="absolute bottom-0 left-0 right-0 h-[350px] overflow-hidden" style={{ zIndex: 2 }}>
          <img src="/builder-pass-goa-scene.png" alt="" className="h-full w-full object-cover" style={{ objectPosition: 'center 68%' }} />
          <span className="absolute right-[92px] bottom-[58px] -rotate-2 font-editorial text-[24px] font-black text-cream">GOA</span>
        </div>
        <div className="absolute bottom-[32px] left-1/2 -translate-x-1/2" style={{ minWidth: 330, padding: '12px 32px', background: C.pink, clipPath: 'polygon(6% 0,94% 0,100% 50%,94% 100%,6% 100%,0 50%)', zIndex: 7 }}>
          <p className="text-center" style={{ font: `900 18px ${MONO}`, letterSpacing: '.19em', color: C.cream }}>#FRAMEINGOA</p>
        </div>
      </div>
      <Grain className="pointer-events-none absolute inset-0 z-30" opacity={.055} />
    </div>
  )
})

export default memo(BuilderCardCanvas)
