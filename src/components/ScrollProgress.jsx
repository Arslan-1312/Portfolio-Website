import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  // Tight spring gives a snappy, responsive feel without over-shooting
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping:   35,
    restDelta: 0.001,
  })

  return (
    // Gradient bar fixed to the very top of the viewport, scales from left to right
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-blue via-primary-purple to-primary-cyan origin-left z-[100]"
      style={{ scaleX }}
    />
  )
}
