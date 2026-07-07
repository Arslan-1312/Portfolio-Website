import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ children, className = '', range = 50 }) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const rafId = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (rafId.current) return // skip if a frame is already queued
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null
      if (!ref.current) return
      const { clientX, clientY } = e
      const { left, top, width, height } = ref.current.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2
      
      const distanceX = clientX - centerX
      const distanceY = clientY - centerY

      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

      if (distance < range) {
        setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 })
      } else {
        setPosition((prev) => (prev.x === 0 && prev.y === 0 ? prev : { x: 0, y: 0 }))
      }
    })
  }, [range])

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
    setPosition((prev) => (prev.x === 0 && prev.y === 0 ? prev : { x: 0, y: 0 }))
  }, [])

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  )
}
