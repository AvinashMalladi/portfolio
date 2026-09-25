import { ArrowUp, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 sm:flex-row sm:px-8">
        <a href="#home" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-glow-500 font-display text-xs font-bold text-white">
            {profile.monogram}
          </span>
          <span className="font-display text-sm text-slate-300">
            © {new Date().getFullYear()} {profile.name}
          </span>
        </a>

        <p className="font-mono text-xs text-slate-500">
          Hand-built with <span className="text-slate-400">React · Tailwind · Framer Motion</span> —{" "}
          <span style={{ color: 'hsl(var(--accent-hue) 90% 68%)' }}>no templates</span>
        </p>

        <div className="flex items-center gap-3">
          <a
            href={profile.emailHref}
            aria-label="Email"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-all hover:-translate-y-0.5 hover:text-white"
          >
            <Mail size={15} />
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-lg p-2 text-slate-400 transition-colors hover:text-white"
          >
            <GithubIcon size={17} />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="rounded-lg p-2 text-slate-400 transition-colors hover:text-white"
          >
            <LinkedinIcon size={17} />
          </a>
          <a
            href="#home"
            aria-label="Back to top"
            className="rounded-lg border border-white/10 p-2 text-slate-400 transition-all hover:-translate-y-0.5 hover:text-white"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}