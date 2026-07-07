import { motion } from 'framer-motion'
import { Award, Briefcase, Calendar, ShieldCheck } from 'lucide-react'

import { certificationsData } from '../data/portfolioData.js'

export default function Certifications() {
  // Double the list to make the infinite marquee scrolling seamless
  const duplicatedCertifications = [...certificationsData, ...certificationsData]

  return (
    <section id="certifications" className="relative py-20 overflow-hidden z-10">
      {/* Dynamic Background elements specific to this section */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-primary-purple/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-primary-cyan/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary-purple"
          >
            <Award className="w-4 h-4 text-primary-purple animate-pulse" />
            <span>Credentials</span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white mt-2"
          >
            Certifications & Training
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-gradient-to-r from-primary-purple via-primary-cyan to-primary-blue mt-4 rounded-full"
          />
        </div>
      </div>

      {/* Marquee Track Container */}
      <div className="relative w-full flex overflow-x-hidden py-4 mask-gradient">
        {/* Left & Right Glass Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-900 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-900 to-transparent z-20 pointer-events-none" />

        {/* Sliding Row 1 */}
        <div className="flex space-x-6 animate-marquee whitespace-nowrap cursor-grab active:cursor-grabbing">
          {duplicatedCertifications.map((cert, index) => (
            <div
              key={index}
              className={`group flex-shrink-0 w-[300px] sm:w-[350px] p-6 rounded-2xl glass-card border border-white/5 transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br ${cert.color} hover:${cert.borderColor} shadow-xl relative overflow-hidden`}
            >
              {/* Decorative radial shine */}
              <div className="absolute inset-0 bg-radial-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex flex-col h-full justify-between relative z-10">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-primary-cyan/30 group-hover:bg-slate-950/40 transition-colors">
                    <ShieldCheck className="w-6 h-6 text-primary-cyan" />
                  </div>
                  <span className="flex items-center space-x-1 text-[11px] font-bold tracking-wider uppercase bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-slate-300">
                    <Calendar className="w-3 h-3 text-primary-purple" />
                    <span>{cert.date}</span>
                  </span>
                </div>

                <div className="text-left mb-4">
                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-primary-cyan transition-colors line-clamp-2 leading-snug whitespace-normal">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 font-semibold">
                    {cert.issuer}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-3.5 mt-auto">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    ID: {cert.credentialId}
                  </span>
                  <span className="text-[11px] font-bold text-primary-purple group-hover:text-primary-cyan transition-colors">
                    Verified Credential
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* Custom Keyframes in inline style element */}
      <style>{`
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
          will-change: transform;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        .bg-radial-glow {
          background: radial-gradient(circle 80px at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.06), transparent 80%);
        }
      `}</style>
    </section>
  )
}
