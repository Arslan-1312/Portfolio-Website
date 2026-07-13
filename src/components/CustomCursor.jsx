import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible,  setIsVisible]  = useState(false)
  const [isHovered,  setIsHovered]  = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  // Read whether we're in dark mode to pick the right cursor color
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark')
  )

  useEffect(() => {
    // Watch for theme class changes on <html> so cursor color updates instantly
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // Cursor accent: electric cyan in dark, indigo in light
  const accent      = isDark ? '#06b6d4' : '#4f46e5'
  const accentDim   = isDark ? '#0891b2' : '#6d62f5'
  const accentAlpha = isDark ? 'rgba(6,182,212,0.15)' : 'rgba(79,70,229,0.12)'

  // Raw mouse position values (no easing — pure pixel coordinates)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Outer ring uses looser springs so it lags slightly behind — creates a trailing effect
  const ringSpring = { damping: 28, stiffness: 280, mass: 0.35 }
  const ringX = useSpring(mouseX, ringSpring)
  const ringY = useSpring(mouseY, ringSpring)

  useEffect(() => {
    // Track raw mouse coordinates
    const moveCursor = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsVisible((prev) => prev || true)
    }

    const handleMouseLeave  = () => setIsVisible(false)
    const handleMouseEnter  = () => setIsVisible(true)
    const handleMouseDown   = () => setIsClicking(true)
    const handleMouseUp     = () => setIsClicking(false)

    // Detect when cursor is over an interactive element and expand the ring
    const handleMouseOver = (e) => {
      const target = e.target
      if (!target) return
      const isHover = !!(
        target.tagName === 'A'        || target.tagName === 'BUTTON'    ||
        target.closest('a')           || target.closest('button')       ||
        target.closest('[role="button"]') ||
        target.tagName === 'INPUT'    || target.tagName === 'TEXTAREA'  ||
        target.closest('input')       || target.closest('textarea')
      )
      setIsHovered(isHover)
    }

    let scrollTicking = false
    const handleScroll = () => {
      if (scrollTicking) return
      scrollTicking = true
      requestAnimationFrame(() => {
        const element = document.elementFromPoint(mouseX.get(), mouseY.get())
        if (element) {
          const isHover = !!(
            element.tagName === 'A'     || element.tagName === 'BUTTON' ||
            element.closest('a')        || element.closest('button')    ||
            element.closest('[role="button"]') ||
            element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' ||
            element.closest('input')    || element.closest('textarea')
          )
          setIsHovered(isHover)
        }
        scrollTicking = false
      })
    }

    window.addEventListener('mousemove',  moveCursor,      { passive: true })
    document.addEventListener('mouseleave',   handleMouseLeave)
    document.addEventListener('mouseenter',   handleMouseEnter)
    window.addEventListener('mouseover',  handleMouseOver, { passive: true })
    window.addEventListener('mousedown',  handleMouseDown)
    window.addEventListener('mouseup',    handleMouseUp)
    window.addEventListener('scroll',     handleScroll,    { passive: true })

    return () => {
      window.removeEventListener('mousemove',  moveCursor)
      document.removeEventListener('mouseleave',   handleMouseLeave)
      document.removeEventListener('mouseenter',   handleMouseEnter)
      window.removeEventListener('mouseover',  handleMouseOver)
      window.removeEventListener('mousedown',  handleMouseDown)
      window.removeEventListener('mouseup',    handleMouseUp)
      window.removeEventListener('scroll',     handleScroll)
    }
  }, [mouseX, mouseY])

  if (!isVisible) return null

  return (
    <>
      {/* Outer ring — lags behind cursor with a spring trail, expands on hover */}
      <motion.div
        className="cursor-ring fixed top-0 left-0 rounded-full border pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: accent,
          willChange: 'transform',
        }}
        animate={{
          // Expands significantly when hovering a clickable element
          width:  isHovered ? 44 : isClicking ? 22 : 32,
          height: isHovered ? 44 : isClicking ? 22 : 32,
          backgroundColor: isHovered ? accentAlpha : 'rgba(0,0,0,0)',
          // Slight rotate on click for a satisfying squish feel
          rotate: isClicking ? 12 : 0,
          opacity: 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      />

      {/* Inner dot — snaps directly to cursor position with no lag */}
      <motion.div
        className="cursor-dot fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: accent,
          willChange: 'transform',
        }}
        animate={{
          // Dot shrinks on hover (ring takes over) and flares on click
          width:  isHovered ? 5 : isClicking ? 14 : 10,
          height: isHovered ? 5 : isClicking ? 14 : 10,
          backgroundColor: isHovered ? accentDim : accent,
          opacity: 1,
        }}
        transition={{ type: 'tween', duration: 0.07 }}
      />
    </>
  )
}