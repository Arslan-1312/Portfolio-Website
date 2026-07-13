import { useEffect } from 'react'
import Lenis from 'lenis'

// Components
import CustomCursor from './components/CustomCursor.jsx'
import ParticleBackground from './components/ParticleBackground.jsx'
import AmbientBlobs from './components/AmbientBlobs.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import BackToTop from './components/BackToTop.jsx'

// Sections
import Navbar from './sections/Navbar.jsx'
import Hero from './sections/Hero.jsx'
import Stats from './sections/Stats.jsx'
import About from './sections/About.jsx'
import Skills from './sections/Skills.jsx'
import Experience from './sections/Experience.jsx'
import Projects from './sections/Projects.jsx'
import Achievements from './sections/Achievements.jsx'
import Certifications from './sections/Certifications.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './sections/Footer.jsx'

export default function App() {
  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let rafId

    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-slate-900 text-white font-sans overflow-x-hidden selection:bg-primary-blue/20 selection:text-primary-blue">
      {/* Interactive Background & Effects */}
      <CustomCursor />
      <ParticleBackground />
      <AmbientBlobs />
      <ScrollProgress />
      <BackToTop />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* Stats Section */}
        <Stats />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Experience Section */}
        <Experience />

        {/* Projects Section */}
        <Projects />

        {/* Achievements Section */}
        <Achievements />

        {/* Certifications Section */}
        <Certifications />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
