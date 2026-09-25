import { motion } from 'framer-motion'
import { BookOpen, ExternalLink, FlaskConical, GraduationCap, School } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { experience } from '../data/profile'

const ICONS = {
  'graduation-cap': GraduationCap,
  'book-open': BookOpen,
  school: School,
  'flask-conical': FlaskConical,
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="05 // Journey"
          title="Experience & education"
          description="The path that shaped me — academic foundations and research milestones."
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute top-0 bottom-0 left-5 w-px bg-gradient-to-b from-brand-500/60 via-glow-400/40 to-transparent sm:left-1/2" />

          {experience.map((group, gi) => (
            <div key={group.type}>
              {group.items.map((item, i) => {
                const Icon = ICONS[item.icon] || GraduationCap
                const onLeft = (gi + i) % 2 === 0
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: '-60px' }}
                    transition={{ duration: 0.55, delay: i * 0.08 }}
                    className="relative mb-10 pl-16 sm:w-1/2 sm:pl-0"
                  >
                    <span
                      className={`absolute top-1 left-5 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-white/10 bg-ink-800 text-brand-300 shadow-lg sm:left-auto ${
                        onLeft ? 'sm:right-0 sm:translate-x-1/2' : 'sm:left-0 sm:-translate-x-1/2'
                      }`}
                    >
                      <Icon size={17} />
                    </span>

                    <div
                      className={`glass glow-border rounded-2xl p-6 ${
                        onLeft ? 'sm:text-right' : 'sm:ml-auto sm:text-left'
                      }`}
                    >
                      <span className="font-mono text-[11px] tracking-[0.2em] text-glow-400 uppercase">
                        {group.type} · {item.period}
                      </span>
                      <h3 className="font-display mt-2 text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-slate-400">{item.org}</p>
                      <ul
                        className={`mt-3 space-y-1.5 text-sm text-slate-400 ${
                          onLeft ? 'sm:pl-0 sm:text-right' : 'sm:pr-0'
                        }`}
                      >
                        {item.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-300 hover:text-white"
                        >
                          Read the paper
                          <ExternalLink size={13} />
                        </a>
                      ) : null}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}