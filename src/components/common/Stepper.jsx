import { motion } from 'framer-motion'
import { Check, Lock } from 'lucide-react'

/**
 * Presentational progress stepper.
 * Props:
 *  - steps: array of { id, label }
 *  - current: index (0-based) of the active step
 *  - lockedFrom: first index rendered as locked (future/not-yet-implemented)
 */
export default function Stepper({ steps, current, lockedFrom }) {
  return (
    <ol className="flex w-full items-center gap-2 sm:gap-3">
      {steps.map((step, index) => {
        const done = index < current
        const active = index === current
        const locked = lockedFrom !== undefined && index >= lockedFrom

        return (
          <li key={step.id} className="flex flex-1 items-center gap-2 last:flex-none sm:gap-3">
            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              aria-current={active ? 'step' : undefined}
              className={`flex items-center gap-2.5 rounded-full border px-3 py-1.5 sm:px-4 ${
                active
                  ? 'border-forest bg-forest text-cream shadow-forest'
                  : done
                    ? 'border-gold/70 bg-gold/15 text-coal'
                    : 'border-sand bg-card text-stone'
              }`}
            >
              <span
                className={`grid size-6 shrink-0 place-items-center rounded-full font-mono text-xs font-bold ${
                  done
                    ? 'bg-gold text-coal'
                    : active
                      ? 'bg-cream text-forest'
                      : 'bg-sand text-stone'
                }`}
              >
                {done ? <Check size={13} strokeWidth={3} /> : locked ? <Lock size={12} /> : index + 1}
              </span>
              <span className="whitespace-nowrap text-xs font-semibold sm:text-sm">{step.label}</span>
            </motion.div>

            {index < steps.length - 1 && (
              <span
                className={`h-px flex-1 rounded-full border-t border-dashed ${
                  index < current ? 'border-forest/50' : 'border-sand'
                }`}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}
