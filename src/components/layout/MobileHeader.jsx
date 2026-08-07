import { Link } from 'react-router-dom'
import Logo from '../common/Logo.jsx'

export default function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-sand bg-cream/90 backdrop-blur-md lg:hidden">
      <div className="hairline-b flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <Logo compact />
        <Link
          to="/generator"
          className="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-sm font-semibold text-cream shadow-forest transition-colors hover:bg-forest-deep"
        >
          Open the studio
        </Link>
      </div>
    </header>
  )
}
