import { Suspense, lazy, useEffect, useState } from 'react'
import { AnimatePresence, useScroll, useSpring } from 'framer-motion'
import 'lenis/dist/lenis.css'
import Background from './components/Background'
import Cursor from './components/Cursor'
import CursorGlow from './components/CursorGlow'
import ScrollProgress from './components/ScrollProgress'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import CommandPalette from './components/CommandPalette'
import DotNav from './components/DotNav'
import BackToTop from './components/BackToTop'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Footer from './components/Footer'
import { initLenis, destroyLenis, scrollToId, scrollToTop } from './lib/scroll'

const GitHubRepos = lazy(() => import('./components/GitHubRepos'))
const Experience = lazy(() => import('./components/Experience'))
const Certifications = lazy(() => import('./components/Certifications'))
const Contact = lazy(() => import('./components/Contact'))

const HUE_STOPS = [230, 195, 262, 156, 42, 330]

function hueAtProgress(t) {
  const scaled = t * (HUE_STOPS.length - 1)
  const i = Math.min(HUE_STOPS.length - 2, Math.floor(scaled))
  const f = scaled - i
  return Math.round(HUE_STOPS[i] + (HUE_STOPS[i + 1] - HUE_STOPS[i]) * f)
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  const hue = useSpring(scrollYProgress, { stiffness: 55, damping: 20, mass: 0.6 })

  useEffect(() => {
    return hue.on('change', (v) => {
      document.documentElement.style.setProperty('--accent-hue', String(hueAtProgress(v)))
    })
  }, [hue])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0

    if (!reduceMotion) {
      const lenis = initLenis()
      const loop = (time) => {
        lenis.raf(time)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      if (anchor.classList.contains('skip-link')) return
      const href = anchor.getAttribute('href')
      if (href === '#') {
        e.preventDefault()
        scrollToTop()
        return
      }
      if (!document.getElementById(href.slice(1))) return
      e.preventDefault()
      scrollToId(href)
      history.pushState(null, '', href)
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      destroyLenis()
      document.removeEventListener('click', onClick)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Background />
      <Cursor />
      <CursorGlow />
      <ScrollProgress />
      <AnimatePresence>
        {loading ? <Preloader onDone={() => setLoading(false)} /> : null}
      </AnimatePresence>
      <Navbar />
      <CommandPalette />
      <DotNav />
      <BackToTop />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Suspense fallback={null}>
          <GitHubRepos />
          <Experience />
          <Certifications />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}