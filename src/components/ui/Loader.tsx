'use client'
import { useEffect, useState } from 'react'

const BOOT_LINES = [
  'INITIALIZING AI SYSTEMS...',
  'LOADING NEURAL NETWORKS...',
  'ESTABLISHING HUMAN OVERSIGHT...',
  'ALL 11 MODULES ONLINE',
]

export default function Loader() {
  const [hidden, setHidden] = useState(false)
  const [line, setLine] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setLine(l => Math.min(l + 1, BOOT_LINES.length - 1)), 600)
    const timer = setTimeout(() => setHidden(true), 2600)
    return () => { clearInterval(interval); clearTimeout(timer) }
  }, [])

  return (
    <div id="loader" className={hidden ? 'hidden' : ''}>
      <div className="loader-logo">LUCEN<span style={{ color: 'var(--violet)', WebkitTextFillColor: 'var(--violet)' }}>EDGE</span></div>
      <div className="loader-bar-wrap"><div className="loader-bar" /></div>
      <div className="loader-status">{BOOT_LINES[line]}</div>
    </div>
  )
}
