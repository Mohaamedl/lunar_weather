"use client"

import { useEffect, useRef } from "react"

export function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId
    const particles = []

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Create particles
    const createParticles = () => {
      const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 10000)

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 10 + 0.5,
          speedX: (Math.random() * 2 - 1) , 
          speedY: (Math.random() * 2 - 1) , 
          opacity: Math.random() * 0.5 + 0.2,
          color: getRandomColor(),
        });
      }
      
    }

    const getRandomColor = () => {
      const colors = [
        "rgba(110, 63, 142, 0.8)", // Purple light
        "rgba(75, 46, 103, 0.8)", // Purple medium
        "rgba(42, 26, 64, 0.8)", // Purple dark
        "rgba(255, 111, 60, 0.5)", // Orange
        "rgba(212, 93, 45, 0.5)", // Orange dark
        "rgba(255, 255, 255, 0.8)", // White (stars)
      ]

      return colors[Math.floor(Math.random() * colors.length)]
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()

        // Random twinkle effect for white stars
        if (particle.color.includes("255, 255, 255") && Math.random() < 0.005) {
          particle.opacity = Math.random() * 0.5 + 0.2
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    createParticles()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}

