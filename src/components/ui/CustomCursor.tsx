'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  let rx = 0, ry = 0

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    const onMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
      rx += (e.clientX - rx) * 0.12
      ry += (e.clientY - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
    }

    const onEnter = () => { cursor.classList.add('hovering'); ring.classList.add('hovering') }
    const onLeave = () => { cursor.classList.remove('hovering'); ring.classList.remove('hovering') }

    let animId: number
    const animRing = () => {
      rx += (parseFloat(cursor.style.left || '0') - rx) * 0.12
      ry += (parseFloat(cursor.style.top || '0') - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      animId = requestAnimationFrame(animRing)
    }
    animId = requestAnimationFrame(animRing)

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a,button,[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}
