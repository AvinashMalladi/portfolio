import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  BookOpen,
  Copy,
  Download,
  ExternalLink,
  Folder,
  Home,
  Mail,
  Search,
  UserRound,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { profile } from '../data/profile'
import { NAV_LINKS } from '../data/nav'
import { scrollToId } from '../lib/scroll'

const scrollTo = (hash) => scrollToId(hash)

const getActions = () => [
  ...NAV_LINKS.map((l) => ({
    id: `nav-${l.href}`,
    label: `Go to ${l.label}`,
    group: 'Navigate',
    icon: l.href === '#home' ? Home : l.href === '#about' ? UserRound : l.href === '#code' ? Folder : BookOpen,
    keywords: l.label,
    run: () => scrollTo(l.href),
  })),
  {
    id: 'github',
    label: 'Open GitHub profile',
    group: 'Links',
    icon: ExternalLink,
    keywords: 'repos code source',
    run: () => window.open(profile.links.github, '_blank', 'noopener'),
  },
  {
    id: 'linkedin',
    label: 'Open LinkedIn profile',
    group: 'Links',
    icon: ExternalLink,
    keywords: 'resume job network',
    run: () => window.open(profile.links.linkedin, '_blank', 'noopener'),
  },
  {
    id: 'credly',
    label: 'View certifications — Credly',
    group: 'Links',
    icon: ArrowUpRight,
    keywords: 'badges credentials verify',
    run: () => window.open(profile.links.credly, '_blank', 'noopener'),
  },
  {
    id: 'email',
    label: `Send an email to ${profile.email}`,
    group: 'Actions',
    icon: Mail,
    keywords: 'contact mail',
    run: () => {
      window.location.href = profile.emailHref
    },
  },
  {
    id: 'copy-email',
    label: 'Copy email address',
    group: 'Actions',
    icon: Copy,
    keywords: 'copy clipboard contact',
    run: () => navigator.clipboard?.writeText(profile.email),
  },
  {
    id: 'resume',
    label: 'Download resume (PDF)',
    group: 'Actions',
    icon: Download,
    keywords: 'cv pdf download',
    run: () => {
      window.location.href = profile.resume
    },
  },
]

const isMac =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)
const KBD = isMac ? '⌘K' : 'Ctrl K'

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)

  const actions = useMemo(() => getActions(), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return actions
    return actions.filter((a) => `${a.label} ${a.keywords}`.toLowerCase().includes(q))
  }, [actions, query])

  const current = filtered.length ? Math.min(selected, filtered.length - 1) : -1

  useEffect(() => {
    const openPalette = () => {
      setQuery('')
      setSelected(0)
      setOpen(true)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (open) setOpen(false)
        else openPalette()
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    const onOpenEvent = () => openPalette()
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('open-command-palette', onOpenEvent)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('open-command-palette', onOpenEvent)
    }
  }, [open])

  const run = (action) => {
    setOpen(false)
    action.run()
  }

  return (
    <AnimatePresence>
      {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[85] flex items-start justify-center bg-ink-950/80 px-4 pt-[16vh] backdrop-blur-sm"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setOpen(false)
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-2xl shadow-black/50"
              role="dialog"
              aria-label="Command palette"
            >
              <div className="flex items-center gap-3 border-b border-white/5 px-4">
                <Search size={16} className="shrink-0 text-slate-500" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault()
                      if (filtered.length) setSelected((current + 1) % filtered.length)
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault()
                      if (filtered.length)
                        setSelected((current - 1 + filtered.length) % filtered.length)
                    } else if (e.key === 'Enter' && current >= 0) {
                      e.preventDefault()
                      run(filtered[current])
                    }
                  }}
                  placeholder="Type a command or search…"
                  className="w-full bg-transparent py-4 text-sm text-white placeholder-slate-500 outline-none"
                />
                <kbd className="shrink-0 rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-slate-500">
                  esc
                </kbd>
              </div>

              <div className="scroll-thin max-h-[300px] overflow-y-auto p-2">
                {filtered.length ? (
                  filtered.map((action, i) => {
                    const showGroup = i === 0 || filtered[i - 1].group !== action.group
                    const Icon = action.icon
                    return (
                      <div key={action.id}>
                        {showGroup ? (
                          <p className="px-3 pt-3 pb-1.5 font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase">
                            {action.group}
                          </p>
                        ) : null}
                        <button
                          onMouseMove={() => setSelected(i)}
                          onClick={() => run(action)}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                            i === current
                              ? 'bg-gradient-to-r from-brand-500/20 to-glow-500/20 text-white'
                              : 'text-slate-300'
                          }`}
                        >
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 ${
                              i === current ? 'text-glow-400' : 'text-slate-400'
                            }`}
                          >
                            <Icon size={15} />
                          </span>
                          <span className="truncate">{action.label}</span>
                        </button>
                      </div>
                    )
                  })
                ) : (
                  <p className="px-4 py-10 text-center text-sm text-slate-500">
                    No results for “{query}”
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 border-t border-white/5 px-4 py-2.5 font-mono text-[10px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded border border-white/10 bg-white/5 px-1.5">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded border border-white/10 bg-white/5 px-1.5">⏎</kbd>
                  open
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded border border-white/10 bg-white/5 px-1.5">{KBD}</kbd>
                  toggle
                </span>
                <span className="ml-auto flex items-center gap-1.5">
                  <GithubIcon size={11} />
                  <LinkedinIcon size={11} className="text-slate-400" />
                </span>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
  )
}