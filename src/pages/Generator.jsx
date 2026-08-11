import { useMemo, useRef, useState } from 'react'
import { Download, Frame, IdCard, ImageIcon, Loader2, Pencil, RotateCcw, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/common/Button.jsx'
import { Field, Input, Select } from '../components/common/Field.jsx'
import ShareButton from '../components/common/ShareButton.jsx'
import UploadArea from '../components/upload/UploadArea.jsx'
import FrameGenerator from '../components/frame/FrameGenerator.jsx'
import BuilderCard from '../components/builderCard/BuilderCard.jsx'
import useImageUpload from '../hooks/useImageUpload.js'
import { useToast } from '../components/toast/ToastProvider.jsx'
import { exportBuilderCard, exportFrame } from '../utils/exportImage.js'
import { BUILDER_TITLES, getBuilderPhrase } from '../data/builderTitles.js'
import { Birds, PalmLeaf, SunArc, WaveLines, WaveRule } from '../components/common/GoaDecor.jsx'

const EMPTY = { name: '', role: '', stack: '', tag: 'THE CURIOUS BUILDER', location: '', github: '' }
const FORMATS = [
  { id: 'frame', label: 'Profile Frame', note: 'Square · photo-centric', icon: Frame },
  { id: 'builder', label: 'Builder Pass', note: 'Portrait · editorial', icon: IdCard },
]

export default function Generator() {
  const { file, previewUrl, error: uploadError, handleDrop, removeImage } = useImageUpload()
  const [format, setFormat] = useState('builder')
  const [form, setForm] = useState(EMPTY)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [generated, setGenerated] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [errors, setErrors] = useState({})
  const frameRef = useRef(null)
  const builderRef = useRef(null)
  const toast = useToast()
  const title = form.tag
  const phrase = useMemo(() => getBuilderPhrase(form.role, form.stack), [form.role, form.stack])
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))
  const display = { name: form.name || 'Your Name', role: form.role || 'Your Role', stack: form.stack || 'Your Stack', location: form.location, title, phrase, imagePosition: position }

  function validate() {
    const next = {}
    if (!file) next.photo = 'Add a builder photo to continue.'
    if (!form.name.trim()) next.name = 'Enter the name to print on your identity.'
    if (!form.role.trim()) next.role = 'Tell us what you build.'
    if (!form.stack.trim()) next.stack = 'Add your core tools or technologies.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function generate(event) {
    event.preventDefault()
    if (!validate()) return toast.error('Complete the highlighted details first.')
    setGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 520))
    setGenerating(false)
    setGenerated(true)
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  }

  async function download() {
    if (exporting) return
    setExporting(true)
    try {
      if (format === 'frame') await exportFrame(frameRef.current, form.name)
      else await exportBuilderCard(builderRef.current, form.name)
      toast.success('Your HH Goa identity has been downloaded.')
    } catch { toast.error('We could not render the PNG. Please try again.') }
    finally { setExporting(false) }
  }

  function createAnother() {
    removeImage(); setForm(EMPTY); setPosition({ x: 50, y: 50 }); setErrors({}); setGenerated(false)
  }

  const preview = previewUrl ? format === 'frame'
    ? <FrameGenerator ref={frameRef} previewUrl={previewUrl} name={display.name} stack={`${display.role} · ${display.stack}`} title={title} imagePosition={position} />
    : <BuilderCard ref={builderRef} previewUrl={previewUrl} {...display} />
    : null

  if (generated) return (
    <div className="animate-fade-up">
      <section className="relative overflow-hidden bg-forest-deep text-cream"><SunArc size={280} className="absolute -right-20 -top-28 text-gold opacity-20" /><WaveLines size={420} className="absolute -left-10 bottom-4 text-sea opacity-15" /><div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"><p className="kicker text-gold">HH Goa Identity Studio · Ready</p><h1 className="mt-5 max-w-4xl text-[clamp(3rem,7vw,6rem)] font-black leading-[.9]">Your Goa identity is ready.</h1><p className="mt-6 max-w-xl text-lg text-cream/70">One builder. One season. One identity worth sharing.</p></div></section>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16"><div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]"><section className="rounded-[2rem] border border-sand bg-card p-3 shadow-panel sm:p-7">{preview}</section><aside className="rounded-[2rem] border border-sand bg-card p-6 lg:sticky lg:top-24"><p className="kicker text-rose">{format === 'frame' ? 'Profile Frame' : 'Builder Pass'}</p><h2 className="mt-4 text-3xl font-black">Built. Framed. Yours.</h2><p className="mt-3 text-sm leading-relaxed text-stone">Download the high-resolution PNG or open X with your caption ready.</p><div className="mt-7 grid gap-3"><Button size="lg" onClick={download} disabled={exporting}>{exporting ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}{exporting ? 'Rendering PNG…' : 'Download PNG'}</Button><ShareButton className="w-full" frameRef={format === 'frame' ? frameRef : null} builderRef={format === 'builder' ? builderRef : null} /><Button variant="ghost" onClick={() => setGenerated(false)}><Pencil size={17} />Edit identity</Button><Button variant="secondary" onClick={createAnother}><RotateCcw size={17} />Create another</Button></div><p className="mt-5 text-xs leading-relaxed text-stone">X cannot attach a locally generated image automatically. Attach the downloaded PNG before posting.</p></aside></div></main>
    </div>
  )

  return (
    <div className="animate-fade-up">
      <section className="relative overflow-hidden bg-forest-deep text-cream">
        <PalmLeaf size={230} className="absolute -left-16 top-24 text-gold opacity-10" /><PalmLeaf size={190} className="absolute -right-12 bottom-2 rotate-180 text-rose opacity-10" /><Birds size={90} className="absolute right-24 top-20 hidden text-cream opacity-20 lg:block" />
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
          <div className="grid gap-10 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
            <div>
              <h1 className="mt-6 text-[clamp(3.5rem,8vw,7rem)] font-black leading-[.84] tracking-tight">Frame your<br /><em className="italic text-gold">Goa story.</em></h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream/75">Upload your photo, tell us what you build, and get a share-ready HH Goa identity in seconds.</p>
              <a href="#studio" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-gold px-6 font-mono text-xs font-black uppercase tracking-[.14em] text-forest-deep transition-transform hover:-translate-y-0.5 focus-visible:outline-gold">Start building <span aria-hidden="true">↓</span></a>
            </div>
            <div className="relative mx-auto w-full max-w-xl lg:justify-self-end">
              <div className="absolute -inset-3 rotate-2 rounded-[1.8rem] border border-gold/35" />
              <div className="relative overflow-hidden rounded-[1.5rem] border border-cream/15 bg-forest p-3 shadow-float">
                <img src="/hh-goa-official.png" alt="Hacker House Goa — Goa, India, 28–31 October 2026" className="hero-logo-giggle block w-full rounded-xl" />
                <div className="mt-3 flex items-center justify-between px-2 pb-1 font-mono text-[9px] uppercase tracking-[.2em] text-cream/55"><span>Goa, India</span><span className="text-gold">Build · Ship · Belong</span><span>Season 01</span></div>
              </div>
              <span className="absolute -bottom-5 -left-4 grid size-16 rotate-[-8deg] place-items-center rounded-full border-2 border-forest-deep bg-rose text-center font-mono text-[8px] font-black uppercase leading-tight tracking-wider text-cream shadow-lg">Made<br />in Goa</span>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-cream/15 pt-5 font-mono text-[10px] uppercase tracking-[.2em] text-cream/55"><span>Upload</span><span className="text-rose">◆</span><span>Build</span><span className="text-rose">◆</span><span>Frame</span><span className="text-rose">◆</span><span>Share</span><span className="ml-auto hidden text-gold sm:inline">Goa, India · 28—31 Oct 2026</span></div>
        </div><WaveRule className="text-gold/25" />
      </section>

      <main id="studio" className="scroll-mt-20 bg-cream-soft/45"><form onSubmit={generate} className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
        <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="kicker text-forest">The Identity Studio</p><h2 className="mt-3 text-4xl font-black sm:text-5xl">Choose your frame.</h2></div><p className="max-w-sm text-sm leading-relaxed text-stone">One photo. Two distinct identities. Your preview updates as you type.</p></div>

        <div className="mb-5 grid grid-cols-2 overflow-hidden rounded-[1.4rem] border border-sand bg-card sm:grid-cols-4">
          {[['01', 'Upload', 'Choose your portrait'], ['02', 'Build', 'Add your identity'], ['03', 'Frame', 'Watch it update'], ['04', 'Share', 'Export your PNG']].map(([number, label, note], index) => (
            <div key={label} className={`relative px-4 py-4 sm:px-5 ${index > 0 ? 'sm:border-l sm:border-sand' : ''} ${index > 1 ? 'border-t border-sand sm:border-t-0' : index === 1 ? 'border-l border-sand sm:border-t-0' : ''}`}>
              <span className="font-mono text-[9px] font-bold tracking-[.2em] text-rose">{number}</span>
              <p className="mt-1 font-editorial text-lg font-black text-forest-deep">{label}</p>
              <p className="mt-0.5 text-xs text-stone">{note}</p>
            </div>
          ))}
        </div>

        <fieldset className="grid gap-3 sm:grid-cols-2" aria-label="Choose identity format"><legend className="sr-only">Identity format</legend>{FORMATS.map(({ id, label, note, icon: Icon }) => <button type="button" key={id} aria-pressed={format === id} onClick={() => setFormat(id)} className={`group flex items-center justify-between rounded-[1.5rem] border p-5 text-left transition-all ${format === id ? 'border-forest bg-forest text-cream shadow-forest' : 'border-sand bg-card text-coal hover:border-forest/50'}`}><span className="flex items-center gap-4"><span className={`grid size-11 place-items-center rounded-xl ${format === id ? 'bg-gold text-forest-deep' : 'bg-cream-soft text-forest'}`}><Icon size={21} /></span><span><span className="block font-editorial text-xl font-black">{label}</span><span className={`mt-1 block font-mono text-[9px] uppercase tracking-[.17em] ${format === id ? 'text-cream/60' : 'text-stone'}`}>{note}</span></span></span><span className={`size-3 rounded-full border-2 ${format === id ? 'border-gold bg-gold' : 'border-sand'}`} /></button>)}</fieldset>

        <div className="mt-7 grid items-start gap-7 lg:grid-cols-[minmax(350px,.8fr)_minmax(0,1.2fr)]">
          <section className="rounded-[2rem] border border-sand bg-card p-5 shadow-panel sm:p-7"><div><p className="kicker text-rose">01 · Portrait</p><h3 className="mt-2 text-2xl font-black">Drop your builder photo</h3></div><div className="mt-5"><UploadArea file={file} error={uploadError || errors.photo} handleDrop={handleDrop} removeImage={removeImage} /></div>{previewUrl && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-2xl border border-sand bg-cream-soft p-4"><div className="flex items-center gap-4"><img src={previewUrl} alt="Uploaded photo preview" className="size-16 rounded-xl object-cover ring-2 ring-gold" style={{ objectPosition: `${position.x}% ${position.y}%` }} /><div className="flex-1"><p className="text-sm font-semibold">Position the photo</p><label className="mt-2 block font-mono text-[9px] uppercase tracking-wider text-stone">Horizontal<input aria-label="Horizontal photo position" type="range" min="0" max="100" value={position.x} onChange={(e) => setPosition((p) => ({ ...p, x: +e.target.value }))} className="block w-full accent-forest" /></label><label className="block font-mono text-[9px] uppercase tracking-wider text-stone">Vertical<input aria-label="Vertical photo position" type="range" min="0" max="100" value={position.y} onChange={(e) => setPosition((p) => ({ ...p, y: +e.target.value }))} className="block w-full accent-forest" /></label></div></div></motion.div>}
            <div className="my-7 border-t border-sand" /><div><p className="kicker text-forest">02 · Identity</p><h3 className="mt-2 text-2xl font-black">What do you build?</h3></div><div className="mt-5 grid gap-5 sm:grid-cols-2"><Field label="Name *" htmlFor="name" error={errors.name}><Input id="name" maxLength={32} value={form.name} onChange={update('name')} /></Field><Field label="Role *" htmlFor="role" error={errors.role}><Input id="role" maxLength={30} value={form.role} onChange={update('role')} /></Field><div className="sm:col-span-2"><Field label="Stack *" htmlFor="stack" hint="Your key tools, separated by dots or commas." error={errors.stack}><Input id="stack" maxLength={64} value={form.stack} onChange={update('stack')} /></Field></div><div className="sm:col-span-2"><Field label="Builder tag" htmlFor="tag" hint="Choose the identity that feels most like you."><Select id="tag" value={form.tag} onChange={update('tag')}>{BUILDER_TITLES.map((item) => <option key={item.label} value={item.label}>{item.label} — {item.bestFor}</option>)}</Select></Field></div><Field label="Location" htmlFor="location" hint="Optional"><Input id="location" maxLength={28} value={form.location} onChange={update('location')} /></Field><Field label="GitHub" htmlFor="github" hint="Optional"><Input id="github" maxLength={60} value={form.github} onChange={update('github')} /></Field></div></section>

          <section className="rounded-[2rem] border border-sand bg-forest-deep p-3 shadow-float sm:p-6 lg:sticky lg:top-24"><div className="mb-4 flex items-center justify-between px-2"><div><p className="kicker text-gold">Live preview</p><p className="mt-1 text-sm text-cream/55">{format === 'frame' ? 'Profile Frame · 1080²' : 'Builder Pass · 1080 × 1350'}</p></div><span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-cream/50"><span className="size-2 rounded-full bg-emerald-400" />Live</span></div><AnimatePresence mode="wait"><motion.div key={format} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .2 }} className="rounded-[1.5rem] bg-cream/10 p-2 sm:p-4">{preview || <div className="flex aspect-[4/5] flex-col items-center justify-center rounded-[1.3rem] border border-dashed border-cream/20 bg-cream/5 px-8 text-center text-cream"><span className="grid size-16 place-items-center rounded-full bg-gold text-forest-deep"><ImageIcon size={27} /></span><h3 className="mt-6 text-2xl font-black">Your identity starts here.</h3><p className="mt-2 max-w-xs text-sm leading-relaxed text-cream/55">Upload a photo to reveal your live HH Goa preview.</p></div>}</motion.div></AnimatePresence></section>
        </div>
        <div className="mt-7 grid gap-3 rounded-[2rem] border border-sand bg-card p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6"><div><p className="font-editorial text-xl font-black">Ready to frame your story?</p><p className="mt-1 text-sm text-stone">No login. Nothing leaves your browser.</p></div><Button type="submit" size="lg" variant="inverted" className="min-h-14 px-8 uppercase tracking-wide" disabled={generating}>{generating ? <Loader2 size={19} className="animate-spin" /> : <Sparkles size={19} />}{generating ? 'Framing your Goa story…' : 'Generate my HH Goa card'}</Button></div>
      </form></main>

      <section className="border-t border-sand bg-card"><div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><div className="grid gap-8 md:grid-cols-3"><div><p className="kicker text-forest">Fast</p><h3 className="mt-3 text-2xl font-black">One pass.</h3><p className="mt-2 text-sm leading-relaxed text-stone">Upload, customize, preview, and export without a loading maze.</p></div><div><p className="kicker text-rose">Private</p><h3 className="mt-3 text-2xl font-black">On your device.</h3><p className="mt-2 text-sm leading-relaxed text-stone">Your photo is processed locally and never sent to a server.</p></div><div><p className="kicker text-deep-sea">Share-ready</p><h3 className="mt-3 text-2xl font-black">Real PNG.</h3><p className="mt-2 text-sm leading-relaxed text-stone">High-resolution output with sharp type, clean crops, and #FrameInGoa.</p></div></div></div></section>
    </div>
  )
}
