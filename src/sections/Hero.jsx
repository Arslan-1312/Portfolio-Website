import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { FaReact, FaNodeJs, FaGithub, FaLinkedin, FaJs } from 'react-icons/fa'
import { SiMongodb, SiTailwindcss } from 'react-icons/si'
import { Mail, ArrowRight, Download, Loader2 } from 'lucide-react'
import profileImg from '../assets/CV.jpeg'
import MagneticButton from '../components/MagneticButton.jsx'

// Lazy-load the heavy PDF components — only imported when user clicks Download
const LazyPDFDownload = lazy(() =>
  import('@react-pdf/renderer').then((mod) =>
    import('../components/CVDocument.jsx').then((cvMod) => ({
      default: function PDFDownloadButton() {
        const PDFDownloadLink = mod.PDFDownloadLink
        const CVDocument = cvMod.default
        return (
          <PDFDownloadLink
            document={<CVDocument />}
            fileName="Arslan_Iqbal_CV.pdf"
            className="flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-900 border border-white/10 hover:border-primary-cyan/50 text-slate-300 hover:text-white font-semibold hover:shadow-lg hover:shadow-primary-cyan/10 transition-all active:scale-95"
          >
            {({ loading }) => (
              <>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                <span>{loading ? 'Generating CV...' : 'Download Resume'}</span>
              </>
            )}
          </PDFDownloadLink>
        )
      },
    }))
  )
)

const roles = [
  'Software Engineer',
  'MERN Stack Developer',
  'Front-End Developer',
  'React Developer',
]

function TypingText() {
  const [wordIndex, setWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timer
    const activeWord = roles[wordIndex]
    const speed = isDeleting ? 30 : 60

    const tick = () => {
      if (!isDeleting) {
        setCurrentText(activeWord.substring(0, currentText.length + 1))
        if (currentText === activeWord) {
          timer = setTimeout(() => setIsDeleting(true), 1800)
          return
        }
      } else {
        setCurrentText(activeWord.substring(0, currentText.length - 1))
        if (currentText === '') {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % roles.length)
          return
        }
      }
      timer = setTimeout(tick, speed)
    }

    timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, wordIndex])

  return (
    <span className="text-primary-cyan border-r-2 border-primary-cyan animate-pulse pr-1">
      {currentText}
    </span>
  )
}

