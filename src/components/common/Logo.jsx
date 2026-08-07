import { Link } from 'react-router-dom'
import { Flame } from 'lucide-react'

/**
 * Official HH Goa 2026 brand lockup.
 *  - compact: mark only (used in mobile header / footer)
 */
export default function Logo({ className = '', compact = false }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label="Hacker House Goa 2026 — home"
    >
      <span className="relative grid size-10 place-items-center rounded-2xl gradient-green text-brand-500 shadow-card-soft ring-1 ring-accent-700/30 transition-transform duration-300 group-hover:scale-105">
        <Flame size={18} strokeWidth={2.6} />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-editorial text-lg font-bold tracking-tight text-coal">
            Hacker House
          </span>
          <span className="mt-1 block font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-forest">
            Goa · Season 01
          </span>
        </span>
      )}
    </Link>
  )
}
