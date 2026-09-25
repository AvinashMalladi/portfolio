import { motion } from 'framer-motion'
import SplitWords from './SplitWords'

export default function SectionHeading({ eyebrow, title, description }) {
  const num = eyebrow.match(/^\d{2}/)?.[0] ?? ''

  return (
    <div className="relative mx-auto mb-16 max-w-2xl text-center">
      {num ? (
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[10rem] leading-none font-bold text-white/[0.03] select-none"
        >
          {num}
        </motion.span>
      ) : null}

      <motion.span
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        style={{ color: 'hsl(var(--accent-hue) 90% 68%)' }}
        className="relative font-mono text-sm tracking-[0.3em] uppercase"
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: '-60px' }}
        transition={{ duration: 0.3 }}
        className="font-display relative mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl"
      >
        <SplitWords text={title} delay={0.1} />
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.25 }}
        style={{
          background: `linear-gradient(90deg, hsl(var(--accent-hue) 85% 58%), hsl(calc(var(--accent-hue) + 40) 90% 66%), hsl(calc(var(--accent-hue) - 35) 90% 70%))`,
        }}
        className="relative mx-auto mt-5 h-1 w-24 rounded-full opacity-80"
      />
      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mt-5 text-slate-400"
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  )
}