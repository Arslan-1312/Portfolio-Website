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
  return (
    <section className="relative py-12 px-4 md:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {statsData.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card p-6 rounded-2xl flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 border-white/5 hover:border-primary-purple/30 group"
            >
              {/* Backglow */}
              <div className={`absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br ${stat.gradient} blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="p-3 rounded-full bg-white/5 border border-white/10 mb-4 group-hover:scale-110 transition-transform z-10">
                <stat.Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight z-10">
                <CountUp end={stat.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                <span className="bg-gradient-to-r from-primary-cyan to-primary-purple bg-clip-text text-transparent">
                  {stat.suffix}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-400 mt-2 uppercase tracking-wider z-10">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
