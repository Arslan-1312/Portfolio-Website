import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'

import { experiences } from '../data/portfolioData.js'
export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-20 px-4 md:px-8 overflow-hidden z-10"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-widest text-primary-purple"
          >
            History
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white mt-2"
          >
            My Work Experience
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-gradient-to-r from-primary-purple via-primary-cyan to-primary-blue mt-4 rounded-full"
          />
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l border-slate-800 space-y-12">
          {/* Vertical line glow */}
          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-primary-purple via-primary-cyan to-transparent pointer-events-none" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-primary-purple z-10 flex items-center justify-center group-hover:border-primary-cyan transition-colors duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-purple group-hover:bg-primary-cyan group-hover:scale-125 transition-all duration-300" />
              </div>
              {/* Dot outer neon aura */}
              <div className="absolute -left-[39px] sm:-left-[47px] top-0 w-8 h-8 rounded-full bg-primary-purple/10 blur-sm scale-0 group-hover:scale-100 transition-transform duration-300" />

              {/* Experience Card */}
              <div className="glass-card p-6 rounded-2xl border-white/5 hover:border-primary-purple/30 transition-all duration-300 shadow-xl relative overflow-hidden">
                {/* Neon Background Aura */}
                <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-primary-purple/5 blur-xl group-hover:bg-primary-cyan/5 transition-colors duration-500" />

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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
