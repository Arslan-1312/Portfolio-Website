import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import { experiences } from '../data/portfolioData.js'

export default function Experience() {
  // Cascades timeline entries sequentially as they scroll into view
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18, // Timing offset between consecutive job items
      },
    },
  }

  // Slide-in spring configuration for individual experience cards
  const itemVariants = {
    hidden: { opacity: 0, x: -35 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 16,
      },
    },
  }

  // Pop-in spring animation for the timeline dot markers
  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 180,
        damping: 12,
        delay: 0.25, // Appears shortly after card slide-in begins
      },
    },
  }

  return (
    <section
      id="experience"
      className="relative py-20 px-4 md:px-8 overflow-hidden z-10"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Heading Area */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-xs font-bold uppercase tracking-widest text-primary-purple"
          >
            History
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl font-extrabold text-white mt-2"
          >
            My Work Experience
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            className="w-16 h-1 bg-gradient-to-r from-primary-purple via-primary-cyan to-primary-blue mt-4 rounded-full"
          />
        </div>

        {/* Timeline main container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative pl-6 sm:pl-8 border-l border-slate-800 space-y-12"
        >
          {/* Glowing vertical gradient line decoration */}
          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-primary-purple via-primary-cyan to-transparent pointer-events-none" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="relative group"
            >
              {/* Timeline dot pop animation */}
              <motion.div
                variants={dotVariants}
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-primary-purple z-10 flex items-center justify-center group-hover:border-primary-cyan transition-colors duration-300"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary-purple group-hover:bg-primary-cyan group-hover:scale-125 transition-all duration-300" />
              </motion.div>
              
              {/* Dot outer neon aura decoration on hover */}
              <div className="absolute -left-[39px] sm:-left-[47px] top-0 w-8 h-8 rounded-full bg-primary-purple/10 blur-sm scale-0 group-hover:scale-100 transition-transform duration-300 pointer-events-none" />

              {/* Experience Info Card */}
              <motion.div 
                whileHover={{ 
                  y: -6, 
                  scale: 1.015,
                  transition: { type: 'spring', stiffness: 300, damping: 15 } 
                }}
                style={{ willChange: 'transform, opacity' }} // Hardware acceleration optimization
                className="glass-card p-6 rounded-2xl border-white/5 hover:border-primary-purple/30 transition-colors duration-300 shadow-xl relative overflow-hidden"
              >
                {/* Neon Background atmosphere decoration */}
                <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-primary-purple/5 blur-xl group-hover:bg-primary-cyan/5 transition-colors duration-500 pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-primary-cyan transition-colors">
                      {exp.role}
                    </h4>
                    <div className="flex items-center space-x-2 text-slate-400 mt-1 text-sm font-semibold">
                      <MapPin className="w-4 h-4 text-primary-purple" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full w-fit">
                    <Calendar className="w-3.5 h-3.5 text-primary-cyan" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                {exp.bullets && exp.bullets.length > 0 ? (
                  <ul className="space-y-2 text-slate-400 text-sm list-none text-left">
                    {exp.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex items-start">
                        <span className="text-primary-purple mr-2 font-extrabold">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400 text-sm text-left">
                    Worked on full-cycle client engagements, marketing optimization, and developing high-fidelity front-end components.
                  </p>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

