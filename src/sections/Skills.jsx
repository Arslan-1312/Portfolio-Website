import { motion } from 'framer-motion'
import { FaReact, FaNodeJs, FaDatabase, FaPaintBrush, FaTools, FaShieldAlt } from 'react-icons/fa'

const skillCategories = [
  {
    title: 'Frontend',
    Icon: FaReact,
    iconColor: 'text-[#3B82F6]',
    skills: ['React.js', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3'],
    color: 'from-[#3B82F6]/20 to-[#8B5CF6]/10',
  },
  {
    title: 'Backend',
    Icon: FaNodeJs,
    iconColor: 'text-[#8B5CF6]',
    skills: ['Node.js', 'Express.js'],
    color: 'from-[#8B5CF6]/20 to-[#06B6D4]/10',
  },
  {
    title: 'Database',
    Icon: FaDatabase,
    iconColor: 'text-[#06B6D4]',
    skills: ['MongoDB', 'SQL'],
    color: 'from-[#06B6D4]/20 to-[#3B82F6]/10',
  },
  {
    title: 'UI/UX',
    Icon: FaPaintBrush,
    iconColor: 'text-[#EC4899]',
    skills: ['Figma', 'Wireframing', 'Prototyping'],
    color: 'from-[#EC4899]/20 to-[#8B5CF6]/10',
  },
  {
    title: 'Tools',
    Icon: FaTools,
    iconColor: 'text-[#10B981]',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman'],
    color: 'from-[#10B981]/20 to-[#06B6D4]/10',
  },
  {
    title: 'Other',
    Icon: FaShieldAlt,
    iconColor: 'text-[#F59E0B]',
    skills: ['REST APIs', 'JWT Authentication', 'Responsive Design'],
    color: 'from-[#F59E0B]/20 to-[#EC4899]/10',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 px-4 md:px-8 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-widest text-primary-cyan"
          >
            Capabilities
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white mt-2"
          >
            My Tech Stack & Skills
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-gradient-to-r from-primary-cyan via-primary-blue to-primary-purple mt-4 rounded-full"
          />
        </div>

        {/* Skills Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              className="glass-card p-6 rounded-2xl relative overflow-hidden transition-all duration-300 border-white/5 shadow-xl flex flex-col items-start text-left group"
            >
              {/* Ambient light */}
              <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br ${category.color} blur-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="flex items-center space-x-3 mb-6 z-10">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-slate-900 group-hover:scale-110 transition-all duration-300">
                  <category.Icon className={`w-6 h-6 ${category.iconColor}`} />
                </div>
                <h4 className="text-xl font-bold text-white group-hover:text-primary-cyan transition-colors">
                  {category.title}
                </h4>
              </div>

              {/* Skills Badges */}
              <div className="flex flex-wrap gap-2.5 w-full z-10">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300 bg-white/5 border border-white/5 hover:border-primary-purple/30 hover:bg-white/10 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
