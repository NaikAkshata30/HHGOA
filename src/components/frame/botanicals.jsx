import { memo } from 'react'

/**
 * Hand-illustrated botanical + scenery artwork for the Goa poster frame.
 * Every element is layered SVG with inline gradient shading, soft shadow
 * tints and overlapping shapes so the art reads as painted, not as clipart.
 * All colors are inline hex/rgba (html2canvas-safe), and each instance
 * carries its own unique gradient id so cloned SVGs never collide.
 */

let gidCounter = 0
const uid = () => `g${(gidCounter += 1).toString(36)}`

/* ------------------------------------------------------------------ */
/* Monstera leaf — a big heart-shaped leaf built from overlapping lobes */
/* ------------------------------------------------------------------ */
export const MonsteraLeaf = memo(function MonsteraLeaf({ className = '', style }) {
  const id = uid()
  return (
    <svg viewBox="0 0 220 240" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-lg`} cx="0.5" cy="0.32" r="0.85">
          <stop offset="0%" stopColor="#5CB882" />
          <stop offset="45%" stopColor="#2E8F5A" />
          <stop offset="100%" stopColor="#0C4A2B" />
        </radialGradient>
        <radialGradient id={`${id}-sh`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(8,48,26,0.28)" />
          <stop offset="100%" stopColor="rgba(8,48,26,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="126" cy="216" rx="72" ry="18" fill={`url(#${id}-sh)`} />
      <path
        d="M 100,150 C 100,118 102,60 108,12 C 114,60 116,118 116,150 C 112,156 104,156 100,150 Z
           M 104,158 C 88,132 60,86 26,52 C 22,64 30,88 42,108 C 60,140 80,162 94,170 C 100,172 104,168 104,158 Z
           M 100,180 C 64,170 28,146 10,120 C 10,134 20,156 36,174 C 54,192 74,198 90,198 C 96,198 100,194 100,180 Z
           M 104,206 C 78,206 46,200 28,190 C 34,204 48,218 66,226 C 82,232 94,230 104,218 Z
           M 116,158 C 132,132 160,86 194,52 C 198,64 190,88 178,108 C 160,140 140,162 126,170 C 120,172 116,168 116,158 Z
           M 120,180 C 156,170 192,146 210,120 C 210,134 200,156 184,174 C 166,192 146,198 130,198 C 124,198 120,194 120,180 Z
           M 116,206 C 142,206 174,200 192,190 C 186,204 172,218 154,226 C 138,232 126,230 116,218 Z"
        fill={`url(#${id}-lg)`}
      />
      <path
        d="M 98,214 C 92,196 96,178 110,172 C 124,178 128,196 122,214 C 118,220 102,220 98,214 Z"
        fill={`url(#${id}-lg)`}
      />
      <ellipse cx="86" cy="74" rx="3.5" ry="8" transform="rotate(-26 86 74)" fill="rgba(6,45,27,0.5)" />
      <ellipse cx="134" cy="74" rx="3.5" ry="8" transform="rotate(26 134 74)" fill="rgba(6,45,27,0.5)" />
      <ellipse cx="110" cy="48" rx="3.5" ry="9" transform="rotate(8 110 48)" fill="rgba(6,45,27,0.5)" />
      <path
        d="M 110,206 C 109,150 110,80 112,20
           M 106,204 C 92,180 66,120 30,62
           M 104,200 C 74,186 36,152 14,126
           M 104,206 C 82,208 52,202 32,192
           M 114,204 C 128,180 154,120 190,62
           M 116,200 C 146,186 184,152 206,126
           M 116,206 C 138,208 168,202 188,192"
        stroke="rgba(7,50,28,0.45)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 92,66 C 70,92 52,122 40,148"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M 110,240 C 104,230 106,222 110,214" stroke="#0C4A2B" strokeWidth="7" strokeLinecap="round" fill="none" />
    </svg>
  )
})

/* ------------------------------------------------------------------ */
/* Palm frond — curving rachis with overlapping leaflets                */
/* ------------------------------------------------------------------ */
export const PalmFrond = memo(function PalmFrond({ className = '', style }) {
  const id = uid()
  const leaf = [
    'M 40,24 C 60,14 78,8 96,8 C 80,14 66,20 52,26 C 46,28 42,28 40,24 Z',
    'M 64,32 C 86,20 106,12 126,14 C 108,22 90,30 74,36 C 68,38 66,36 64,32 Z',
    'M 90,44 C 110,34 130,26 154,28 C 134,36 116,44 100,50 C 94,52 92,48 90,44 Z',
    'M 116,58 C 136,50 156,44 178,46 C 158,54 138,60 124,64 C 118,66 118,62 116,58 Z',
    'M 142,74 C 160,66 178,62 198,66 C 178,74 160,78 148,80 C 144,82 144,78 142,74 Z',
    'M 166,92 C 182,86 196,84 212,90 C 194,98 178,98 170,98 C 168,98 166,96 166,92 Z',
    'M 188,108 C 202,106 212,108 224,116 C 208,122 196,118 190,114 C 188,114 188,112 188,108 Z',
    'M 50,28 C 38,34 26,44 16,58 C 30,54 42,44 52,34 C 54,32 52,30 50,28 Z',
    'M 78,38 C 64,48 52,62 42,82 C 58,72 72,58 82,44 C 84,42 82,40 78,38 Z',
    'M 106,52 C 92,64 80,80 70,102 C 88,90 100,72 110,58 C 112,56 110,54 106,52 Z',
    'M 134,68 C 118,80 106,96 98,120 C 116,108 128,88 138,74 C 140,72 138,70 134,68 Z',
    'M 160,84 C 146,96 136,112 126,136 C 144,122 154,102 164,90 C 166,88 164,86 160,84 Z',
    'M 184,102 C 170,114 162,130 154,150 C 172,136 180,118 188,108 C 190,106 188,104 184,102 Z',
    'M 206,120 C 194,130 188,142 182,160 C 198,148 202,134 210,126 C 210,124 208,122 206,120 Z',
  ]
  const dark = [
    'M 50,28 C 38,34 26,44 16,58 C 30,54 42,44 52,34 C 54,32 52,30 50,28 Z',
    'M 78,38 C 64,48 52,62 42,82 C 58,72 72,58 82,44 C 84,42 82,40 78,38 Z',
    'M 106,52 C 92,64 80,80 70,102 C 88,90 100,72 110,58 C 112,56 110,54 106,52 Z',
    'M 134,68 C 118,80 106,96 98,120 C 116,108 128,88 138,74 C 140,72 138,70 134,68 Z',
    'M 160,84 C 146,96 136,112 126,136 C 144,122 154,102 164,90 C 166,88 164,86 160,84 Z',
    'M 184,102 C 170,114 162,130 154,150 C 172,136 180,118 188,108 C 190,106 188,104 184,102 Z',
  ]
  return (
    <svg viewBox="0 0 260 170" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-lg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7CC896" />
          <stop offset="100%" stopColor="#1E7A4C" />
        </linearGradient>
        <linearGradient id={`${id}-dg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E7A4C" />
          <stop offset="100%" stopColor="#0C4A2B" />
        </linearGradient>
      </defs>
      <path d="M 20,16 Q 120,34 236,132" stroke="#0E5B38" strokeWidth="7" strokeLinecap="round" fill="none" />
      {dark.map((d, i) => (
        <path key={`d${i}`} d={d} fill={`url(#${id}-dg)`} />
      ))}
      {leaf.map((d, i) => (
        <path key={`l${i}`} d={d} fill={`url(#${id}-lg)`} />
      ))}
      <path d="M 24,20 C 70,26 140,56 234,128" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  )
})

