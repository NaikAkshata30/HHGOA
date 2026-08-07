import { useId } from 'react'
import { ChevronDown } from 'lucide-react'

const CONTROL_CLASSES =
  'w-full rounded-2xl border border-sand bg-card px-4 py-3 text-sm text-coal placeholder:text-stone/70 caret-forest shadow-card-soft transition-all focus:border-forest focus:ring-2 focus:ring-forest/20 focus:shadow-panel'

export function Field({ label, hint, htmlFor, error, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block font-editorial text-base font-semibold text-coal">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-stone">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-rose">{error}</p>}
    </div>
  )
}

export function Input({ className = '', ...rest }) {
  return <input className={`${CONTROL_CLASSES} ${className}`} {...rest} />
}

export function Select({ className = '', children, ...rest }) {
  const generatedId = useId()
  const id = rest.id ?? generatedId
  return (
    <div className="relative">
      <select id={id} className={`${CONTROL_CLASSES} appearance-none pr-10 ${className}`} {...rest}>
        {children}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-stone"
      />
    </div>
  )
}
