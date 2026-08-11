import { Suspense } from 'react'
import { Link, Outlet } from 'react-router-dom'
import ScrollToTop from '../common/ScrollToTop.jsx'
import { PageSkeleton } from '../common/Skeleton.jsx'
import { PalmLeaf, WaveRule } from '../common/GoaDecor.jsx'

export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col bg-cream">
      <ScrollToTop />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:font-semibold focus:text-coal">Skip to content</a>
      <header className="sticky top-0 z-50 border-b border-cream/10 bg-forest-deep text-cream shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="HH Goa 2026 Identity Studio" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-gold font-editorial text-sm font-black text-forest-deep">HH</span>
            <span><span className="block font-editorial text-base font-black leading-none">Hacker House Goa</span><span className="mt-1 block font-mono text-[8px] uppercase tracking-[.24em] text-cream/60">Identity Studio · 2026</span></span>
          </Link>
          <div className="hidden items-center gap-5 font-mono text-[10px] uppercase tracking-[.18em] text-cream/65 sm:flex"><span>Goa, India</span><span className="size-1 rounded-full bg-rose" /><span>28—31 Oct 2026</span></div>
          <a href="#studio" className="rounded-full border border-gold/50 px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-[.16em] text-gold transition-colors hover:bg-gold hover:text-forest-deep">Open Studio</a>
        </div>
      </header>
      <main id="main" className="relative flex-1"><Suspense fallback={<PageSkeleton />}><Outlet /></Suspense></main>
      <footer className="relative overflow-hidden bg-forest-deep text-cream">
        <PalmLeaf size={180} className="pointer-events-none absolute -bottom-20 -right-12 text-gold opacity-10" />
        <WaveRule className="text-sea/25" />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 md:items-end lg:px-8">
          <div><p className="font-editorial text-2xl font-black">HH Goa 2026</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[.22em] text-cream/55">Official Builder Identity Studio</p></div>
          <p className="font-editorial text-3xl font-black text-gold md:text-center">Build · Ship · Belong</p>
          <div className="md:text-right"><p className="font-mono text-xs uppercase tracking-[.17em]">Goa, India · 28—31 Oct</p><p className="mt-3 font-mono text-xs font-bold uppercase tracking-[.2em] text-rose">#FrameInGoa</p></div>
        </div>
      </footer>
    </div>
  )
}
