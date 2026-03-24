'use client'
import { useEffect, useRef } from 'react'

interface Props { color: string }

export default function CaseCanvas({ color }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width = canvas.parentElement?.offsetWidth || 400
    canvas.height = 180

    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)

    const pts = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * 180,
      vx: (Math.random() - .5) * .5,
      vy: (Math.random() - .5) * .5,
    }))

    let animId: number
    function draw() {
      ctx.clearRect(0, 0, canvas.width, 180)
      const grad = ctx.createLinearGradient(0, 0, canvas.width, 180)
      grad.addColorStop(0, `rgba(${r},${g},${b},0.08)`)
      grad.addColorStop(1, `rgba(0,0,0,0.02)`)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, 180)

      pts.forEach((p, pi) => {
        pts.forEach((q, qi) => {
          if (qi <= pi) return
          const dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy)
          if (d < 100) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - d / 100) * .4})`
            ctx.lineWidth = .7; ctx.stroke()
          }
        })
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > 180) p.vy *= -1
        ctx.beginPath(); ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = color; ctx.shadowBlur = 10; ctx.shadowColor = color; ctx.fill(); ctx.shadowBlur = 0
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [color])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '180px' }} />
}
