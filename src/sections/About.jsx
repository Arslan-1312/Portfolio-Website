import { motion } from 'framer-motion'
import ReactCountUp from 'react-countup'
const CountUp = ReactCountUp.default || ReactCountUp
import { GraduationCap, MapPin, Heart } from 'lucide-react'

const cards = [
  { count: 2, label: 'Years Experience', suffix: '+' },
  { count: 10, label: 'Projects Developed', suffix: '+' },
  { count: 5, label: 'MERN Stack Projects', suffix: '+' },
  { count: 3, label: 'WordPress Projects', suffix: '+' },
]

export default function About() {
  return (
    <section
      id="about"
      className="relative py-20 px-4 md:px-8 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-widest text-primary-blue"
          >
            About Me
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white mt-2"
          >
            Crafting Digital Solutions
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-gradient-to-r from-primary-blue via-primary-purple to-primary-cyan mt-4 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Description */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <h4 className="text-2xl font-bold text-white leading-snug">
              I am a Software Engineering Student & Full-Stack Developer
            </h4>

            <p className="text-slate-400 leading-relaxed">
              Software Engineering student at Hazara University, Mansehra, passionate about building scalable and
              responsive web applications. My path revolves around combining programming rigor with beautiful UX design.
            </p>

            <p className="text-slate-400 leading-relaxed">
              I specialize in the MERN Stack (MongoDB, Express.js, React, Node.js) and frontend development. Over the past 2+ years, I have successfully transformed mockups and technical architectures into fully functional, high-performance web products.
            </p>

            {/* Sub-info list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center space-x-3 text-slate-300">
                <div className="p-2 rounded-lg bg-white/5 text-primary-blue">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Education</p>
                  <p className="text-sm font-semibold">Hazara University, Mansehra</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-300">
                <div className="p-2 rounded-lg bg-white/5 text-primary-cyan">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Location</p>
                  <p className="text-sm font-semibold">Mansehra, KPK, Pakistan</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-300 sm:col-span-2">
                <div className="p-2 rounded-lg bg-white/5 text-primary-purple">
                  <Heart className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Passions</p>
                  <p className="text-sm font-semibold">Clean Code, Interactive UI, Full Stack Architectures</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Grid Counters */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 grid grid-cols-2 gap-4"
          >
            {cards.map((c, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -4 }}
                className="glass-card p-6 rounded-2xl border-white/5 hover:border-primary-cyan/40 hover:bg-slate-900/60 shadow-lg text-center flex flex-col justify-center items-center transition-all duration-300 group"
              >
                <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary-cyan via-primary-blue to-primary-purple bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  <CountUp end={c.count} duration={2} enableScrollSpy scrollSpyOnce />
                  <span>{c.suffix}</span>
                </div>
                <p className="text-sm font-medium text-slate-400 mt-2 uppercase tracking-wide">
                  {c.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
