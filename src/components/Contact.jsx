import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Clock, Copy, Mail, MapPin, Phone, Send } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import SectionHeading from './SectionHeading'
import { profile } from '../data/profile'

function useLocalTime(timeZone = 'Asia/Kolkata') {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const time = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone,
  }).format(now)

  const date = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone,
  }).format(now)

  return { time, date }
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [copied, setCopied] = useState(false)
  const local = useLocalTime()

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = profile.emailHref
    }
  }

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="07 // Contact"
          title="Let's build something together"
          description="Have a role, project, or idea in mind? My inbox is always open."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <div className="glass flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-1">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-glow-500 text-white">
                <Mail size={19} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[11px] tracking-wide text-slate-500 uppercase">Email</p>
                <a
                  href={profile.emailHref}
                  className="block truncate text-sm font-medium text-slate-200 hover:text-white"
                >
                  {profile.email}
                </a>
              </div>
              <button
                onClick={copyEmail}
                aria-label={copied ? 'Email copied' : 'Copy email address'}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all ${
                  copied
                    ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
            </div>

            <a
              href={profile.phoneHref}
              className="glass flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-1"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-glow-500 to-brand-500 text-white">
                <Phone size={19} />
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-wide text-slate-500 uppercase">Phone</p>
                <p className="text-sm font-medium text-slate-200">{profile.phone}</p>
              </div>
            </a>

            <div className="glass flex items-center gap-4 rounded-2xl p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-500 text-white">
                <MapPin size={19} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[11px] tracking-wide text-slate-500 uppercase">
                  Location
                </p>
                <p className="text-sm font-medium text-slate-200">{profile.location}</p>
                <p className="mt-1.5 flex items-center gap-1.5 font-mono text-xs text-glow-400">
                  <Clock size={12} />
                  <span className="tabular-nums">{local.time}</span>
                  <span className="text-slate-500">· {local.date}</span>
                </p>
              </div>
            </div>

            <div className="mt-2 flex gap-3">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="glass flex flex-1 items-center justify-center gap-2 rounded-2xl p-4 text-sm font-medium text-slate-200 transition-all hover:-translate-y-1 hover:text-white"
              >
                <GithubIcon size={17} className="text-brand-300" />
                GitHub
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="glass flex flex-1 items-center justify-center gap-2 rounded-2xl p-4 text-sm font-medium text-slate-200 transition-all hover:-translate-y-1 hover:text-white"
              >
                <LinkedinIcon size={17} className="text-brand-300" />
                LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={onSubmit}
            className="glass glow-border rounded-3xl p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
                  Name
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors outline-none hover:border-white/20 focus:border-brand-400/60"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors outline-none hover:border-white/20 focus:border-brand-400/60"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
                Message
              </label>
<textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors outline-none hover:border-white/20 focus:border-brand-400/60"
                  placeholder="Tell me about the role or project…"
                />
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-glow-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-transform hover:scale-[1.02] active:scale-95"
            >
              <Send size={16} />
              Send Message
            </button>
            <p className="mt-3 text-center text-xs text-slate-500">
              Opens your email client with the message pre-filled.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}