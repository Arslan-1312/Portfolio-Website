import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const ticking = useRef(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const shouldShow = window.scrollY > 400
        setIsVisible((prev) => (prev === shouldShow ? prev : shouldShow))
        ticking.current = false
      })
    }
    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-slate-900/60 border border-primary-purple/40 text-primary-cyan backdrop-blur-md shadow-lg shadow-primary-purple/10 hover:border-primary-cyan/60 hover:text-white transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
