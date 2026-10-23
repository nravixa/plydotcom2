import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger)

// Placeholder for future pages
import Home from './pages/Home'
import Navbar from './components/navigation/Navbar'

function App() {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    // Expose lenis globally for menus, modals, and navigation buttons
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // GSAP ticker is the single source of truth for the animation clock
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateTicker)

    // Turn off GSAP lagSmoothing so clock skew does not freeze Lenis deltas
    gsap.ticker.lagSmoothing(0)

    // Handle smooth scroll events
    const handleScrollToTop = () => lenis.scrollTo(0, { duration: 1.2 })
    const handleScrollTo = (e: Event) => {
      const customEvent = e as CustomEvent<string>
      if (customEvent.detail) {
        lenis.scrollTo(customEvent.detail, { duration: 1.2, offset: -80 })
      }
    }

    // Intercept in-page anchor link clicks to avoid fighting native scroll
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]')
      if (target) {
        const href = target.getAttribute('href')
        if (href && href.startsWith('#')) {
          e.preventDefault()
          if (href === '#home' || href === '#') {
            lenis.scrollTo(0, { duration: 1.2 })
          } else {
            const el = document.querySelector(href)
            if (el) {
              lenis.scrollTo(el as HTMLElement, { duration: 1.2, offset: -80 })
            }
          }
        }
      }
    }

    window.addEventListener('scroll-to-top', handleScrollToTop)
    window.addEventListener('scroll-to', handleScrollTo as EventListener)
    document.addEventListener('click', handleAnchorClick)

    return () => {
      window.removeEventListener('scroll-to-top', handleScrollToTop)
      window.removeEventListener('scroll-to', handleScrollTo as EventListener)
      document.removeEventListener('click', handleAnchorClick)
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
      delete (window as unknown as { __lenis?: Lenis }).__lenis
    }
  }, [])

  return (
    <Router>
      <div className="relative min-h-screen flex flex-col w-full overflow-x-hidden bg-transparent">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  )
}

export default App
