import { Link } from 'react-router-dom'
import Logo from '../common/Logo.jsx'
import GitHubIcon from '../common/GitHubIcon.jsx'
import XIcon from '../common/XIcon.jsx'
import { WaveDivider, WaveLines, Stamp } from '../common/GoaDecor.jsx'

export default function Footer() {
  return (
    <footer className="relative bg-cream-soft">
      <WaveDivider className="text-forest" />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-12 pt-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <Logo />
          <p className="mt-5 max-w-xs leading-relaxed text-stone">
            The official identity builder for the 2026 season. One photo, one frame, one pass for
            the whole community.
          </p>
          <p className="mt-4 font-hand text-2xl text-forest">no logins. no servers. just you.</p>
          <div className="mt-6 flex items-center gap-4">
            <Stamp tone="gold">Build</Stamp>
            <Stamp tone="rose">Ship</Stamp>
            <Stamp tone="forest">Belong</Stamp>
          </div>
        </div>

        <nav className="lg:col-span-3 lg:col-start-7" aria-label="Footer">
          <p className="kicker text-stone">Index</p>
          <ul className="mt-4 space-y-2.5">
            {[
              { label: 'Generator', to: '/generator' },
              { label: 'Timeline', to: '/#timeline' },
              { label: 'About', to: '/#about' },
              { label: 'FAQ', to: '/#faq' },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="group inline-flex items-baseline gap-2 font-editorial text-lg font-semibold text-coal transition-colors hover:text-forest"
                >
                  <span className="font-mono text-[10px] text-stone">→</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="kicker text-stone">Base</p>
          <p className="mt-4 font-mono text-xs leading-loose text-stone">
            Hacker House Goa 2026
            <br />
            15.2993° N · 74.1240° E
            <br />
            Season 01 · Monsoon Edition
          </p>
          <p className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-deep-sea">
            <WaveLines size={44} className="text-sea" />
            Goa Coast · Arabian Sea
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="grid size-10 place-items-center rounded-full border border-sand text-stone transition-colors hover:border-forest/40 hover:text-forest"
            >
              <GitHubIcon size={16} />
            </a>
            <a
              href="https://twitter.com/intent/tweet?text=Just%20framed%20myself%20for%20Hacker%20House%20Goa%202026%20%F0%9F%8C%B4%20%23FrameInGoa"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Share on X"
              className="grid size-10 place-items-center rounded-full border border-sand text-stone transition-colors hover:border-forest/40 hover:text-forest"
            >
              <XIcon size={15} />
            </a>
            <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-stone">
              Since 2026
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-sand py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 font-mono text-[11px] uppercase tracking-widest text-stone sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} FrameInGoa · Hacker House Goa</p>
          <p>#FrameInGoa · #HHGoa2026</p>
        </div>
      </div>
    </footer>
  )
}
