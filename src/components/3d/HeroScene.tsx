'use client'
import { useEffect, useRef } from 'react'

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let W = 0, H = 0
    let animId: number
    let mx = 0, my = 0

    interface Node {
      x: number; y: number; vx: number; vy: number
      r: number; color: string; pulse: number; opacity: number
    }

    let nodes: Node[] = []

    const COLORS = ['#00f5ff', '#0066ff', '#7c3aed', '#ff0080', '#00ff88']

    function resize() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      mx = W / 2; my = H / 2
    }

    function buildNodes() {
      nodes = Array.from({ length: 100 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - .5) * .5,
        vy: (Math.random() - .5) * .5,
        r: Math.random() * 2.5 + 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.5,
      }))
    }

    function hexToRgb(hex: string) {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return { r, g, b }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)

      // Subtle bg gradient
      const grad = ctx.createRadialGradient(W * 0.3, H * 0.3, 0, W * 0.3, H * 0.3, W * 0.7)
      grad.addColorStop(0, 'rgba(0,102,255,0.04)')
      grad.addColorStop(0.5, 'rgba(124,58,237,0.02)')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      // Draw connections between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.2
            const rgb = hexToRgb(nodes[i].color)
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // Mouse connections
      nodes.forEach(n => {
        const dx = n.x - mx, dy = n.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 250) {
          const alpha = (1 - dist / 250) * 0.6
          const rgb = hexToRgb(n.color)
          ctx.beginPath()
          ctx.moveTo(n.x, n.y)
          ctx.lineTo(mx, my)
          ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      })

      // Draw nodes
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        n.pulse += 0.025
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1

        const s = Math.sin(n.pulse) * 0.6 + 1.2
        const rgb = hexToRgb(n.color)

        // Outer glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * s * 8)
        grd.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},0.3)`)
        grd.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`)
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * s * 8, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * s, 0, Math.PI * 2)
        ctx.fillStyle = n.color
        ctx.shadowBlur = 15
        ctx.shadowColor = n.color
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Mouse dot
      ctx.beginPath()
      ctx.arc(mx, my, 4, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(0,245,255,0.6)'
      ctx.shadowBlur = 20
      ctx.shadowColor = '#00f5ff'
      ctx.fill()
      ctx.shadowBlur = 0

      animId = requestAnimationFrame(draw)
    }

    resize()
    buildNodes()
    window.addEventListener('resize', () => { resize(); buildNodes() })
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY })
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
}
