import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection.js'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const activeSection = useActiveSection(navItems.map((item) => item.id))

  // Manage dark/light theme state
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const handleScroll = (id) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-4">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold bg-gradient-to-r from-primary-blue via-primary-purple to-primary-cyan bg-clip-text text-transparent cursor-pointer"
          onClick={() => handleScroll('home')}
        >
          Arslan Iqbal
        </motion.div>

        {/* Desktop Menu & Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <ul className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <li key={item.id} className="relative">
                  <button
                    onClick={() => handleScroll(item.id)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute inset-0 rounded-full bg-white/5 border border-white/10 z-[-1]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-primary-cyan/40 hover:bg-primary-cyan/10 transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-primary-cyan" />
            ) : (
              <Moon className="w-4 h-4 text-primary-blue" />
            )}
          </button>
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-primary-cyan/40 hover:bg-primary-cyan/10 transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-primary-cyan" />
            ) : (
              <Moon className="w-4 h-4 text-primary-blue" />
            )}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-300 hover:text-white focus:outline-none p-1"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 p-6 rounded-3xl bg-slate-900/90 backdrop-blur-lg border border-white/10 flex flex-col space-y-4 shadow-2xl z-50 md:hidden"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleScroll(item.id)}
                  className={`w-full py-2.5 text-center text-base font-semibold rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 border border-primary-purple/30 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
