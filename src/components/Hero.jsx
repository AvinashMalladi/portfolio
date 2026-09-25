import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Download, Mail, MapPin, MessageSquare } from 'lucide-react'
import Magnetic from './Magnetic'
import ParticleField from './ParticleField'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { profile } from '../data/profile'

function useTypewriter(words, typeSpeed = 70, deleteSpeed = 35, pause = 1600) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = word.slice(0, text.length + 1)
          setText(next)
          if (next === word) setTimeout(() => setDeleting(true), pause)
        } else {
          const next = word.slice(0, text.length - 1)
          setText(next)
          if (next === '') {
            setDeleting(false)
            setIndex((i) => (i + 1) % words.length)
          }
        }
      },
      deleting ? deleteSpeed : typeSpeed,
    )
    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause])

  return text
}

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-40px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setN(v),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref}>
      {n % 1 === 0 ? Math.round(n) : n.toFixed(1)}
      {suffix}
    </span>
  )
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.5 } },
}

const line = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

const CODE_LINES = [
  { key: 'c1', node: <><span className="text-fuchsia-400"># software engineer</span></> },
  {
    key: 'c2',
    node: (
      <>
        <span className="text-brand-400">class</span>{' '}
        <span className="text-emerald-400">AvinashMalladi</span>
        <span className="text-slate-300">:</span>
      </>
    ),
  },
  {
    key: 'c3',
    node: (
      <>
        <span className="text-slate-400">    stack </span>
        <span className="text-slate-500">=</span>{' '}
        <span className="text-glow-400">[</span>
        <span className="text-amber-300">"Python"</span>
        <span className="text-slate-400">, </span>
        <span className="text-amber-300">"JavaScript"</span>
        <span className="text-glow-400">]</span>
      </>
    ),
  },
  {
    key: 'c4',
    node: (
      <>
        <span className="text-slate-400">    backend </span>
        <span className="text-slate-500">=</span>{' '}
        <span className="text-glow-400">[</span>
        <span className="text-amber-300">"Flask"</span>
        <span className="text-slate-400">, </span>
        <span className="text-amber-300">"Node"</span>
        <span className="text-slate-400">, </span>
        <span className="text-amber-300">"REST"</span>
        <span className="text-glow-400">]</span>
      </>
    ),
  },
  {
    key: 'c5',
    node: (
      <>
        <span className="text-slate-400">    ai </span>
        <span className="text-slate-500">=</span>{' '}
        <span className="text-glow-400">[</span>
        <span className="text-amber-300">"RAG"</span>
        <span className="text-slate-400">, </span>
        <span className="text-amber-300">"Agents"</span>
        <span className="text-slate-400">, </span>
        <span className="text-amber-300">"XGBoost"</span>
        <span className="text-glow-400">]</span>
      </>
    ),
  },
  {
    key: 'c6',
    node: (
      <>
        <span className="text-slate-400">    cloud </span>
        <span className="text-slate-500">=</span>{' '}
        <span className="text-glow-400">[</span>
        <span className="text-amber-300">"AWS"</span>
        <span className="text-slate-400">, </span>
        <span className="text-amber-300">"Docker"</span>
        <span className="text-slate-400">, </span>
        <span className="text-amber-300">"CI/CD"</span>
        <span className="text-glow-400">]</span>
      </>
    ),
  },
  {
    key: 'c7',
    className: 'mt-2',
    node: (
      <>
        <span className="text-brand-400">def</span>{' '}
        <span className="text-glow-400">build</span>
        <span className="text-slate-300">(</span>
        <span className="text-amber-300">idea</span>
        <span className="text-slate-300">)</span>
        <span className="text-slate-500">:</span>
      </>
    ),
  },
  {
    key: 'c8',
    node: (
      <>
        <span className="text-slate-400">    return</span>{' '}
        <span className="text-glow-400">reliable</span>
        <span className="text-slate-400">, </span>
        <span className="text-glow-400">scalable</span>{' '}
        <span className="text-fuchsia-400">software</span>
        <span className="cursor-blink text-glow-400">▍</span>
      </>
    ),
  },
]

export default function Hero() {
  const typed = useTypewriter(profile.roles)
  const { scrollY } = useScroll()
  const cardY = useTransform(scrollY, [0, 800], [0, 70])
  const glowOpacity = useTransform(scrollY, [0, 500], [1, 0.4])

  return (
    <section id="home" className="relative flex min-h-screen flex-col items-center justify-center pt-24 pb-16">
      <ParticleField className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_70%_70%_at_50%_45%,black_30%,transparent_75%)]" />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to Software Engineering roles
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display mt-6 text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono mt-4 flex justify-center text-xl text-slate-300 sm:text-2xl lg:justify-start"
          >
            <span className="mr-2 text-brand-400">$</span>
            <span>{typed}</span>
            <span className="cursor-blink text-glow-400">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl text-base text-slate-400 sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-glow-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-transform hover:scale-[1.04] active:scale-95"
              >
                View Projects
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href={profile.resume}
                download
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Download size={16} />
                Download Resume
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <MessageSquare size={16} />
                Contact
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex items-center justify-center gap-3 lg:justify-start"
          >
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-xl border border-white/10 bg-white/5 p-3 text-slate-300 transition-all hover:-translate-y-1 hover:border-brand-400 hover:text-white"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-xl border border-white/10 bg-white/5 p-3 text-slate-300 transition-all hover:-translate-y-1 hover:border-brand-400 hover:text-white"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={profile.emailHref}
              aria-label="Email"
              className="rounded-xl border border-white/10 bg-white/5 p-3 text-slate-300 transition-all hover:-translate-y-1 hover:border-brand-400 hover:text-white"
            >
              <Mail size={18} />
            </a>
            <span className="ml-1 inline-flex items-center gap-1.5 font-mono text-xs text-slate-500">
              <MapPin size={13} />
              {profile.location}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto w-full max-w-md"
        >
          <motion.div style={{ y: cardY, opacity: glowOpacity }}>
            <div className="pointer-events-none absolute inset-[-3.5rem] hidden sm:block">
              <div className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-brand-400/15" />
              <div className="absolute inset-7 rounded-full border border-white/5" />
              <div className="animate-spin-slow absolute inset-0">
                <span className="absolute top-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-400 to-glow-400 shadow-[0_0_14px_rgba(34,211,238,0.8)]" />
              </div>
            </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glow-border animate-float relative rounded-2xl bg-ink-900/80 shadow-2xl shadow-black/40"
          >
            <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-rose-500" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="ml-3 font-mono text-xs text-slate-500">avinash_dev.py</span>
              <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-slate-600">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                running
              </span>
            </div>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-1.5 p-5 font-mono text-[13px] leading-relaxed"
            >
              {CODE_LINES.map((c) => (
                <motion.p key={c.key} variants={line} className={c.className ?? ''}>
                  {c.node}
                </motion.p>
))}
                </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="glass absolute -top-5 -right-4 hidden rounded-xl px-4 py-2.5 text-sm sm:block"
          >
            <span className="font-mono text-[11px] text-slate-400">ieee</span>
            <p className="font-semibold text-emerald-300">ICICCS 2026</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-6 hidden flex-col items-center gap-2 sm:flex"
      >
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1.5 rounded-full bg-glow-400"
          />
        </span>
        <span className="font-mono text-[10px] tracking-[0.35em] text-slate-500 uppercase">
          scroll
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-2 gap-4 px-5 sm:px-8 md:grid-cols-4"
      >
        {profile.stats.map((s) => {
          const match = s.value.match(/^([\d.]+)(.*)$/)
          const value = match ? parseFloat(match[1]) : 0
          const suffix = match ? match[2] : ''
          return (
            <div
              key={s.label}
              className="glass rounded-2xl px-5 py-6 text-center transition-transform hover:-translate-y-1"
            >
              <p className="font-display text-3xl font-bold">
                <span className="text-gradient">
                  <Counter value={value} suffix={suffix} />
                </span>
              </p>
              <p className="mt-1 text-xs tracking-wide text-slate-400 uppercase">{s.label}</p>
            </div>
          )
        })}
      </motion.div>
    </section>
  )
}