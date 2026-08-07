import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  BadgeCheck,
  Download,
  FileImage,
  IdCard,
  ImagePlus,
  Layers,
  Loader2,
  ShieldCheck,
  Users,
} from 'lucide-react'
import Stepper from '../components/common/Stepper.jsx'
import { Button } from '../components/common/Button.jsx'
import { Field, Input, Select } from '../components/common/Field.jsx'
import { FeatureCard, FeatureCardGrid } from '../components/common/FeatureCard.jsx'
import ShareButton from '../components/common/ShareButton.jsx'
import XIcon from '../components/common/XIcon.jsx'
import { SunArc, WaveLines } from '../components/common/GoaDecor.jsx'
import UploadArea from '../components/upload/UploadArea.jsx'
import FrameGenerator from '../components/frame/FrameGenerator.jsx'
import BuilderCard from '../components/builderCard/BuilderCard.jsx'
import useImageUpload from '../hooks/useImageUpload.js'
import { useToast } from '../components/toast/ToastProvider.jsx'
import { exportAll, exportBuilderCard, exportFrame } from '../utils/exportImage.js'
import { BUILDER_TITLES, DEFAULT_BUILDER_TITLE } from '../data/builderTitles.js'

const STEPS = [
  { id: 'upload', label: 'Upload' },
  { id: 'frame', label: 'Frame' },
  { id: 'card', label: 'Builder Card' },
  { id: 'export', label: 'Export' },
]

