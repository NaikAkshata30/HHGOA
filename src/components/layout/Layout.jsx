import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import MobileHeader from './MobileHeader.jsx'
import Footer from './Footer.jsx'
import ScrollToTop from '../common/ScrollToTop.jsx'
import { PageSkeleton } from '../common/Skeleton.jsx'
import { SunArc, Coastline } from '../common/GoaDecor.jsx'

export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
      {/* Subtle fixed editorial shapes, well below content in opacity. */}
      <SunArc
        size={420}
        className="pointer-events-none fixed -right-28 -top-28 text-forest opacity-[0.05]"
      />
      <Coastline
        size={540}
        className="pointer-events-none fixed -left-32 bottom-8 text-deep-sea opacity-[0.04]"
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-coal"
      >
        Skip to content
      </a>
      <Sidebar />
      <div className="flex min-h-dvh flex-col lg:pl-72">
        <MobileHeader />
        <main id="main" className="relative flex-1">
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  )
}
