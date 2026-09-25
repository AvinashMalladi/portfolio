import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const x = useMotionValue(-600)
  const y = useMotionValue(-600)
  const sx = useSpring(x, { stiffness: 55, damping: 18, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 55, damping: 18, mass: 0.5 })

  useEffect(() => {
    if (!enabled) return
    const onMove = (e) => {
      x.set(e.clientX - 300)
      y.set(e.clientY - 300)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[1] h-[600px] w-[600px] rounded-full opacity-70 mix-blend-screen"
      style={{
        x: sx,
        y: sy,
        background:
          'radial-gradient(circle, rgba(99,102,241,0.14) 0%, rgba(34,211,238,0.07) 38%, rgba(99,102,241,0) 70%)',
      }}
      aria-hidden="true"
    />
  )
}