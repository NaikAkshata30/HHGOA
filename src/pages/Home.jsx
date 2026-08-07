import { motion } from 'framer-motion'
import {
  ArrowRight,
  Upload,
  ImagePlus,
  IdCard,
  Download,
  ShieldCheck,
  Users,
  Flame,
} from 'lucide-react'
import { ButtonLink } from '../components/common/Button.jsx'
import { FeatureCard, FeatureCardGrid } from '../components/common/FeatureCard.jsx'
import {
  SunArc,
  WaveLines,
  WaveDivider,
  WaveRule,
  Stamp,
  Marquee,
  Boat,
  Birds,
  PalmLeaf,
  Reflections,
  Coastline,
} from '../components/common/GoaDecor.jsx'
import XIcon from '../components/common/XIcon.jsx'

const STEPS = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload',
    text: 'Drop a JPG, PNG or WEBP photo up to 10 MB. No account needed.',
  },
  {
    icon: ImagePlus,
    step: '02',
    title: 'Frame',
    text: 'Get the official HH Goa profile frame with editorial styling.',
  },
  {
    icon: IdCard,
    step: '03',
    title: 'Builder Card',
    text: 'Your event pass with name, stack, title and a Builder ID number.',
  },
  {
    icon: Download,
    step: '04',
    title: 'Export',
    text: 'Full-resolution PNG exports, ready for any screen.',
  },
]

const TIMELINE = [
  {
    date: 'Applications',
    title: 'Open Trial',
    text: 'The Hacker House Goa 2026 season kicks off with the open trial.',
  },
  {
    date: 'Build',
    title: 'Builder Week',
    text: 'Ship, demo and meet the community across Goa.',
  },
  {
    date: 'Season',
    title: 'The Frames Drop',
    text: 'Official identity rolls out for every accepted builder.',
  },
]

const FAQS = [
  {
    q: 'Do I need an account?',
    a: 'No. The generator is fully client-side — upload, frame and download without any signup.',
  },
  {
    q: 'What file formats are supported?',
    a: 'JPG, PNG and WEBP, up to 10 MB. Portrait, landscape and square all work.',
  },
  {
    q: 'Is my photo uploaded to a server?',
    a: 'No. Everything is processed locally in your browser and never leaves your device.',
  },
  {
    q: 'How do I share on X?',
    a: 'Export your frame, then post it with #FrameInGoa — one tap away in the generator.',
  },
]

const featureItems = [
  {
    icon: ShieldCheck,
    accent: 'accent',
    title: 'Official identity',
    description: 'A single visual identity for Hacker House Goa 2026 builders.',
  },
  {
    icon: XIcon,
    accent: 'yellow',
    title: 'Ready for X',
    description: 'Framed exactly to share with #FrameInGoa in one tap.',
  },
  {
    icon: Download,
    accent: 'pink',
    title: 'HD export',
    description: 'Crisp, full-resolution PNG exports built for any screen.',
  },
  {
    icon: Users,
    accent: 'accent',
    title: 'Community',
    description: 'One badge, one season — the whole builder community in frame.',
  },
]

const STATS = [
  ['01', 'Profile frame'],
  ['02', 'Builder ID'],
  ['0', 'Logins required'],
  ['1080²', 'Export size'],
]

const STAGE_NAMES = ['One', 'Two', 'Three']

