import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import {
  Boxes,
  BrainCircuit,
  Bug,
  Check,
  ExternalLink,
  Radar,
  Sparkles,
  Star,
  X,
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import { getLenis } from '../lib/scroll'
import { projects } from '../data/profile'

const COVER_ICONS = [Radar, Bug, Boxes, BrainCircuit]

const MOTIFS = [
  {
    backgroundImage:
      'linear-gradient(rgba(255,255,255,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.13) 1px, transparent 1px)',
    backgroundSize: '26px 26px',
  },
  {
    backgroundImage: 'radial-gradient(rgba(255,255,255,0.22) 1.2px, transparent 1.6px)',
    backgroundSize: '18px 18px',
  },
  {
    backgroundImage:
      'repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0 10px, transparent 10px 20px)',
  },
  {
    backgroundImage:
      'radial-gradient(circle at 24% 30%, rgba(255,255,255,0.28) 0 42px, transparent 44px), radial-gradient(circle at 78% 68%, rgba(255,255,255,0.16) 0 30px, transparent 32px)',
  },
]

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const lenis = getLenis()
    lenis?.stop()
    return () => {
      window.removeEventListener('keydown', onKey)
      lenis?.start()
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-ink-900 p-8 shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 rounded-lg border border-white/10 p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <X size={18} />
        </button>

        <span
          className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${project.accent} bg-clip-text text-sm font-semibold text-transparent`}
        >
          {project.tagline}
        </span>
        <h3 className="font-display mt-3 text-2xl font-bold text-white">{project.title}</h3>
        <p className="mt-3 leading-relaxed text-slate-400">{project.description}</p>

        <div className="mt-6">
          <h4 className="font-mono text-xs tracking-[0.2em] text-glow-400 uppercase">
            What I built
          </h4>
          <ul className="mt-3 space-y-2.5">
            {project.bullets.map((b) => (
              <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
                <Check size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h4 className="font-mono text-xs tracking-[0.2em] text-glow-400 uppercase">Tech stack</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {project.impact.map((imp) => (
            <div
              key={imp}
              className="rounded-xl border border-white/5 bg-white/5 p-3 text-center text-xs font-medium text-slate-300"
            >
              {imp}
            </div>
          ))}
        </div>

        {project.links.length ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-500 to-glow-500 px-4 py-2 text-sm font-semibold text-white"
              >
                {l.label}
                <ExternalLink size={14} />
              </a>
            ))}
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project, index, onOpen }) {
  const ref = useRef(null)
  const featured = Boolean(project.featured)
  const CoverIcon = COVER_ICONS[index % COVER_ICONS.length]

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 200, damping: 22 })
  const rotateY = useSpring(ry, { stiffness: 200, damping: 22 })

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    ry.set((px - 0.5) * 8)
    rx.set((0.5 - py) * 8)
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
  }

  const onMouseLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{ duration: 0.55, delay: featured ? 0 : (index % 2) * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`glass glow-border group relative flex flex-col rounded-3xl p-7 md:rounded-[2rem] ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="tilt-sheen" />

      <div className={featured ? 'grid gap-8 lg:grid-cols-[1.6fr_1fr]' : ''}>
        <div>
          <div className="relative mb-6 h-40 overflow-hidden rounded-2xl">
            <div className={`absolute inset-0 bg-gradient-to-br ${project.accent}`} />
            <div className="absolute inset-0" style={MOTIFS[index % MOTIFS.length]} />
            <div className="absolute -top-10 -right-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-8 -left-6 h-28 w-28 rounded-full bg-black/25 blur-2xl" />
            <div className="absolute inset-0 flex items-center justify-center text-white/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
              <CoverIcon size={56} strokeWidth={1.2} />
            </div>
            <span className="absolute right-4 bottom-3 font-mono text-[10px] tracking-[0.25em] text-white/70">
              {String(index + 1).padStart(2, '0')}.cover
            </span>
            <div className="cover-shine absolute inset-0" />
          </div>

          <div className="flex items-center justify-between gap-4">
            <h3 className="font-display text-xl font-semibold text-white">{project.title}</h3>
            {featured ? (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
                <Star size={12} className="fill-amber-300" />
                Featured
              </span>
            ) : null}
          </div>
          <p className="mt-1.5 text-sm text-slate-400">{project.tagline}</p>

          <p
            className={`mt-4 flex-1 text-sm leading-relaxed text-slate-400 ${
              featured ? '' : 'line-clamp-3'
            }`}
          >
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.slice(0, featured ? 6 : 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-300"
              >
                {t}
              </span>
            ))}
            {project.tech.length > (featured ? 6 : 4) ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-500">
                +{project.tech.length - (featured ? 6 : 4)} more
              </span>
            ) : null}
          </div>

          <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
            <button
              onClick={() => onOpen(project)}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-500 to-glow-500 px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95"
            >
              Case Study
            </button>
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-white/5"
              >
                {l.label}
                <ExternalLink size={13} />
              </a>
            ))}
          </div>
        </div>

        {featured ? (
          <div className="flex flex-col justify-center gap-3 border-t border-white/10 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <p className="font-mono text-[11px] tracking-[0.2em] text-glow-400 uppercase">
              Impact
            </p>
            {project.impact.map((imp) => (
              <div
                key={imp}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-4 text-sm text-slate-300"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/25 to-glow-500/25 text-glow-400">
                  <Sparkles size={14} />
                </span>
                {imp}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [active, setActive] = useState(null)

  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="03 // Projects"
          title="Things I've built"
          description="Real projects with real impact — full-stack apps, AI systems, and published research."
        />

        <div className="grid gap-8 md:grid-cols-2" style={{ perspective: 1200 }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} onOpen={setActive} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active ? <ProjectModal project={active} onClose={() => setActive(null)} /> : null}
      </AnimatePresence>
    </section>
  )
}