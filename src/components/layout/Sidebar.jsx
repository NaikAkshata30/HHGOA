import { NavLink, Link } from 'react-router-dom'
import Logo from '../common/Logo.jsx'
import GitHubIcon from '../common/GitHubIcon.jsx'
import XIcon from '../common/XIcon.jsx'
import { CompassRose } from '../common/GoaDecor.jsx'

const NAV = [
  { label: 'Generator', to: '/generator', exact: true },
  { label: 'Timeline', to: '/#timeline' },
  { label: 'About', to: '/#about' },
  { label: 'FAQ', to: '/#faq' },
]

function NavItem({ item, index }) {
  const classes = ({ isActive }) =>
    `group flex items-baseline gap-3 rounded-2xl px-4 py-3 transition-colors ${
      isActive
        ? 'bg-forest text-cream shadow-forest'
        : 'text-coal hover:bg-forest/5 hover:text-forest'
    }`

  const inner = (
    <>
      <span className="font-mono text-[11px] font-bold">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="font-editorial text-lg font-semibold tracking-tight">{item.label}</span>
      <span className="ml-auto font-mono text-xs opacity-0 transition-opacity group-hover:opacity-60">
        →
      </span>
    </>
  )

  if (item.exact) {
    return (
      <NavLink to={item.to} end className={classes}>
        {inner}
      </NavLink>
    )
  }
  return (
    <Link to={item.to} className={classes({ isActive: false })}>
      {inner}
    </Link>
  )
}

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-sand bg-cream lg:flex">
      <div className="hairline-b px-6 py-7">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6" aria-label="Primary">
        {NAV.map((item, index) => (
          <NavItem key={item.label} item={item} index={index} />
        ))}
      </nav>

      <div className="border-t border-sand px-6 py-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-stone">
              Base · Arabian Sea
            </p>
            <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-deep-sea">
              15.2993° N · 74.1240° E
            </p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-sea">
              Goa Coast · Since 2026
            </p>
          </div>
          <CompassRose size={38} className="text-deep-sea/50" />
        </div>
        <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-stone">
          Build · Ship · Belong
        </p>
        <div className="mt-4 flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="grid size-9 place-items-center rounded-full border border-sand text-stone transition-colors hover:border-forest/40 hover:text-forest"
          >
            <GitHubIcon size={15} />
          </a>
          <a
            href="https://twitter.com/intent/tweet?text=Just%20framed%20myself%20for%20Hacker%20House%20Goa%202026%20%F0%9F%8C%B4%20%23FrameInGoa"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Share on X"
            className="grid size-9 place-items-center rounded-full border border-sand text-stone transition-colors hover:border-forest/40 hover:text-forest"
          >
            <XIcon size={14} />
          </a>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-stone">
            #FrameInGoa
          </span>
        </div>
      </div>
    </aside>
  )
}