/* ------------------------------------------------------------------ */
/* Hibiscus — five layered petals with deep throat and long stamen      */
/* ------------------------------------------------------------------ */
export const Hibiscus = memo(function Hibiscus({ className = '', style }) {
  const id = uid()
  const petals = [
    'M 100,104 C 66,96 40,68 34,34 C 52,20 84,30 106,62 C 112,76 108,94 100,104 Z',
    'M 102,104 C 132,84 166,72 188,84 C 196,102 176,124 140,116 C 120,112 108,110 102,104 Z',
    'M 104,104 C 128,126 148,152 140,184 C 122,200 98,192 94,158 C 92,136 98,116 104,104 Z',
    'M 96,104 C 72,126 52,152 60,184 C 78,200 102,192 106,158 C 108,136 102,116 96,104 Z',
    'M 98,104 C 68,84 34,72 12,84 C 4,102 24,124 60,116 C 80,112 92,110 98,104 Z',
  ]
  const creases = [
    'M 100,104 C 92,84 74,56 62,40',
    'M 102,104 C 122,92 150,84 168,88',
    'M 104,104 C 118,124 128,152 124,174',
    'M 96,104 C 82,124 72,152 76,174',
    'M 98,104 C 78,92 50,84 32,88',
  ]
  return (
    <svg viewBox="0 0 200 220" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-pg`} cx="0.5" cy="0.46" r="0.9">
          <stop offset="0%" stopColor="#7E0E30" />
          <stop offset="38%" stopColor="#E62E50" />
          <stop offset="72%" stopColor="#FF6A5C" />
          <stop offset="100%" stopColor="#FF9A85" />
        </radialGradient>
        <radialGradient id={`${id}-cg`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#2A0818" />
          <stop offset="100%" stopColor="#7A0E30" />
        </radialGradient>
        <linearGradient id={`${id}-eg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3FA06A" />
          <stop offset="100%" stopColor="#0E5B38" />
        </linearGradient>
      </defs>
      <ellipse cx="112" cy="206" rx="52" ry="12" fill="rgba(120,14,48,0.18)" />
      <path d="M 98,126 C 82,122 70,128 64,142 C 80,156 98,146 108,134 Z" fill={`url(#${id}-eg)`} />
      <path d="M 102,126 C 120,120 134,124 140,138 C 122,152 106,144 96,134 Z" fill={`url(#${id}-eg)`} />
      <path d="M 100,104 C 66,96 40,68 34,34 C 52,20 84,30 106,62 C 112,76 108,94 100,104 Z" fill={`url(#${id}-pg)`} opacity="0.92" />
      {petals.slice(1).map((d, i) => (
        <path key={i} d={d} fill={`url(#${id}-pg)`} />
      ))}
      {creases.map((d, i) => (
        <path key={i} d={d} stroke="rgba(120,8,40,0.35)" strokeWidth="3" strokeLinecap="round" fill="none" />
      ))}
      <path d="M 60,44 C 52,42 44,44 40,46" stroke="rgba(255,255,255,0.5)" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M 168,88 C 176,86 182,88 186,92" stroke="rgba(255,255,255,0.5)" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M 122,176 C 130,174 134,178 136,182" stroke="rgba(255,255,255,0.5)" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="100" cy="104" r="16" fill={`url(#${id}-cg)`} />
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const r = 11
        const x = 100 + Math.cos((a * Math.PI) / 180) * r
        const y = 104 + Math.sin((a * Math.PI) / 180) * r
        return <circle key={a} cx={x} cy={y} r="1.6" fill="#FFD43B" />
      })}
      <path d="M 100,94 C 100,68 102,48 106,28" stroke="#8E1030" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M 100,94 C 100,68 102,48 106,28" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <ellipse cx="108" cy="24" rx="5.5" ry="9" transform="rotate(18 108 24)" fill="#FFC23F" />
      <circle cx="107" cy="20" r="1.6" fill="#B87A14" />
      <circle cx="110" cy="27" r="1.6" fill="#B87A14" />
    </svg>
  )
})

