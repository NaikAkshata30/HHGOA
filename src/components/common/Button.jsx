import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Hoisted so react-router's Link is wrapped once, not on every render.
const MotionLink = motion.create(Link)

const VARIANTS = {
  primary: 'bg-forest text-cream shadow-forest hover:bg-forest-deep hover:shadow-ocean',
  secondary: 'border border-forest/35 bg-transparent text-forest hover:border-forest/70 hover:bg-forest/5',
  danger: 'border border-rose/40 bg-rose/5 text-rose hover:bg-rose/10',
  ghost: 'border border-sand bg-transparent text-coal hover:border-forest/40 hover:bg-card hover:text-forest',
  inverted: 'bg-gold text-coal shadow-gold hover:bg-gold/90 hover:shadow-float',
}

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50'

function motionProps() {
  return {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    whileHover: { y: -2 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 420, damping: 26 },
  }
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...rest }) {
  return (
    <motion.button
      {...motionProps()}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

export function ButtonLink({
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`

  if (to) {
    return (
      <MotionLink {...motionProps()} to={to} className={classes} {...rest}>
        {children}
      </MotionLink>
    )
  }

  return (
    <motion.a {...motionProps()} href={href} className={classes} {...rest}>
      {children}
    </motion.a>
  )
}
