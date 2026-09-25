import { motion } from 'framer-motion'
import {
  BrainCircuit,
  CloudCog,
  Code2,
  Database,
  GraduationCap,
  UserRound,
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import { profile } from '../data/profile'

const FOCUS = [
  { icon: Code2, label: 'Backend Development', desc: 'REST APIs, Flask & Node.js' },
  { icon: BrainCircuit, label: 'AI & Agentic Systems', desc: 'RAG, LLMs & retrieval' },
  { icon: CloudCog, label: 'Cloud & DevOps', desc: 'AWS, Docker, CI/CD' },
  { icon: Database, label: 'Databases', desc: 'MySQL & SQLite' },
]

export default function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="01 // About"
          title="Building software that solves real problems"
          description="A quick look at who I am, what drives me, and where I'm heading."
        />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="glass glow-border rounded-3xl p-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-glow-500 text-white">
                <UserRound size={22} />
              </div>
              <p className="text-lg leading-relaxed text-slate-300">{profile.summary}</p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-4">
                <GraduationCap size={18} className="shrink-0 text-brand-400" />
                <div>
                  <p className="font-mono text-[11px] tracking-wide text-slate-500 uppercase">
                    Currently
                  </p>
                  <p className="text-sm font-medium text-slate-200">{profile.university}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-4">
                <Code2 size={18} className="shrink-0 text-glow-400" />
                <div>
                  <p className="font-mono text-[11px] tracking-wide text-slate-500 uppercase">
                    Focus
                  </p>
                  <p className="text-sm font-medium text-slate-200">
                    SWE · Backend · AI · Cloud
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-4">
            {FOCUS.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-1 hover:border-brand-400/40"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/20 to-glow-500/20 text-brand-300">
                  <f.icon size={20} />
                </div>
                <div>
                  <p className="font-medium text-white">{f.label}</p>
                  <p className="text-xs text-slate-400">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}