/* ------------------------------------------------------------------ */
/* Frangipani — five plump petals, creamy pink with golden throat       */
/* ------------------------------------------------------------------ */
export const Frangipani = memo(function Frangipani({ className = '', style }) {
  const id = uid()
  const back = [
    'M 100,96 C 84,78 72,52 76,28 C 96,18 114,36 120,66 C 124,82 116,92 100,96 Z',
    'M 104,102 C 122,124 134,152 124,178 C 104,190 88,176 88,148 C 88,128 96,112 104,102 Z',
    'M 96,102 C 78,124 66,152 76,178 C 96,190 112,176 112,148 C 112,128 104,112 96,102 Z',
  ]
  const front = [
    'M 104,98 C 128,80 154,72 176,80 C 182,100 164,120 136,116 C 118,112 108,108 104,98 Z',
    'M 96,98 C 72,80 46,72 24,80 C 18,100 36,120 64,116 C 82,112 92,108 96,98 Z',
  ]
  const streaks = [
    'M 92,40 C 88,34 84,30 80,30',
    'M 168,88 C 172,84 176,82 180,84',
    'M 116,170 C 114,174 112,178 108,180',
    'M 84,170 C 86,174 88,178 92,180',
    'M 32,88 C 28,84 24,82 20,84',
  ]
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-fg`} cx="0.5" cy="0.5" r="0.9">
          <stop offset="0%" stopColor="#FFF6E8" />
          <stop offset="35%" stopColor="#FFDCBA" />
          <stop offset="75%" stopColor="#F5AA7C" />
          <stop offset="100%" stopColor="#E88C5E" />
        </radialGradient>
        <radialGradient id={`${id}-cr`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFF3B0" />
          <stop offset="60%" stopColor="#FFC23F" />
          <stop offset="100%" stopColor="#E8953A" />
        </radialGradient>
        <linearGradient id={`${id}-eg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2F8F5A" />
          <stop offset="100%" stopColor="#0C4A2B" />
        </linearGradient>
      </defs>
      <path d="M 100,120 C 118,106 142,100 160,108 C 144,124 118,130 100,124 Z" fill={`url(#${id}-eg)`} />
      <path d="M 100,120 C 82,108 62,104 48,112 C 62,126 86,130 100,124 Z" fill={`url(#${id}-eg)`} opacity="0.9" />
      {back.map((d, i) => (
        <path key={`b${i}`} d={d} fill={`url(#${id}-fg)`} />
      ))}
      {front.map((d, i) => (
        <path key={`f${i}`} d={d} fill={`url(#${id}-fg)`} />
      ))}
      {streaks.map((d, i) => (
        <path key={i} d={d} stroke="rgba(255,255,255,0.7)" strokeWidth="3" strokeLinecap="round" fill="none" />
      ))}
      <circle cx="100" cy="100" r="15" fill={`url(#${id}-cr)`} />
      {[30, 90, 150, 210, 270, 330].map((a) => {
        const r = 9
        const x = 100 + Math.cos((a * Math.PI) / 180) * r
        const y = 100 + Math.sin((a * Math.PI) / 180) * r
        return <circle key={a} cx={x} cy={y} r="1.5" fill="#C87F22" />
      })}
    </svg>
  )
})

