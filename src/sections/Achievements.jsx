import { motion } from 'framer-motion'
import { Award, Heart, Shield, Users } from 'lucide-react'

// Array holding only the remaining two achievements (Advocacy and Mentorship)
const achievementsData = [
  {
    icon: Heart,
    title: 'Thalassemia Jirga Advocacy & Blood Campaign',
    subtitle: 'Hazara University Community Initiative',
    description:
      'Organized and coordinated a student-led Jirga (advocacy committee) and blood donation drive at Hazara University. Partnered with regional blood transfusion centers and NGOs, raising critical awareness for Thalassemia patients and securing 150+ blood donor registrations.',
    tags: ['Leadership', 'Social Impact', 'Community Organizing'],
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
    glowColor: 'group-hover:bg-rose-500/15',
    borderColor: 'hover:border-rose-500/30',
  },
  {
    icon: Users,
    title: 'Open Source contributor & Mentor',
    subtitle: 'Developer Community',
    description:
      'Active developer helping junior students at Hazara University with coding bootcamps and workshop classes. Contributed custom front-end helper scripts and components to community web repositories.',
    tags: ['Open Source', 'Mentorship', 'Web Tech'],
    color: 'text-primary-purple',
    bgColor: 'bg-primary-purple/10',
    glowColor: 'group-hover:bg-primary-purple/15',
    borderColor: 'hover:border-primary-purple/30',
  },
]

export default function Achievements() {
  // Stagger animation container to trigger card entrances sequentially
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15, // Delay between each consecutive child card entrance
      },
    },
  }

  // Individual card spring-physics animation settings for buttery smooth GPU-accelerated transition
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 110, // Adjusts the speed of the bounce
        damping: 18,     // Absorbs the bounce for a refined, premium feel
      },
    },
  }

  return (
    <section id="achievements" className="relative py-20 px-4 md:px-8 overflow-hidden z-10">
      {/* Dynamic ambient background blob for extra section visual depth */}
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-primary-cyan/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading Area */}
        <div className="flex flex-col items-center text-center mb-16">
          {/* Subtle icon badge gliding up smoothly */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary-cyan"
          >
            <Shield className="w-4 h-4 text-primary-cyan" />
            <span>Honors</span>
          </motion.div>

          {/* Heading title fading and gliding in */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl font-extrabold text-white mt-2"
          >
            Key Achievements
          </motion.h3>

          {/* Glowing bottom line stretching out */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            className="w-16 h-1 bg-gradient-to-r from-primary-cyan via-primary-blue to-primary-purple mt-4 rounded-full"
          />
        </div>

        {/* Responsive Grid layout for remaining cards (Maximum 2 columns) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {achievementsData.map((ach, idx) => {
            const IconComponent = ach.icon
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                // Hover effect: Glides card up slightly and scales it using premium spring scaling
                whileHover={{ 
                  y: -8, 
                  scale: 1.025,
                  transition: { type: 'spring', stiffness: 300, damping: 20 }
                }}
                className={`group glass-card p-8 rounded-2xl border border-white/5 transition-colors duration-300 ${ach.borderColor} hover:shadow-2xl relative overflow-hidden flex flex-col justify-between`}
                style={{ willChange: 'transform, opacity' }} // Forces hardware acceleration
              >
                {/* Background glow atmosphere circle appearing on card hover */}
                <div className={`absolute -bottom-20 -right-20 w-44 h-44 rounded-full bg-white/0 blur-3xl transition-all duration-500 pointer-events-none ${ach.glowColor}`} />

                <div className="text-left relative z-10 flex-grow">
                  <div className="flex items-start gap-4 mb-5">
                    {/* Glowing icon wrapper scaling up on card hover */}
                    <div className={`p-4 rounded-2xl ${ach.bgColor} ${ach.color} border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white group-hover:text-primary-cyan transition-colors duration-300">
                        {ach.title}
                      </h4>
                      <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        {ach.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {ach.description}
                  </p>
                </div>

                {/* Tag badges container at the bottom */}
                <div className="flex flex-wrap gap-2 mt-auto border-t border-white/5 pt-4 relative z-10 text-left">
                  {ach.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-md text-[10px] font-bold text-slate-300 bg-white/5 border border-white/5 tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

