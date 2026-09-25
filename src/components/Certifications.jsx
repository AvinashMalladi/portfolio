import { motion } from 'framer-motion'
import {
  Award,
  Cloud,
  Code2,
  Cpu,
  Database,
  ExternalLink,
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import { certifications } from '../data/profile'

const ICONS = {
  cloud: Cloud,
  cpu: Cpu,
  database: Database,
  'code-2': Code2,
}

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="06 // Certifications"
          title="Verified credentials"
          description="Certifications with public verification links — from cloud platforms to AI fundamentals."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {certifications.map((cert, i) => {
            const Icon = ICONS[cert.icon] || Award
            return (
              <motion.a
                key={cert.title}
                href={cert.verify}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                className="glass glow-border group flex items-center gap-5 rounded-2xl p-6 transition-all hover:-translate-y-1"
              >
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${cert.accent} text-white shadow-lg transition-transform group-hover:scale-105`}
                >
                  <Icon size={24} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base leading-snug font-semibold text-white">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {cert.issuer} <span className="text-slate-600">·</span> {cert.date}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-brand-400/30 bg-brand-500/10 px-3 py-1.5 text-xs font-semibold text-brand-300 transition-colors group-hover:bg-brand-500/20">
                  Verify
                  <ExternalLink size={12} />
                </span>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}