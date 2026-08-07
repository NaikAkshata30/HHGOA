import { motion } from 'framer-motion'
import { ButtonLink } from '../components/common/Button.jsx'
import Container from '../components/common/Container.jsx'
import { CompassRose, WaveLines } from '../components/common/GoaDecor.jsx'

export default function NotFound() {
  return (
    <Container className="relative flex min-h-[65dvh] flex-col items-center justify-center overflow-hidden py-20 text-center">
      <WaveLines size={260} className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-sand" />
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex flex-col items-center"
      >
        <CompassRose size={72} className="text-forest/60" />
        <p className="mt-8 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-forest">
          Error 404 · Lost at sea
        </p>
        <h1 className="mt-3 font-editorial text-5xl font-black tracking-tight text-coal sm:text-6xl">
          Off the sandbar
        </h1>
        <p className="mt-4 max-w-md text-stone">
          This page drifted out of the map. Head back to shore — the frame is still waiting.
        </p>
        <ButtonLink to="/" className="mt-9">
          Back to shore
        </ButtonLink>
      </motion.div>
    </Container>
  )
}