/* ------------------------------------------------------------------ */
/* Coconut palm — curving segmented trunk, canopy of drooping fronds    */
/* ------------------------------------------------------------------ */
export const CoconutPalm = memo(function CoconutPalm({ className = '', style }) {
  const id = uid()
  const angles = [210, 250, 290, 330, 10, 50, 90, 130, 170]
  return (
    <svg viewBox="0 0 260 340" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-tg`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8A5A2E" />
          <stop offset="50%" stopColor="#6E4420" />
          <stop offset="100%" stopColor="#8A5A2E" />
        </linearGradient>
        <radialGradient id={`${id}-cg`} cx="0.4" cy="0.35" r="0.8">
          <stop offset="0%" stopColor="#8A5A2E" />
          <stop offset="55%" stopColor="#5E3618" />
          <stop offset="100%" stopColor="#3F240E" />
        </radialGradient>
        <linearGradient id={`${id}-fg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5CB882" />
          <stop offset="100%" stopColor="#0E5B38" />
        </linearGradient>
      </defs>
      <path
        d="M 122,332 C 116,280 112,200 122,92 C 128,44 136,26 146,20"
        stroke={`url(#${id}-tg)`}
        strokeWidth="26"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 108,290 Q 121,297 136,289
           M 106,256 Q 120,263 134,255
           M 105,222 Q 119,229 133,221
           M 105,188 Q 119,195 133,187
           M 106,154 Q 120,161 134,153
           M 108,120 Q 121,127 136,119
           M 112,88 Q 124,95 138,87"
        stroke="rgba(80,48,20,0.55)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 128,330 C 122,278 118,198 128,94"
        stroke="rgba(255,220,160,0.35)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="128" cy="30" rx="11" ry="8" transform="rotate(-30 128 30)" fill={`url(#${id}-cg)`} />
      <ellipse cx="150" cy="26" rx="10" ry="7" transform="rotate(15 150 26)" fill={`url(#${id}-cg)`} />
      <ellipse cx="140" cy="42" rx="11" ry="8" fill={`url(#${id}-cg)`} />
      <ellipse cx="126" cy="28" rx="3" ry="2" transform="rotate(-30 126 28)" fill="rgba(255,220,160,0.6)" />
      {angles.map((a) => (
        <g key={a} transform={`rotate(${a} 136 28)`}>
          <path d="M 0,0 Q 40,30 118,70" stroke="#0E5B38" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M 16,16 C 10,26 6,40 4,58 C 16,48 24,32 24,20 Z" fill={`url(#${id}-fg)`} />
          <path d="M 38,28 C 30,40 26,56 26,74 C 40,62 48,44 48,32 Z" fill={`url(#${id}-fg)`} />
          <path d="M 62,42 C 54,54 50,70 52,90 C 66,76 74,58 72,46 Z" fill={`url(#${id}-fg)`} />
          <path d="M 84,56 C 76,68 74,84 78,102 C 92,88 96,70 94,58 Z" fill={`url(#${id}-fg)`} />
          <path d="M 104,66 C 98,78 98,92 102,108 C 114,96 114,78 112,68 Z" fill={`url(#${id}-fg)`} />
          <path d="M 8,6 C 16,0 24,-4 32,-4 C 24,4 16,10 12,12 Z" fill={`url(#${id}-fg)`} />
          <path d="M 26,12 C 36,6 46,4 56,6 C 46,14 36,18 30,18 Z" fill={`url(#${id}-fg)`} />
        </g>
      ))}
    </svg>
  )
})

