import { motion } from 'framer-motion'

export default function AmbientBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-30 select-none" style={{ contain: 'strict' }}>
      {/* Blob 1: Soft Indigo/Purple Atmosphere Glow */}
      <motion.div
        animate={{
          // Slowly glides across the top left viewport area
          x: [0, 50, -30, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.18, 0.92, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[10%] left-[-10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br from-primary-blue/35 to-primary-purple/35 blur-[80px] md:blur-[140px]"
        style={{ willChange: 'transform', contain: 'layout style paint' }} // CPU optimization hints
      />
      
      {/* Blob 2: Warm Purple/Amber atmosphere glow */}
      <motion.div
        animate={{
          // Glides across the center-right viewport area in reverse timing
          x: [0, -60, 40, 0],
          y: [0, 70, -40, 0],
          scale: [1, 0.88, 1.12, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[40%] right-[-10%] w-[300px] h-[300px] md:w-[550px] md:h-[550px] rounded-full bg-gradient-to-br from-primary-purple/25 to-primary-cyan/25 blur-[80px] md:blur-[140px]"
        style={{ willChange: 'transform', contain: 'layout style paint' }}
      />
      
      {/* Blob 3: Cyan/Slate atmosphere glow */}
      <motion.div
        animate={{
          // Drifts across the bottom viewport area
          x: [0, 40, -40, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.12, 0.88, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[-10%] left-[15%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-br from-primary-cyan/30 to-primary-blue/30 blur-[80px] md:blur-[140px]"
        style={{ willChange: 'transform', contain: 'layout style paint' }}
      />
    </div>
  )
}