export default function Hero() {
  const [showPDF, setShowPDF] = useState(false)

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = contactSection.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      })
    }
  }

  // Animation configuration to stagger the slide-in of text blocks on page entry
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Wait 100ms between displaying each consecutive text block
      },
    },
  }

  // Spring physics slide-up animation variant for text elements
  const textItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 18,
      },
    },
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 md:px-8 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Side: Staggered entrance info block */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center text-left space-y-6"
        >
          {/* Subtle status tag gliding in */}
          <motion.div variants={textItemVariants} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-blue/10 border border-primary-blue/30 w-fit">
            <span className="w-2 h-2 rounded-full bg-primary-cyan animate-ping" />
            <span className="text-xs font-semibold text-primary-blue tracking-wide uppercase">
              Open to Opportunities
            </span>
          </motion.div>

          {/* Main heading name glide */}
          <motion.h1 variants={textItemVariants} className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Hi, I'm <span className="bg-gradient-to-r from-primary-blue via-primary-purple to-primary-cyan bg-clip-text text-transparent">Arslan Iqbal</span>
          </motion.h1>

          {/* Typed Role subtitle */}
          <motion.h2 variants={textItemVariants} className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-300 min-h-[40px]">
            I am a <TypingText />
          </motion.h2>

          {/* Personal summary descriptor */}
          <motion.p variants={textItemVariants} className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
            Software Engineering undergraduate with 2+ years of experience developing modern user interfaces and
            scalable full-stack applications using React, Node.js, Express.js, MongoDB, Tailwind CSS, and WordPress.
          </motion.p>

          {/* Interactive Action Buttons */}
          <motion.div variants={textItemVariants} className="flex flex-wrap gap-4 items-center pt-2">
            <MagneticButton>
              <button
                onClick={handleScrollToContact}
                className="group flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary-blue to-primary-purple text-white-pure font-semibold hover:shadow-lg hover:shadow-primary-purple/20 transition-all active:scale-95"
              >
                <span>Contact Me</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </MagneticButton>

            <MagneticButton>
              {showPDF ? (
                <Suspense
                  fallback={
                    <span className="flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-900 border border-white/10 text-slate-300 font-semibold">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Loading...</span>
                    </span>
                  }
                >
                  <LazyPDFDownload />
                </Suspense>
              ) : (
                <button
                  onClick={() => setShowPDF(true)}
                  className="flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-900 border border-white/10 hover:border-primary-cyan/50 text-slate-300 hover:text-white font-semibold hover:shadow-lg hover:shadow-primary-cyan/10 transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </button>
              )}
            </MagneticButton>
          </motion.div>

          {/* Social icons glide */}
          <motion.div variants={textItemVariants} className="flex items-center space-x-4 pt-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Connect:</span>
            {[
              { icon: <FaGithub className="w-5 h-5" />, href: 'https://github.com/arslaniqbal4666', label: 'GitHub' },
              { icon: <FaLinkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/arslan-iqbal-aa51a7305/', label: 'LinkedIn' },
              { icon: <Mail className="w-5 h-5" />, href: 'mailto:arslaniqbal4666@gmail.com', label: 'Email' },
            ].map((soc, idx) => (
              <MagneticButton key={idx}>
                <a
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-primary-cyan/50 hover:bg-gradient-to-br hover:from-primary-blue/20 hover:to-primary-cyan/20 transition-all shadow-md"
                  aria-label={soc.label}
                >
                  {soc.icon}
                </a>
              </MagneticButton>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side: Glowing Portrait & Floating Orbital Tech Badges */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-12">
          {/* Main Portrait Frame with Outer Rotating neon Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 70, damping: 15, delay: 0.3 }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center"
          >
            {/* Spinning gradient frame */}
            <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-tr from-primary-blue via-primary-purple to-primary-cyan shadow-2xl shadow-primary-purple/35 animate-[spin_12s_linear_infinite]" style={{ willChange: 'transform' }}>
              <div className="w-full h-full rounded-full bg-slate-950" />
            </div>

            {/* Inner profile picture with interactive scale reaction on hover */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 200, damping: 16 }}
              className="absolute w-[246px] h-[246px] sm:w-[308px] sm:h-[308px] rounded-full overflow-hidden border-4 border-slate-900 z-10 cursor-pointer shadow-inner"
              style={{ willChange: 'transform' }}
            >
              <img
                src={profileImg}
                alt="Arslan Iqbal"
                decoding="async"
                className="w-full h-full object-cover select-none scale-[1.02] hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </motion.div>

          {/* Floating interactive React icon badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
            whileHover={{ scale: 1.15, rotate: 10 }}
            className="absolute top-2 left-6 sm:left-12 p-3 rounded-2xl bg-slate-900/80 border border-white/10 text-[#61DAFB] shadow-xl backdrop-blur-md z-20 hover:border-primary-cyan cursor-pointer transition-colors duration-300"
            style={{ willChange: 'transform' }}
          >
            <FaReact className="w-6 h-6" />
          </motion.div>

          {/* Floating Node.js badge */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 }}
            whileHover={{ scale: 1.15, rotate: -10 }}
            className="absolute top-8 right-6 sm:right-12 p-3 rounded-2xl bg-slate-900/80 border border-white/10 text-[#339933] shadow-xl backdrop-blur-md z-20 hover:border-primary-purple cursor-pointer transition-colors duration-300"
            style={{ willChange: 'transform' }}
          >
            <FaNodeJs className="w-6 h-6" />
          </motion.div>

          {/* Floating MongoDB badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-slate-900/80 border border-white/10 text-[#47A248] shadow-xl backdrop-blur-md z-20 hover:border-primary-blue cursor-pointer transition-colors duration-300"
            style={{ willChange: 'transform' }}
          >
            <SiMongodb className="w-6 h-6" />
          </motion.div>

          {/* Floating JavaScript badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 1.5 }}
            whileHover={{ scale: 1.15, rotate: -5 }}
            className="absolute bottom-6 right-8 p-3 rounded-2xl bg-slate-900/80 border border-white/10 text-[#F7DF1E] shadow-xl backdrop-blur-md z-20 hover:border-primary-cyan cursor-pointer transition-colors duration-300"
            style={{ willChange: 'transform' }}
          >
            <FaJs className="w-6 h-6" />
          </motion.div>

          {/* Floating Tailwind CSS badge */}
          <motion.div
            animate={{ y: [0, -11, 0] }}
            transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut', delay: 2 }}
            whileHover={{ scale: 1.15, rotate: 8 }}
            className="absolute bottom-4 left-8 p-3 rounded-2xl bg-slate-900/80 border border-white/10 text-[#38B2AC] shadow-xl backdrop-blur-md z-20 hover:border-primary-purple cursor-pointer transition-colors duration-300"
            style={{ willChange: 'transform' }}
          >
            <SiTailwindcss className="w-6 h-6" />
          </motion.div>

          {/* Floating GitHub badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut', delay: 2.5 }}
            whileHover={{ scale: 1.15, rotate: -8 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-slate-900/80 border border-white/10 text-white shadow-xl backdrop-blur-md z-20 hover:border-primary-blue cursor-pointer transition-colors duration-300"
            style={{ willChange: 'transform' }}
          >
            <FaGithub className="w-6 h-6" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

