"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/hooks/use-theme"

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      hue: number
    }> = []

    const particleCount = 120

    for (let i = 0; i < particleCount; i++) {
      const colorType = Math.random()
      let hue
      if (colorType < 0.33) {
        hue = 200 // Cyan
      } else if (colorType < 0.66) {
        hue = 280 // Purple
      } else {
        hue = 145 // Neon green
      }

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.7,
        speedY: (Math.random() - 0.5) * 0.7,
        opacity: Math.random() * 0.4 + 0.3,
        hue,
      })
    }

    let animationFrameId: number

    function animate() {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = theme === "dark"

      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)

        // Theme-aware particle colors
        if (isDark) {
          ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`
        } else {
          ctx.fillStyle = `hsla(${particle.hue}, 60%, 50%, ${particle.opacity * 0.7})`
        }
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity * 0.5})`
      })

      // Draw connections
      particles.forEach((particleA, indexA) => {
        particles.slice(indexA + 1).forEach((particleB) => {
          const dx = particleA.x - particleB.x
          const dy = particleA.y - particleB.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            const avgHue = (particleA.hue + particleB.hue) / 2
            const opacity = isDark ? 0.15 : 0.1
            ctx.strokeStyle = `hsla(${avgHue}, 70%, 60%, ${opacity * (1 - distance / 120)})`
            ctx.lineWidth = 1
            ctx.moveTo(particleA.x, particleA.y)
            ctx.lineTo(particleB.x, particleB.y)
            ctx.stroke()
          }
        })
      })

      ctx.shadowBlur = 0

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" aria-hidden="true" />
}
