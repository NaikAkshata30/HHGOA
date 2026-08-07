import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 28 } },
}

export function FeatureCardGrid({ children, className = '' }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function FeatureCard({ icon: Icon, title, description, accent = 'accent', className = '' }) {
  const tone = {
    accent: 'forest',
    yellow: 'gold',
    pink: 'rose',
  }[accent]

  return (
    <motion.article
      variants={item}
      className={`group relative panel p-7 transition-all duration-300 hover:-translate-y-1 hover:border-forest/25 hover:shadow-panel ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-5 font-mono text-[10px] uppercase tracking-widest text-stone/70"
      >
        HH·GOA·26
      </span>
      <span
        className={`stamp size-11 rounded-full border-2 border-dashed ${
          tone === 'gold'
            ? 'border-gold/70 bg-gold/15 text-coal'
            : tone === 'rose'
              ? 'border-rose/40 bg-rose/10 text-rose'
              : 'border-forest/40 bg-forest/10 text-forest'
        }`}
      >
        <Icon size={18} />
      </span>
      <h3 className="mt-7 font-editorial text-xl font-bold tracking-tight text-coal">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-stone">{description}</p>
    </motion.article>
  )
}