/* ------------------------------------------------------------------ */
/* Portuguese church vignette on a grassy mound                         */
/* ------------------------------------------------------------------ */
export const ChurchVignette = memo(function ChurchVignette({ className = '', style }) {
  const id = uid()
  return (
    <svg viewBox="0 0 200 220" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-gg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3F9A63" />
          <stop offset="100%" stopColor="#1E6B42" />
        </linearGradient>
        <linearGradient id={`${id}-st`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6EAD4" />
          <stop offset="100%" stopColor="#D3BA93" />
        </linearGradient>
        <linearGradient id={`${id}-rk`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A9B6AC" />
          <stop offset="100%" stopColor="#5C6B5E" />
        </linearGradient>
      </defs>
      <path
        d="M 0,220 L 0,196 C 40,180 90,176 130,184 C 170,192 190,204 200,208 L 200,220 Z"
        fill={`url(#${id}-gg)`}
      />
      <path d="M 0,220 L 0,205 C 30,196 70,194 110,198 C 150,202 178,208 200,212 L 200,220 Z" fill="rgba(12,60,35,0.4)" />
      <path d="M 70,200 L 130,200 L 134,208 L 66,208 Z" fill="#C9B183" />
      <path d="M 74,150 L 74,200 L 126,200 L 126,150 Z" fill={`url(#${id}-st)`} />
      <path d="M 64,150 L 100,120 L 136,150 Z" fill={`url(#${id}-st)`} />
      <path d="M 104,150 L 104,96 L 126,96 L 126,150 Z" fill={`url(#${id}-st)`} />
      <path d="M 102,98 L 115,84 L 128,98 Z" fill="#A85A32" />
      <path d="M 114,88 L 114,78 L 110,78 L 110,74 L 114,74 L 114,70 L 118,70 L 118,74 L 122,74 L 122,78 L 118,78 L 118,88 Z" fill="#5C4A2E" />
      <path d="M 84,200 L 84,178 a 16,16 0 0 1 32,0 L 116,200 Z" fill="#4A3018" />
      <path d="M 92,168 a 8,8 0 0 1 16,0 L 108,184 L 92,184 Z" fill="#4A3018" />
      <circle cx="100" cy="138" r="7" fill="#6B4A20" />
      <path d="M 93,138 L 107,138 M 100,131 L 100,145" stroke="#C9B183" strokeWidth="1.5" />
      <path d="M 100,96 L 126,96 L 126,200 L 100,200 Z" fill="rgba(120,70,30,0.18)" />
      <path d="M 80,164 L 88,164 M 82,190 L 90,190" stroke="rgba(120,70,30,0.3)" strokeWidth="2" />
    </svg>
  )
})

/* ------------------------------------------------------------------ */
/* Beach grass tuft                                                     */
/* ------------------------------------------------------------------ */
export const BeachGrass = memo(function BeachGrass({ className = '', style }) {
  return (
    <svg viewBox="0 0 40 48" className={className} style={style} aria-hidden="true">
      <path d="M 20,46 C 18,36 14,28 8,20" stroke="#2F7D5B" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M 22,46 C 22,36 24,28 30,18" stroke="#2F7D5B" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M 20,46 C 20,38 18,32 16,24" stroke="#7CC896" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 22,46 C 24,38 26,32 28,24" stroke="#1E5B3A" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M 19,46 C 12,40 8,36 6,32" stroke="#1E5B3A" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
})

/* ------------------------------------------------------------------ */
/* Small sailboat                                                       */
/* ------------------------------------------------------------------ */
export const Sailboat = memo(function Sailboat({ className = '', style }) {
  return (
    <svg viewBox="0 0 48 44" className={className} style={style} aria-hidden="true">
      <path d="M 4,38 C 12,36 20,36 30,38" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M 8,34 L 40,34 L 34,42 L 14,42 Z" fill="#6E3E18" />
      <path d="M 8,34 L 40,34" stroke="#8A5A2E" strokeWidth="1.5" />
      <path d="M 24,34 L 24,6" stroke="#3A2A18" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 25,8 C 36,12 40,20 40,30 L 25,32 Z" fill="#FFFDF6" />
      <path d="M 25,8 C 36,12 40,20 40,30 L 25,32 Z" stroke="rgba(40,60,80,0.25)" strokeWidth="1" fill="none" />
      <path d="M 23,10 L 23,32 L 12,32 Z" fill="rgba(255,255,255,0.85)" />
      <path d="M 24,6 L 31,8.5 L 24,11 Z" fill="#D64550" />
    </svg>
  )
})

/* ------------------------------------------------------------------ */
/* Postcard paper — a little illustrated postcard with a postmark       */
/* ------------------------------------------------------------------ */
export const PostcardPaper = memo(function PostcardPaper({ className = '', style }) {
  const id = uid()
  return (
    <svg viewBox="0 0 200 150" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-cg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF6" />
          <stop offset="100%" stopColor="#F3E8D0" />
        </linearGradient>
        <linearGradient id={`${id}-sk`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DDF5FF" />
          <stop offset="100%" stopColor="#BFE9F8" />
        </linearGradient>
        <linearGradient id={`${id}-sd`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F3E1BD" />
          <stop offset="100%" stopColor="#DEBB82" />
        </linearGradient>
        <clipPath id={`${id}-sc`}>
          <rect x="9" y="9" width="182" height="132" rx="10" />
        </clipPath>
      </defs>
      <rect x="2" y="2" width="196" height="146" rx="16" fill={`url(#${id}-cg)`} stroke="#D9CCB0" strokeWidth="1.5" />
      <rect x="9" y="9" width="182" height="132" rx="10" fill="none" stroke="#D9CCB0" strokeWidth="1" strokeDasharray="5 4" />
      <g clipPath={`url(#${id}-sc)`}>
        <rect x="9" y="9" width="86" height="52" fill={`url(#${id}-sk)`} />
        <path d="M 9,61 L 9,42 C 24,36 46,34 64,40 C 80,45 88,52 95,58 L 95,61 Z" fill={`url(#${id}-sd)`} />
        <path d="M 9,52 C 26,50 46,50 62,53 L 62,61 L 9,61 Z" fill="#6BC5E8" />
        <path d="M 16,52 L 78,52" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
        <circle cx="52" cy="26" r="8" fill="#FFD43B" />
        <path d="M 52,26 L 52,20" stroke="#E8953A" strokeWidth="1.5" />
        <path d="M 30,44 C 34,41 38,41 42,44" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" fill="none" />
        <path d="M 56,30 C 60,28 64,28 68,30" stroke="rgba(15,106,168,0.6)" strokeWidth="1.2" fill="none" />
      </g>
      <text x="17" y="104" fontFamily="'JetBrains Mono', ui-monospace, monospace" fontSize="13" fontWeight="700" letterSpacing="0.2em" fill="#1D2621">
        GOA · INDIA
      </text>
      <text x="17" y="120" fontFamily="'JetBrains Mono', ui-monospace, monospace" fontSize="10" letterSpacing="0.12em" fill="#5F665C">
        Season 2026
      </text>
      <line x1="17" y1="128" x2="137" y2="128" stroke="#D9CCB0" strokeWidth="1.5" />
      <line x1="17" y1="134" x2="137" y2="134" stroke="#D9CCB0" strokeWidth="1.5" />
      <circle cx="160" cy="40" r="15" fill="none" stroke="#C23B2E" strokeWidth="1.6" />
      <circle cx="160" cy="40" r="9" fill="none" stroke="#C23B2E" strokeWidth="1.1" />
      <path d="M 160,28 L 160,52 M 148,40 L 172,40" stroke="#C23B2E" strokeWidth="1.1" />
      <circle cx="160" cy="40" r="2.5" fill="#C23B2E" />
      <text x="138" y="66" fontFamily="'JetBrains Mono', ui-monospace, monospace" fontSize="8" letterSpacing="0.08em" fill="#C23B2E">
        HAVEN · 2026
      </text>
    </svg>
  )
})

/* ------------------------------------------------------------------ */
/* Coordinate stamp — a round rubber stamp with the goa coordinates     */
/* ------------------------------------------------------------------ */
export const CoordinateStamp = memo(function CoordinateStamp({ className = '', style }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <circle cx="50" cy="50" r="44" fill="none" stroke="#C23B2E" strokeWidth="1.6" strokeDasharray="3.5 4" />
      <circle cx="50" cy="50" r="37" fill="none" stroke="#C23B2E" strokeWidth="1.2" />
      <text x="50" y="44" textAnchor="middle" fontFamily="'JetBrains Mono', ui-monospace, monospace" fontSize="14" fontWeight="700" fill="#C23B2E">
        15.2993° N
      </text>
      <text x="50" y="62" textAnchor="middle" fontFamily="'JetBrains Mono', ui-monospace, monospace" fontSize="14" fontWeight="700" fill="#C23B2E">
        74.1240° E
      </text>
      <circle cx="50" cy="76" r="2.4" fill="#C23B2E" />
      <path d="M 50,70 L 50,82 M 44,76 L 56,76" stroke="#C23B2E" strokeWidth="1" />
      <path d="M 50,12 L 50,20 M 50,80 L 50,88 M 12,50 L 20,50 M 80,50 L 88,50" stroke="#C23B2E" strokeWidth="1" opacity="0.6" />
    </svg>
  )
})

/* ------------------------------------------------------------------ */
/* Coastal landscape — one unified scene: sky, church on a promontory,  */
/* sea with waves and a small sailboat                                  */
/* ------------------------------------------------------------------ */
export const CoastalLandscape = memo(function CoastalLandscape({ className = '', style }) {
  const id = uid()
  return (
    <svg viewBox="0 0 240 330" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E9F7EF" />
          <stop offset="100%" stopColor="#F8EEDB" />
        </linearGradient>
        <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7FD0E8" />
          <stop offset="100%" stopColor="#1E7FBE" />
        </linearGradient>
        <linearGradient id={`${id}-hill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5AA97A" />
          <stop offset="100%" stopColor="#175735" />
        </linearGradient>
        <linearGradient id={`${id}-rk`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B4C0B4" />
          <stop offset="100%" stopColor="#5C6B5E" />
        </linearGradient>
        <radialGradient id={`${id}-sh`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(20,50,35,0.24)" />
          <stop offset="100%" stopColor="rgba(20,50,35,0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="240" height="330" fill={`url(#${id}-sky)`} />
      <ellipse cx="200" cy="300" rx="120" ry="24" fill={`url(#${id}-sh)`} />
      <circle cx="196" cy="46" r="15" fill="#FFD43B" />
      <circle cx="196" cy="46" r="20" fill="none" stroke="#FFC23F" strokeWidth="1.5" />
      <path d="M 128,60 C 136,56 142,56 148,58 M 118,70 C 128,66 136,66 144,69" stroke="rgba(60,90,80,0.55)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M 0,210 L 240,210 L 240,330 L 0,330 Z" fill={`url(#${id}-sea)`} />
      <path d="M 160,226 L 240,226 M 170,240 L 240,240 M 190,254 L 240,254" stroke="rgba(255,255,255,0.4)" strokeWidth="1.6" />
      <path d="M 208,262 Q 216,258 224,262 M 196,282 Q 204,278 212,282" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" fill="none" />
      <path
        d="M 0,200 C 50,186 110,182 156,196 C 186,206 204,222 214,242 C 220,254 226,264 232,272 L 232,330 L 0,330 Z"
        fill={`url(#${id}-hill)`}
      />
      <path
        d="M 156,196 C 186,206 204,222 214,242 C 220,254 226,264 232,272"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="2"
        fill="none"
      />
      <g transform="translate(24,40)">
        <svg width="150" height="165" viewBox="0 0 200 220">
          <ChurchVignette style={{ width: 150, height: 165 }} />
        </svg>
      </g>
      <g transform="translate(150,206)">
        <svg width="20" height="24" viewBox="0 0 40 48">
          <BeachGrass style={{ width: 20, height: 24 }} />
        </svg>
      </g>
      <path d="M 148,318 C 142,310 144,302 152,300 C 160,298 166,304 164,314 Z" fill={`url(#${id}-rk)`} />
      <path d="M 170,325 C 166,319 168,313 174,312 C 180,311 184,315 182,323 Z" fill={`url(#${id}-rk)`} opacity="0.9" />
      <g transform="translate(200,246) scale(0.75)">
        <Sailboat style={{ width: 48, height: 44 }} />
      </g>
    </svg>
  )
})

/* ------------------------------------------------------------------ */
/* Coastline banner — one continuous illustrated coastline              */
/* ------------------------------------------------------------------ */
export const CoastBanner = memo(function CoastBanner({ className = '', style }) {
  const id = uid()
  const scallops = []
  for (let x = 0; x < 1080; x += 40) {
    scallops.push(`Q ${x + 20},28 ${x + 40},36`)
  }
  return (
    <svg viewBox="0 0 1080 66" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(84,185,221,0.95)" />
          <stop offset="55%" stopColor="rgba(31,137,190,0.96)" />
          <stop offset="100%" stopColor="rgba(15,111,168,1)" />
        </linearGradient>
        <linearGradient id={`${id}-dp`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(8,60,92,0)" />
          <stop offset="100%" stopColor="rgba(8,60,92,0.5)" />
        </linearGradient>
        <linearGradient id={`${id}-sand`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F3E1BD" />
          <stop offset="100%" stopColor="#DFBB82" />
        </linearGradient>
        <linearGradient id={`${id}-rk`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B4C0B4" />
          <stop offset="100%" stopColor="#5C6B5E" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="1080" height="36" fill={`url(#${id}-sea)`} />
      <rect x="0" y="0" width="1080" height="36" fill={`url(#${id}-dp)`} />
      <path d="M 0,8 L 1080,8 M 0,15 L 1080,15" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
      <path d={`M 0,36 ${scallops.join(' ')} L 1080,38 L 0,38 Z`} fill="rgba(240,252,255,0.9)" />
      <path d={`M 0,36 ${scallops.join(' ')}`} stroke="rgba(255,255,255,0.85)" strokeWidth="3" fill="none" />
      <rect x="0" y="36" width="1080" height="30" fill={`url(#${id}-sand)`} />
      <rect x="0" y="36" width="1080" height="3" fill="rgba(160,120,70,0.35)" />
      {[
        'M 120,52 C 150,49 180,50 210,53',
        'M 360,60 C 400,57 440,58 470,61',
        'M 640,50 C 680,47 720,48 760,51',
        'M 900,61 C 940,58 980,59 1010,62',
        'M 520,54 C 550,51 580,52 600,54',
        'M 60,60 C 90,57 120,58 140,60',
        'M 800,56 C 830,53 860,54 880,56',
      ].map((d, i) => (
        <path key={i} d={d} stroke="rgba(180,140,80,0.4)" strokeWidth="2" fill="none" />
      ))}
      <path d="M 700,66 C 740,60 800,60 850,66 L 700,66 Z" fill="rgba(190,150,90,0.25)" />
      <path d="M 100,36 C 92,30 90,20 96,14 C 104,8 118,10 122,18 C 126,26 122,34 116,36 Z" fill={`url(#${id}-rk)`} />
      <path d="M 104,20 C 108,17 114,17 118,20" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 900,36 C 894,30 892,22 898,16 C 906,10 920,12 924,20 C 928,28 922,34 916,36 Z" fill={`url(#${id}-rk)`} />
      <path d="M 902,22 C 906,19 912,19 916,22" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <g transform="translate(248,4)">
        <Sailboat style={{ width: 48, height: 44 }} />
      </g>
      <g transform="translate(940,6) scale(0.5)">
        <Sailboat style={{ width: 48, height: 44 }} />
      </g>
      <path d="M 34,62 C 30,52 28,44 28,38 C 24,50 24,58 30,64" stroke="#2F7D5B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M 38,64 C 36,54 34,46 36,38 C 34,50 36,58 40,64" stroke="#7CC896" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M 42,64 C 42,54 44,46 48,38 C 46,50 46,58 44,64" stroke="#1E5B3A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M 1030,62 C 1026,52 1024,44 1024,38 C 1020,50 1020,58 1026,64" stroke="#2F7D5B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M 1034,64 C 1032,54 1030,46 1032,38 C 1030,50 1032,58 1036,64" stroke="#7CC896" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M 1038,64 C 1038,54 1040,46 1044,38 C 1042,50 1042,58 1040,64" stroke="#1E5B3A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  )
})

/* ------------------------------------------------------------------ */
/* Swirl ornament — hand-drawn curls used under the name                */
/* ------------------------------------------------------------------ */
export const SwirlOrnament = memo(function SwirlOrnament({ className = '', style }) {
  return (
    <svg viewBox="0 0 120 22" className={className} style={style} aria-hidden="true">
      <path
        d="M 4,11 C 20,4 34,4 44,11 C 34,17 22,17 12,13"
        stroke="#C23B2E"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 116,11 C 100,4 86,4 76,11 C 86,17 98,17 108,13"
        stroke="#C23B2E"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="60" cy="11" r="4" fill="#C23B2E" />
      <circle cx="60" cy="11" r="1.6" fill="#FFC23F" />
    </svg>
  )
})
