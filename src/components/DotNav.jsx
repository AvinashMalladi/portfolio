import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { NAV_LINKS } from '../data/nav'

export default function DotNav() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Section navigation"
      className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex"
    >
      {NAV_LINKS.map((link) => (
        <a key={link.href} href={link.href} className="group relative flex items-center py-0.5">
          <span className="pointer-events-none absolute right-7 rounded-md border border-white/10 bg-ink-800 px-2.5 py-1 font-mono text-[11px] whitespace-nowrap text-slate-200 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            {link.label}
          </span>
          <motion.span
            animate={{
              scale: active === link.href ? 1 : 0.5,
              backgroundColor: active === link.href ? '#22d3ee' : 'rgba(148,163,184,0.4)',
              boxShadow:
                active === link.href
                  ? '0 0 12px rgba(34,211,238,0.8)'
                  : '0 0 0px rgba(34,211,238,0)',
            }}
            transition={{ duration: 0.25 }}
            className="block h-2.5 w-2.5 rounded-full"
          />
        </a>
      ))}
    </nav>
  )
}