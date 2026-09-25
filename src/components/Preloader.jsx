import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'

const DURATION = 900

export default function Preloader({ onDone }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const start = performance.now()
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION)
      setPct(Math.round(p * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(onDone, 120)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.35, ease: 'easeInOut' } }}
      aria-hidden="true"
    >
      <div className="grid-overlay absolute inset-0" />

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
        className="glow-border flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-glow-500 shadow-2xl shadow-brand-500/30"
      >
        <span className="font-display text-2xl font-bold text-white">{profile.monogram}</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="font-mono mt-5 text-sm tracking-[0.3em] text-slate-400 uppercase"
      >
        {profile.name.split(' ')[0]}.dev
      </motion.p>

      <div className="mt-8 h-[3px] w-48 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-glow-400"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: DURATION / 1000, ease: 'easeInOut' }}
        />
      </div>

      <span className="font-mono mt-4 text-xs text-slate-500 tabular-nums">
        {pct}% · loading
      </span>
    </motion.div>
  )
}