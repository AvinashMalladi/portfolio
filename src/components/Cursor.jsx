import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return fine && !reduced
  })
  const [hovering, setHovering] = useState(false)
  const [hidden, setHidden] = useState(true)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.5 })

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('custom-cursor')

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHidden(false)
    }
    const onOver = (e) => {
      setHovering(Boolean(e.target.closest('a, button, input, textarea, [data-cursor]')))
    }
    const onLeave = () => setHidden(true)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[120]"
        style={{ x, y }}
        aria-hidden="true"
      >
        <span className={`cursor-dot ${hovering ? 'cursor-dot--hover' : ''} ${hidden ? 'opacity-0' : ''}`} />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[120]"
        style={{ x: ringX, y: ringY }}
        aria-hidden="true"
      >
        <span className={`cursor-ring ${hovering ? 'cursor-ring--hover' : ''} ${hidden ? 'opacity-0' : ''}`} />
      </motion.div>
    </>
  )
}