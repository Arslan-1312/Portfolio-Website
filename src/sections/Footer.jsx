import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import MagneticButton from '../components/MagneticButton.jsx'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className="border-t border-white/5 py-12 relative z-20 bg-slate-950/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: Logo & Copyright */}
        <div className="text-center md:text-left">
          <motion.div
            onClick={handleScrollToTop}
            className="text-xl font-bold bg-gradient-to-r from-primary-cyan via-primary-blue to-primary-purple bg-clip-text text-transparent cursor-pointer inline-block mb-2 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Arslan Iqbal
          </motion.div>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            &copy; {currentYear} Arslan Iqbal. Designed & Developed with ❤️ .
          </p>
        </div>

        {/* Right Side: Social Quick Links */}
        <div className="flex items-center gap-4">
          <MagneticButton>
            <a
              href="https://github.com/arslaniqbal4666"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-primary-cyan/40 hover:bg-primary-cyan/10 transition-all duration-300"
            >
              <FaGithub className="w-4 h-4" />
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="https://linkedin.com/in/arslan-iqbal-1087092bb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-primary-blue/40 hover:bg-primary-blue/10 transition-all duration-300"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="mailto:arslaniqbal4666@gmail.com"
              aria-label="Send Email Direct"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-primary-purple/40 hover:bg-primary-purple/10 transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
            </a>
          </MagneticButton>
        </div>
      </div>
    </footer>
  )
}
