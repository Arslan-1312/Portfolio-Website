import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection.js'

const navItems = [
  { id: 'home',           label: 'Home'          },
  { id: 'about',          label: 'About'         },
  { id: 'skills',         label: 'Skills'        },
  { id: 'experience',     label: 'Experience'    },
  { id: 'projects',       label: 'Projects'      },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact',        label: 'Contact'       },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const activeSection = useActiveSection(navItems.map((item) => item.id))

  // Read saved theme preference from localStorage, default to dark
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark'
    }
    return 'dark'
  })

  // Apply dark class to <html> whenever theme changes
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

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  // Smooth scroll to section with 80px top offset so the fixed header doesn't cover it
  const handleScroll = (id) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const bodyRect    = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      window.scrollTo({ top: elementRect - bodyRect - offset, behavior: 'smooth' })
    }
  }

  // Stagger configuration for mobile menu items cascading in
  const mobileMenuVariants = {
    hidden:  { opacity: 0, y: -16 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
    exit:    { opacity: 0, y: -12, transition: { duration: 0.18, ease: 'easeInOut' } },
  }

  const mobileContainerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
    exit:    { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-4">
      {/* Pill-shaped glass navbar */}
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20">

        {/* Logo slides in from the left on page load */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="text-xl font-bold bg-gradient-to-r from-primary-blue via-primary-purple to-primary-cyan bg-clip-text text-transparent cursor-pointer hover:scale-[1.03] transition-transform duration-200"
          onClick={() => handleScroll('home')}
        >
          Arslan Iqbal
        </motion.div>

        {/* Desktop nav links + theme toggle */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="hidden md:flex items-center space-x-4"
        >
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
                    {/* Active pill indicator slides across links using shared layoutId */}
                    {isActive && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute inset-0 rounded-full bg-white/5 border border-white/10 z-[-1]"
                        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                      />
                    )}
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Theme toggle button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-primary-cyan/40 hover:bg-primary-cyan/10 transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark'
              ? <Sun  className="w-4 h-4 text-primary-cyan" />
              : <Moon className="w-4 h-4 text-primary-blue" />
            }
          </motion.button>
        </motion.div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-primary-cyan/40 hover:bg-primary-cyan/10 transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'dark'
              ? <Sun  className="w-4 h-4 text-primary-cyan" />
              : <Moon className="w-4 h-4 text-primary-blue" />
            }
          </button>

          {/* Hamburger icon flips between Menu and X using a spring */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.88 }}
            className="text-slate-300 hover:text-white focus:outline-none p-1"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen
                ? <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <X className="w-6 h-6" />
                  </motion.span>
                : <motion.span key="open"  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Menu className="w-6 h-6" />
                  </motion.span>
              }
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Drawer: staggered list drops in */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,    scale: 1    }}
            exit={{    opacity: 0, y: -16,   scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            className="absolute top-20 left-4 right-4 p-6 rounded-3xl bg-slate-900/90 backdrop-blur-lg border border-white/10 flex flex-col space-y-2 shadow-2xl z-50 md:hidden"
          >
            <motion.ul
              variants={mobileContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col space-y-2"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <motion.li key={item.id} variants={mobileMenuVariants}>
                    <button
                      onClick={() => handleScroll(item.id)}
                      className={`w-full py-2.5 text-center text-base font-semibold rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 border border-primary-purple/30 text-white'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                )
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
