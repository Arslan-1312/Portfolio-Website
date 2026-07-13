import { motion } from 'framer-motion'
import ReactCountUp from 'react-countup'
const CountUp = ReactCountUp.default || ReactCountUp
import { FaBriefcase, FaCode, FaGlobe, FaLayerGroup, FaCertificate } from 'react-icons/fa'

const statsData = [
  {
    value: 10,
    suffix: '+',
    label: 'Projects Completed',
    Icon: FaLayerGroup,
    iconColor: 'text-primary-blue',
    gradient: 'from-primary-blue/20 to-primary-purple/10',
  },
  {
    value: 5,
    suffix: '+',
    label: 'MERN Stack Projects',
    Icon: FaCode,
    iconColor: 'text-primary-purple',
    gradient: 'from-primary-purple/20 to-primary-cyan/10',
  },
  {
    value: 3,
    suffix: '+',
    label: 'WordPress Projects',
    Icon: FaGlobe,
    iconColor: 'text-primary-cyan',
    gradient: 'from-primary-cyan/20 to-primary-blue/10',
  },
  {
    value: 2,
    suffix: '+',
    label: 'Years Experience',
    Icon: FaBriefcase,
    iconColor: 'text-primary-blue',
    gradient: 'from-primary-blue/20 to-primary-cyan/10',
  },
  {
    value: 8,
    suffix: '+',
    label: 'Certificates',
    Icon: FaCertificate,
    iconColor: 'text-primary-purple',
    gradient: 'from-primary-purple/20 to-primary-blue/10',
  },
]

export default function Stats() {
  // Stagger container animation variant
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // Stagger delay between card entries
      },
    },
  }

  // Individual stat card spring entry animation
  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 110,
        damping: 18,
      },
    },
  }

  return (
    <section className="relative py-12 px-4 md:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Animated staggered list container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {statsData.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              // Hover effect: lifts the stat card up smoothly and scales with spring physics
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                transition: { type: 'spring', stiffness: 300, damping: 15 }
              }}
              style={{ willChange: 'transform, opacity' }} // Informs browser to optimize performance
              className="glass-card p-6 rounded-2xl flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 border-white/5 hover:border-primary-purple/30 group"
            >
              {/* Decorative Backglow atmosphere circle appearing on hover */}
              <div className={`absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br ${stat.gradient} blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Glowing icon wrapper scaling up on hover */}
              <div className="p-3 rounded-full bg-white/5 border border-white/10 mb-4 group-hover:scale-110 transition-transform duration-300 z-10">
                <stat.Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>

              {/* Stat number with count up */}
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight z-10">
                <CountUp end={stat.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                <span className="bg-gradient-to-r from-primary-cyan to-primary-purple bg-clip-text text-transparent">
                  {stat.suffix}
                </span>
              </div>

              {/* Stat text label */}
              <p className="text-xs sm:text-sm font-semibold text-slate-400 mt-2 uppercase tracking-wider z-10">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

