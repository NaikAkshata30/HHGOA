import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react'

const ToastContext = createContext(null)

const TYPES = {
  success: {
    icon: CheckCircle2,
    accent: 'border-forest/40 text-forest',
  },
  info: {
    icon: Info,
    accent: 'border-gold/70 text-coal',
  },
  error: {
    icon: AlertTriangle,
    accent: 'border-rose/40 text-rose',
  },
}
const TOAST_LIFETIME = 3500
const MAX_VISIBLE = 4

let nextId = 0

/**
 * Global toast system. Renders an animated, accessible live region in the
 * bottom-right corner and exposes a stable `useToast()` API:
 *
 *   const toast = useToast()
 *   toast.success('Photo added')
 *   toast.error('Something went wrong')
 *   toast.info('Heads up')
 *
 * Toasts auto-dismiss and stack up to MAX_VISIBLE.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef(new Map())

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
    const timer = timers.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.current.delete(id)
    }
  }, [])

  const push = useCallback(
    (type, message) => {
      const id = ++nextId
      setToasts((current) => [...current.slice(-(MAX_VISIBLE - 1)), { id, type, message }])
      timers.current.set(id, setTimeout(() => dismiss(id), TOAST_LIFETIME))
    },
    [dismiss],
  )

  const toast = useMemo(
    () => ({
      success: (message) => push('success', message),
      info: (message) => push('info', message),
      error: (message) => push('error', message),
    }),
    [push],
  )

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 right-4 z-[70] flex w-[calc(100vw-2rem)] max-w-xs flex-col gap-2.5 sm:w-80"
      >
        <AnimatePresence>
          {toasts.map((item) => {
            const config = TYPES[item.type]
            const Icon = config.icon
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className={`pointer-events-auto flex items-start gap-3 rounded-2xl border bg-card/95 p-4 shadow-panel backdrop-blur ${config.accent}`}
              >
                <Icon size={18} className="mt-0.5 shrink-0" />
                <p className="whitespace-pre-line text-sm font-medium leading-snug text-coal">{item.message}</p>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within a <ToastProvider>')
  return context.toast
}