function SectionHead({ number, kicker, title, note }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="kicker text-stone">
          <span className="text-forest">{number}</span>
          <span className="mx-2 text-sand">/</span>
          <span>{kicker}</span>
        </p>
        <h2 className="mt-4 font-editorial text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[0.98] tracking-tight text-coal">
          {title}
        </h2>
      </div>
      {note && (
        <p className="max-w-xs font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-stone">
          {note}
        </p>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <div className="animate-fade-up">
      {/* ============ Hero ============ */}
      <section id="top" className="relative scroll-mt-24 overflow-hidden">
        {/* soft ocean gradient near the bottom */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-foam/50"
        />
        {/* faded coastline contour in the hero corner */}
        <Coastline
          size={380}
          className="pointer-events-none absolute bottom-16 left-0 hidden text-deep-sea opacity-[0.06] lg:block"
        />
        <PalmLeaf
          size={150}
          className="pointer-events-none absolute bottom-10 left-10 hidden text-forest opacity-[0.08] lg:block"
        />

        <div className="mx-auto max-w-6xl px-4 pb-12 pt-14 sm:px-6 lg:px-8 lg:pt-20">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
            <div className="relative lg:col-span-7">
              {/* very subtle sun glow behind the headline */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-16 -top-12 h-96 w-[34rem] max-w-full rounded-full bg-[radial-gradient(closest-side,rgb(255_212_59_/_0.22),rgb(255_122_26_/_0.07),transparent)] blur-2xl"
              />
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="relative"
              >
                <p className="kicker flex flex-wrap items-center gap-x-3 gap-y-1 text-forest">
                  <span>Hacker House Goa</span>
                  <span className="text-sand">/</span>
                  <span className="text-stone">Season 01</span>
                  <span className="text-sand">/</span>
                  <span className="text-stone">Est. 2026</span>
                </p>
                <h1 className="mt-7 font-editorial text-[clamp(3rem,9vw,7.5rem)] font-black leading-[0.92] tracking-tight text-coal">
                  Build your <em className="italic text-forest">builder</em> identity
                </h1>

                {/* editorial rule */}
                <div className="mt-8 flex items-center gap-3">
                  <span className="h-px w-14 bg-ocean/50" aria-hidden="true" />
                  <span className="size-1.5 rounded-full bg-ocean/60" aria-hidden="true" />
                  <span className="h-px flex-1 bg-sand" aria-hidden="true" />
                </div>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone">
                  Upload one photo and carry the official Hacker House Goa 2026 profile frame and
                  Builder ID across the entire season.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink to="/generator" size="lg">
                    Start building
                    <ArrowRight size={18} />
                  </ButtonLink>
                  <ButtonLink href="#how" variant="ghost" size="lg">
                    How it works
                  </ButtonLink>
                </div>
                <p className="mt-6 font-hand text-2xl text-tang">
                  no logins. no signups. just your frame.
                </p>
              </motion.div>
            </div>

            {/* Decorative Builder pass */}
            <motion.div
              className="relative lg:col-span-5"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <div className="relative mx-auto w-full max-w-sm">
                <SunArc
                  size={140}
                  className="pointer-events-none absolute -top-12 right-0 text-gold opacity-90"
                />
                <Birds
                  size={72}
                  className="pointer-events-none absolute -top-6 left-2 text-deep-sea opacity-60"
                />
                <div className="absolute -inset-4 rounded-[2.5rem] border border-sand bg-cream-soft" aria-hidden="true" />
                <div className="relative rotate-2 rounded-[2rem] border border-sand bg-card p-7 shadow-panel transition-transform duration-300 hover:rotate-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="kicker text-forest">HH·GOA / 2026</p>
                    <Stamp tone="gold">Official</Stamp>
                  </div>
                  <div className="mt-6 grid aspect-square place-items-center overflow-hidden rounded-[1.5rem] gradient-green text-brand-500 shadow-forest">
                    <div className="relative grid place-items-center">
                      <SunArc size={150} className="pointer-events-none absolute opacity-25 text-brand-400" />
                      <Flame size={72} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-stone">
                    <span>15.2993° N · 74.1240° E</span>
                    <span>Builder · 001</span>
                  </div>
                  <div className="mt-5 border-t-2 border-dashed border-sand pt-4">
                    <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-stone">
                      Build · Ship · Belong
                    </p>
                  </div>
                </div>
              </div>
              {/* boat sailing into the frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 right-2 flex flex-col items-end gap-1 text-deep-sea/70"
              >
                <Boat size={58} className="text-deep-sea/80" />
                <Reflections size={80} className="text-sea/70" />
              </div>
            </motion.div>
          </div>

          <div className="mt-20">
            <WaveRule className="text-ocean/40" />
            <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-stone">
              <span className="inline-flex items-center gap-2">
                <WaveLines size={40} className="text-sea/70" />
                Vol. 01
              </span>
              <span className="hidden text-deep-sea sm:inline">Goa Coast · Arabian Sea</span>
              <span>Monsoon Edition</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Marquee ============ */}
      <Marquee
        items={[
          'Build',
          'Ship',
          'Belong',
          'Hacker House Goa 2026',
          'Goa Coast',
          'Arabian Sea',
          'Since 2026',
          '#FrameInGoa',
        ]}
      />

      {/* ============ The Pass ============ */}
      <section id="how" className="relative scroll-mt-24 overflow-hidden bg-cream-soft">
        <div
          aria-hidden="true"
          className="dots-paper pointer-events-none absolute inset-0 opacity-40"
        />
        <Coastline
          size={520}
          className="pointer-events-none absolute -right-24 bottom-0 hidden text-deep-sea opacity-[0.05] lg:block"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionHead
            number="01"
            kicker="The pass"
            title={
              <>
                Four steps. <em className="italic text-forest">Zero friction.</em>
              </>
            }
            note="Everything runs in your browser · nothing leaves your device · Goa Coast, no servers."
          />
          <div className="mt-12 divide-y divide-sand border-y border-sand">
            {STEPS.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.05 }}
                className="grid items-center gap-4 py-8 transition-colors hover:bg-card/60 sm:grid-cols-12"
              >
                <div className="sm:col-span-2">
                  <p className="font-editorial text-5xl font-black leading-none text-forest/70 sm:text-6xl">
                    {item.step}
                  </p>
                </div>
                <div className="sm:col-span-8">
                  <h3 className="font-editorial text-2xl font-bold tracking-tight text-coal">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-stone">{item.text}</p>
                </div>
                <div className="sm:col-span-2 sm:text-right">
                  <span className="stamp size-12 rounded-full border-2 border-dashed border-forest/30 bg-card text-forest">
                    <item.icon size={19} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Why it matters (forest band) ============ */}
      <section id="features" className="relative scroll-mt-24 overflow-hidden bg-forest-deep">
        <div
          aria-hidden="true"
          className="pattern-dots pointer-events-none absolute inset-0 opacity-[0.07]"
        />
        <SunArc
          size={280}
          className="pointer-events-none absolute -right-16 -top-20 text-gold opacity-20"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="kicker text-gold">02 · Why it matters</p>
              <h2 className="mt-4 max-w-2xl font-editorial text-4xl font-black leading-[0.98] tracking-tight text-cream sm:text-5xl">
                Built like the <em className="italic text-gold">real thing.</em>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-cream/70">
              Four reasons the season&rsquo;s identity is worth the one minute it takes to make.
            </p>
          </div>
          <div className="mt-12">
            <FeatureCardGrid>
              {featureItems.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </FeatureCardGrid>
          </div>
        </div>
        <WaveDivider className="text-cream" />
      </section>

      {/* ============ Season program ============ */}
      <section
        id="timeline"
        className="relative scroll-mt-24 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <Birds
          size={76}
          className="pointer-events-none absolute right-10 top-16 hidden text-deep-sea/40 lg:block"
        />
        <SectionHead
          number="03"
          kicker="Season program"
          title={
            <>
              The 2026 <em className="italic text-forest">season.</em>
            </>
          }
          note="Three chapters. One badge."
        />
        <div className="mt-12">
          <WaveRule className="mb-8 text-ocean/40" />
          {TIMELINE.map((item, index) => (
            <motion.div
              key={item.date}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.06 }}
              className="group grid items-baseline gap-3 border-b border-sand py-8 transition-colors hover:bg-card/50 sm:grid-cols-12"
            >
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-forest sm:col-span-2">
                Stage {STAGE_NAMES[index]}
              </div>
              <div className="font-mono text-sm font-semibold text-stone sm:col-span-3">
                {item.date}
              </div>
              <div className="sm:col-span-4">
                <h3 className="font-editorial text-2xl font-bold tracking-tight text-coal transition-colors group-hover:text-forest">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-stone sm:col-span-3">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ About ============ */}
      <section id="about" className="relative scroll-mt-24 overflow-hidden bg-cream-soft">
        {/* soft blue watercolor wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgb(221_245_255_/_0.55),transparent)] blur-3xl"
        />
        <Coastline
          size={460}
          className="pointer-events-none absolute bottom-0 left-0 hidden text-deep-sea opacity-[0.05] lg:block"
        />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-28">
          <div className="lg:col-span-7">
            <p className="kicker text-forest">04 · About</p>
            <h2 className="mt-4 font-editorial text-4xl font-black leading-[0.98] tracking-tight text-coal sm:text-5xl">
              One frame. <em className="italic text-forest">One season.</em>
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-stone">
              FrameInGoa is the official identity builder for Hacker House Goa 2026. It takes a
              single photo and turns it into the profile frame and Builder ID you will carry across
              the season — designed like an event pass, rendered in your browser, private by
              default.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-stone">
              One badge, one community — everyone who builds in Goa wears the same frame.
            </p>
            <p className="mt-7 font-hand text-2xl text-tang">
              made for the beach. built on the web.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-deep-sea">
              <WaveLines size={40} className="text-sea/70" />
              Arabian Sea · 15.2993° N
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(([num, label], index) => (
                <div
                  key={label}
                  className={`panel p-6 transition-transform duration-300 hover:-translate-y-1 ${
                    index % 2 === 1 ? 'translate-y-4' : ''
                  }`}
                >
                  <p className="font-editorial text-4xl font-black text-forest">{num}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-stone">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section
        id="faq"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <SectionHead
          number="05"
          kicker="Field notes"
          title={
            <>
              Common <em className="italic text-forest">questions.</em>
            </>
          }
          note="Straight answers, no fine print."
        />
        <div className="mt-12">
          <WaveRule className="mb-8 text-ocean/40" />
          <div className="divide-y divide-sand">
          {FAQS.map((item, index) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.05 }}
              className="grid gap-3 py-8 sm:grid-cols-12"
            >
              <div className="font-mono text-sm font-bold text-forest sm:col-span-1">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="font-editorial text-2xl font-bold tracking-tight text-coal sm:col-span-5">
                {item.q}
              </h3>
              <p className="text-sm leading-relaxed text-stone sm:col-span-6 sm:col-start-7">
                {item.a}
              </p>
            </motion.div>
          ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-4 sm:px-6 lg:px-8">
        <div className="gradient-forest relative overflow-hidden rounded-[2.5rem] p-10 sm:p-16">
          <div
            aria-hidden="true"
            className="pattern-dots pointer-events-none absolute inset-0 opacity-10"
          />
          <SunArc
            size={230}
            className="pointer-events-none absolute -right-12 -top-14 text-gold opacity-30"
          />
          <WaveLines
            size={220}
            className="pointer-events-none absolute -bottom-2 left-6 text-gold/30"
          />
          <div className="relative">
            <p className="kicker text-gold">#FrameInGoa</p>
            <h2 className="mt-4 max-w-2xl font-editorial text-4xl font-black leading-[0.98] tracking-tight text-cream sm:text-6xl">
              Your frame is <em className="italic text-gold">one photo</em> away.
            </h2>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink to="/generator" variant="inverted" size="lg">
                Open the studio
                <ArrowRight size={18} />
              </ButtonLink>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream/70">
                No login · No signup · 1 minute
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
