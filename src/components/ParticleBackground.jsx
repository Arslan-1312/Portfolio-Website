import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles = []
    const colors = []

    const updateColors = () => {
      const style = getComputedStyle(document.documentElement)
      colors[0] = style.getPropertyValue('--particle-color-1').trim() || 'rgba(59, 130, 246, 0.12)'
      colors[1] = style.getPropertyValue('--particle-color-2').trim() || 'rgba(139, 92, 246, 0.12)'
      colors[2] = style.getPropertyValue('--particle-color-3').trim() || 'rgba(6, 182, 212, 0.12)'
      
      // Update colors of already created particles
      particles.forEach((p) => {
        p.color = colors[Math.floor(Math.random() * colors.length)]
      })
    }

    const createParticles = () => {
      const density = Math.floor((width * height) / 18000)
      const count = Math.min(Math.max(density, 20), 50)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: colors[Math.floor(Math.random() * colors.length)] || 'rgba(59, 130, 246, 0.12)',
        })
      }
    }

    createParticles()
    updateColors()

    // Observe changes on html element to update colors dynamically on theme switch
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateColors()
        }
      })
    })
    observer.observe(document.documentElement, { attributes: true })

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        if (!canvas) return
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
        particles.length = 0
        createParticles()
        updateColors()
      }, 200)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ willChange: 'transform' }}
    />
  )
}
