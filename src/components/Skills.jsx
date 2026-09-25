import { motion } from 'framer-motion'
import {
  Brain,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layout,
  Server,
  Sparkles,
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import { skills } from '../data/profile'

const ICONS = {
  code: Code2,
  server: Server,
  layout: Layout,
  database: Database,
  'git-branch': GitBranch,
  cloud: Cloud,
  sparkles: Sparkles,
  brain: Brain,
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="02 // Skills"
          title="My technical toolkit"
          description="Languages, frameworks, and tools I use to design, build, test, and ship software."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {skills.map((group, gi) => {
            const Icon = ICONS[group.icon] || Code2
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (gi % 2) * 0.08 }}
                className="glass glow-border group rounded-2xl p-6 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${group.accent} text-white shadow-lg`}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {group.category}
                  </h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-brand-400/50 hover:text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}