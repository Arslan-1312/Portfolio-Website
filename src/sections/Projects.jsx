import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import MagneticButton from '../components/MagneticButton.jsx'
import { projectsData } from '../data/portfolioData.js'

const categories = ['All', 'MERN Stack', 'Front-End', 'UI/UX Design']

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')

  // Filter project cards according to active category tab
  const filteredProjects =
    activeCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory)

  // Spring animations for entering, exiting, and positioning project cards
  const projectCardVariants = {
    hidden: { opacity: 0, scale: 0.94, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 110,
        damping: 17,
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.94, 
      y: 15,
      transition: { duration: 0.22, ease: 'easeInOut' }
    }
  }

  return (
    <section id="projects" className="relative py-20 px-4 md:px-8 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading Area */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary-cyan"
          >
            <span>Portfolio</span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl font-extrabold text-white mt-2"
          >
            My Recent Projects
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            className="w-16 h-1 bg-gradient-to-r from-primary-cyan via-primary-blue to-primary-purple mt-4 rounded-full"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const isActive = activeCategory === category
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-5 py-2 text-sm font-semibold rounded-full border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-white border-primary-cyan bg-primary-cyan/10 shadow-lg shadow-primary-cyan/20'
                    : 'text-slate-400 border-white/5 bg-white/5 hover:border-slate-700 hover:text-white'
                }`}
              >
                {/* Active category pill sliding animation */}
                {isActive && (
                  <motion.span
                    layoutId="activeCategoryIndicator"
                    className="absolute inset-0 rounded-full border border-primary-cyan z-[-1] bg-primary-cyan/5"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
                {category}
              </button>
            )
          })}
        </div>

        {/* Projects Grid Container with layout animations */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout // Smoothly morphs layout positions when grid changes
                key={project.id}
                variants={projectCardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                // Hover effect: gently translates upward and scales
                whileHover={{ 
                  y: -8, 
                  scale: 1.025,
                  transition: { type: 'spring', stiffness: 350, damping: 18 } 
                }}
                style={{ willChange: 'transform, opacity' }} // Forces hardware acceleration
                className="glass-card rounded-2xl overflow-hidden border-white/5 hover:border-primary-cyan/30 transition-colors duration-300 flex flex-col group shadow-2xl cursor-pointer"
              >
                {/* Project Image Box */}
                <div className="relative overflow-hidden aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <span className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-950/80 border border-white/10 text-primary-cyan backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                {/* Card Info Box */}
                <div className="p-6 flex flex-col flex-grow text-left relative">
                  {/* Glowing light spot decoration */}
                  <div className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full bg-primary-cyan/5 blur-2xl group-hover:bg-primary-cyan/15 transition-all duration-500 pointer-events-none" />

                  <h4 className="text-xl font-bold text-white group-hover:text-primary-cyan transition-colors mb-2">
                    {project.title}
                  </h4>

                  <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-grow">
                    {project.description}
                  </p>

                  {/* Tech Tags Badges */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-300 bg-white/5 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Link Buttons */}
                  <div className="flex items-center gap-3 mt-auto border-t border-white/5 pt-4">
                    <MagneticButton className="flex-grow">
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-primary-blue to-primary-purple text-white-pure text-xs font-bold shadow-lg hover:brightness-110 transition-all active:scale-95"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    </MagneticButton>

                    <MagneticButton>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Repository"
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-slate-600 hover:bg-slate-900 transition-all active:scale-95"
                      >
                        <FaGithub className="w-4 h-4" />
                      </a>
                    </MagneticButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}

