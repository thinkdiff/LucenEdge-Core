'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/cases', label: 'Case Studies' },
  { href: '/careers', label: 'Careers' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <Link href="/" className="nav-logo">LUCEN<span className="edge">EDGE</span></Link>
      <div className="nav-links">
        {LINKS.map(l => (
          <Link key={l.href} href={l.href} className={`nav-link${pathname === l.href ? ' active' : ''}`}>
            {l.label}
          </Link>
        ))}
        <Link href="/contact" className="nav-link nav-cta">GET IN TOUCH</Link>
      </div>
    </nav>
  )
}
