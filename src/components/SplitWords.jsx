import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

export default function SplitWords({ text, delay = 0, className }) {
  const words = text.split(' ')
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
          <motion.span
            initial={{ y: '115%', rotate: 4 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.7, delay: delay + i * 0.07, ease: EASE }}
            className="inline-block will-change-transform"
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}