import Lenis from 'lenis'

let lenis = null

export function initLenis() {
  if (lenis) return lenis
  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.1,
    infinite: false,
  })
  return lenis
}

export function destroyLenis() {
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
}

export function getLenis() {
  return lenis
}

export function scrollToId(id) {
  const el = document.querySelector(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -76, duration: 1.2 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1.2 })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}