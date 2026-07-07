import { useState, useEffect, useRef, useCallback } from 'react'

export function useActiveSection(sectionIds, offset = 150) {
  const [activeSection, setActiveSection] = useState('')
  const ticking = useRef(false)

  const handleScroll = useCallback(() => {
    if (ticking.current) return
    ticking.current = true

    requestAnimationFrame(() => {
      const scrollPosition = window.scrollY + offset

      for (const sectionId of sectionIds) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection((prev) => (prev === sectionId ? prev : sectionId))
            break
          }
        }
      }
      ticking.current = false
    })
  }, [sectionIds, offset])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return activeSection
}