const FEATURES = [
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

export default function Generator() {
  const { file, previewUrl, error, handleDrop, removeImage } = useImageUpload()

  const [name, setName] = useState('')
  const [stack, setStack] = useState('')
  const [titleId, setTitleId] = useState(DEFAULT_BUILDER_TITLE.id)

  const frameRef = useRef(null)
  const builderRef = useRef(null)
  const [exporting, setExporting] = useState(null) // null | 'frame' | 'card' | 'all'
  const [exportError, setExportError] = useState('')
  const toast = useToast()

  const titleLabel = BUILDER_TITLES.find((item) => item.id === titleId)?.label ?? 'Builder'

  const canExport = Boolean(previewUrl)

  const currentStep = file ? 3 : 0

  // Success toast whenever a photo lands (initial upload or replacement).
  useEffect(() => {
    if (file) toast.success('Photo added — your previews are ready.')
  }, [file, toast])

  const runExport = useCallback(
    async (mode) => {
      if (!canExport || exporting !== null) return
      setExportError('')
      setExporting(mode)
      try {
        if (mode === 'frame') {
          await exportFrame(frameRef.current)
          toast.success('Profile frame downloaded.')
        } else if (mode === 'card') {
          await exportBuilderCard(builderRef.current)
          toast.success('Builder ID downloaded.')
        } else {
          const results = await exportAll({
            frameNode: frameRef.current,
            builderNode: builderRef.current,
          })
          results.forEach((result) => {
            if (typeof result === 'string') {
              toast.success(
                result === 'frame' ? 'Profile frame downloaded.' : 'Builder ID downloaded.',
              )
            }
          })
          const failed = results.filter((result) => result && result.error)
          if (failed.length) {
            const labels = failed.map((result) =>
              result.key === 'frame' ? 'Profile frame' : 'Builder card',
            )
            setExportError(`${labels.join(' and ')} failed to export. Please try again.`)
          }
        }
      } catch (error) {
        setExportError(error?.message || 'Export failed. Please try again.')
      } finally {
        setExporting(null)
      }
    },
    [canExport, exporting, toast],
  )

  return (
    <div className="animate-fade-up">
      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-foam/50"
        />
        <SunArc
          size={300}
          className="pointer-events-none absolute -right-24 -top-28 text-forest opacity-[0.06]"
        />
        <WaveLines
          size={320}
          className="pointer-events-none absolute -left-10 bottom-4 text-sea opacity-[0.25]"
        />
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 lg:px-8 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="kicker flex flex-wrap items-center gap-x-3 gap-y-1 text-forest">
              <span>Hacker House Goa</span>
              <span className="text-sand">/</span>
              <span className="text-stone">The Studio</span>
              <span className="text-sand">/</span>
              <span className="text-stone">Season 01</span>
            </p>
            <h1 className="mt-6 font-editorial text-[clamp(2.75rem,7vw,5.5rem)] font-black leading-[0.95] tracking-tight text-coal">
              Make your <em className="italic text-forest">builder pass.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone">
              Upload your photo, generate your official HH Goa profile frame and Builder ID. No
              login. No signup. Everything renders instantly.
            </p>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-stone">
              15.2993° N · 74.1240° E · Arabian Sea — rendered on your device
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-10"
          >
            <Stepper steps={STEPS} current={currentStep} />
          </motion.div>
        </div>
      </section>

      {/* ---- Work area ---- */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          {/* Left column: upload + details */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="mb-3 flex items-end justify-between">
                <h2 className="font-editorial text-xl font-bold text-coal">Your photo</h2>
                <span className="kicker text-stone">01 · Upload</span>
              </div>
              <UploadArea file={file} error={error} handleDrop={handleDrop} removeImage={removeImage} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="panel p-6 sm:p-7"
            >
              <div className="mb-6 flex items-end justify-between">
                <h2 className="font-editorial text-xl font-bold text-coal">Builder details</h2>
                <span className="kicker text-stone">02 · Identity</span>
              </div>
              <div className="space-y-5">
                <Field label="Name" htmlFor="name">
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Ada Lovelace"
                  />
                </Field>
                <Field label="Stack / Role" htmlFor="stack">
                  <Input
                    id="stack"
                    type="text"
                    value={stack}
                    onChange={(event) => setStack(event.target.value)}
                    placeholder="Full-stack · Solana"
                  />
                </Field>
                <Field label="Builder Title" htmlFor="title">
                  <Select id="title" value={titleId} onChange={(event) => setTitleId(event.target.value)}>
                    {BUILDER_TITLES.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-stone">
                Filled in by you. worn by the community.
              </p>
            </motion.div>
          </div>

          {/* Right column: live previews */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="panel p-5 sm:p-7">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-forest" />
                  </span>
                  <h2 className="font-editorial text-lg font-bold text-coal">Profile frame</h2>
                </div>
                <span className="kicker text-stone">Live · 1080²</span>
              </div>
              {previewUrl ? (
                <FrameGenerator
                  ref={frameRef}
                  previewUrl={previewUrl}
                  name={name.trim() || 'Your Name'}
                  stack={stack.trim() || 'Your stack'}
                  title={titleLabel}
                />
              ) : (
                <div className="flex h-64 flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-sand bg-cream-soft px-6 text-center">
                  <span className="grid size-12 place-items-center rounded-full border-2 border-dashed border-sand bg-card text-stone">
                    <ImagePlus size={22} />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-widest text-stone">
                    Upload a photo to preview your frame
                  </p>
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="panel p-5 sm:p-7">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-rose" />
                  </span>
                  <h2 className="font-editorial text-lg font-bold text-coal">Builder ID</h2>
                </div>
                <span className="kicker text-stone">Live · 1080×1350</span>
              </div>
              {previewUrl ? (
                <BuilderCard
                  ref={builderRef}
                  previewUrl={previewUrl}
                  name={name.trim() || 'Your Name'}
                  stack={stack.trim() || 'Your stack'}
                  title={titleLabel}
                />
              ) : (
                <div className="flex h-72 flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-sand bg-cream-soft px-6 text-center">
                  <span className="grid size-12 place-items-center rounded-full border-2 border-dashed border-sand bg-card text-stone">
                    <IdCard size={22} />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-widest text-stone">
                    Upload a photo to preview your Builder ID
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---- Export ---- */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="panel p-6 sm:p-10"
        >
          <div className="mb-2 flex items-end justify-between">
            <h2 className="font-editorial text-2xl font-bold text-coal">Export your assets</h2>
            <span className="kicker text-stone">04 · Export</span>
          </div>
          <p className="mb-7 max-w-2xl text-sm leading-relaxed text-stone">
            Download your profile frame and Builder ID as high-quality PNGs — gradients,
            shadows, rounded corners and typography preserved at full resolution.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            <Button
              variant="secondary"
              disabled={!canExport || exporting !== null}
              onClick={() => runExport('frame')}
            >
              {exporting === 'frame' ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <FileImage size={18} />
              )}
              {exporting === 'frame' ? 'Rendering…' : 'Download Frame'}
            </Button>
            <Button
              variant="secondary"
              disabled={!canExport || exporting !== null}
              onClick={() => runExport('card')}
            >
              {exporting === 'card' ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <BadgeCheck size={18} />
              )}
              {exporting === 'card' ? 'Rendering…' : 'Download Builder Card'}
            </Button>
            <Button
              variant="primary"
              disabled={!canExport || exporting !== null}
              onClick={() => runExport('all')}
            >
              {exporting === 'all' ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Layers size={18} />
              )}
              {exporting === 'all' ? 'Rendering both…' : 'Download Both'}
            </Button>
          </div>

          <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-stone">
            Profile frame 1080×1080 · Builder ID 1080×1350 · PNG
          </p>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-sand pt-7 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-editorial text-lg font-bold text-coal">Share to X</h3>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-stone">
                Share your Builder ID and Profile Frame together — on phones the native
                share sheet carries both images plus a prefilled tweet.
              </p>
            </div>
            <ShareButton
              className="w-full sm:w-auto"
              frameRef={frameRef}
              builderRef={builderRef}
              disabled={!canExport}
            />
          </div>

          {exportError && (
            <p className="mt-5 flex items-center gap-2 rounded-2xl border border-rose/40 bg-rose/10 px-4 py-3 text-sm font-medium text-rose">
              <AlertTriangle size={16} />
              {exportError}
            </p>
          )}
        </motion.div>
      </section>

      {/* ---- Feature cards ---- */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <FeatureCardGrid>
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </FeatureCardGrid>
      </section>
    </div>
  )
}
