import { Component } from 'react'
import { Flame, RotateCcw, RefreshCw } from 'lucide-react'

/**
 * Top-level error boundary. Catches render/lifecycle errors anywhere below and
 * shows a branded recovery screen instead of a white page. "Try again" resets
 * the boundary in place; "Reload" does a full page reload.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  handleReset = () => {
    this.setState({ error: null })
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-dvh flex-col items-center justify-center bg-cream px-4 py-16 text-center">
          <span className="grid size-20 place-items-center rounded-full gradient-green text-brand-500 shadow-card-soft ring-4 ring-forest/10">
            <Flame size={34} strokeWidth={2.4} />
          </span>
          <p className="mt-8 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-forest">
            Error · Lost at sea
          </p>
          <h1 className="mt-3 font-editorial text-4xl font-black tracking-tight text-coal sm:text-5xl">
            We hit a sandbar.
          </h1>
          <p className="mt-4 max-w-md text-stone">
            An unexpected error interrupted the page. Your photos are never uploaded, so nothing
            is at risk — just reload and keep building.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={this.handleReset}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-cream shadow-forest transition-colors hover:bg-forest-deep"
            >
              <RotateCcw size={16} />
              Try again
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-sand bg-card px-7 py-3.5 text-sm font-semibold text-coal transition-colors hover:border-forest/40 hover:text-forest"
            >
              <RefreshCw size={16} />
              Reload page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
