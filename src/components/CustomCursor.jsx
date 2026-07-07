import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 30, stiffness: 350, mass: 0.3 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      // Only set visible to true once to avoid calling setState on every single mousemove
      setIsVisible((prev) => {
        if (!prev) return true
        return prev
      })
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const handleMouseOver = (e) => {
      const target = e.target
      if (!target) return

      const isHover = !!(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('input') ||
        target.closest('textarea')
      )
      setIsHovered(isHover)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Scroll listener to re-evaluate what is under the cursor
    let scrollTicking = false
    const handleScroll = () => {
      if (scrollTicking) return
      scrollTicking = true
      requestAnimationFrame(() => {
        const element = document.elementFromPoint(mouseX.get(), mouseY.get())
        if (element) {
          const isHover = !!(
            element.tagName === 'A' ||
            element.tagName === 'BUTTON' ||
            element.closest('a') ||
            element.closest('button') ||
            element.closest('[role="button"]') ||
            element.tagName === 'INPUT' ||
            element.tagName === 'TEXTAREA' ||
            element.closest('input') ||
            element.closest('textarea')
          )
          setIsHovered(isHover)
        }
        scrollTicking = false
      })
    }

    window.addEventListener('mousemove', moveCursor, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [mouseX, mouseY])

  if (!isVisible) return null

  return (
    <>
      {/* Outer Follower Circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: '#FACC15',
          willChange: 'transform',
        }}
        animate={{
          scale: isClicking ? 0.75 : isHovered ? 1.75 : 1,
          backgroundColor: isHovered ? 'rgba(250, 204, 21, 0.2)' : 'rgba(0,0,0,0)',
        }}
        transition={{ type: 'tween', duration: 0.15 }}
      />
      {/* Inner Glowing Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-50 hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: '#FACC15',
          willChange: 'transform',
        }}
        animate={{
          scale: isClicking ? 1.4 : isHovered ? 0.4 : 1,
          backgroundColor: isHovered ? '#EAB308' : '#FACC15',
        }}
        transition={{ type: 'tween', duration: 0.05 }}
      />
    </>
  )
}