'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import { SERVICES } from '@/lib/data'

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), { ssr: false })
const OrbScene = dynamic(() => import('@/components/3d/OrbScene'), { ssr: false })

export default function HomePage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-canvas-wrap"><HeroScene /></div>
        <div className="scanlines" />
        <div className="hud-corner hud-tl" /><div className="hud-corner hud-tr" />
        <div className="hud-corner hud-bl" /><div className="hud-corner hud-br" />
        <div className="hero-content" style={{ animation: 'fadeUp .8s ease .5s both' }}>
          <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}`}</style>
          <span className="hero-eyebrow">// SYSTEM ONLINE — AI LAYER ACTIVE</span>
          <h1 className="hero-title glitch" data-text="Engineering Intelligent Systems for Modern Enterprises">
            Engineering Intelligent Systems<br />for Modern Enterprises
          </h1>
          <p className="hero-sub"><em>AI-powered execution.</em> Human-refined precision.</p>
          <div className="hero-btns">
            <Link href="/services"><button className="btn-primary"><span>EXPLORE MODULES</span></button></Link>
            <Link href="/contact"><button className="btn-outline">REQUEST A DEMO</button></Link>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span>SCROLL TO ENTER</span>
        </div>
      </section>

      {/* ── STATS ── */}
      <Reveal>
        <section className="stats-section">
          <div className="stats-grid">
            {[['11+','AI Modules'],['500+','Enterprises Served'],['99.97%','System Uptime'],['24/7','Human Oversight']].map(([n,l]) => (
              <div className="stat-item" key={l}>
                <span className="stat-num">{n}</span>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── SERVICES GRID ── */}
      <section style={{ padding: '120px 80px' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <span className="section-tag">// CORE MODULES</span>
            <h2 className="section-title">Intelligent Systems <span className="gradient-text">Architecture</span></h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Each service operates as an independent AI module — fully automated, continuously monitored by human experts.</p>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="services-grid">
            {SERVICES.map(s => (
              <Link href="/services" key={s.id}>
                <div className="service-card" style={{ minHeight: 260 }}
                  onMouseMove={e => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const dx = (e.clientX - rect.left - rect.width/2) / rect.width * 12
                    const dy = (e.clientY - rect.top - rect.height/2) / rect.height * 12
                    ;(e.currentTarget as HTMLElement).style.transform = `perspective(600px) rotateY(${dx}deg) rotateX(${-dy}deg)`
                  }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = '' }}
                >
                  <div className="service-card-icon" style={{ borderColor: s.color + '44' }}>
                    <span style={{ filter: `drop-shadow(0 0 6px ${s.color})` }}>{s.icon}</span>
                  </div>
                  <h3>{s.name}</h3>
                  <p>{s.desc.substring(0, 90)}...</p>
                  <div className="ai-human-badge" style={{ marginTop: 16, borderColor: s.color + '33', color: s.color }}>
                    <div className="dot dot-ai" style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
                    AI-powered
                    <div className="dot dot-human" style={{ marginLeft: 6 }} />
                    Human-observed
                  </div>
                  <div className="card-arrow">↗</div>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
        <Reveal delay={400}>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/services">
              <button className="btn-primary"><span>VIEW ALL MODULES →</span></button>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── WHY LUCENEDGE ── */}
      <section style={{ padding: '120px 80px', background: 'linear-gradient(135deg,rgba(0,102,255,0.03),rgba(124,58,237,0.03))', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <Reveal direction="left">
            <div style={{ height: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <OrbScene />
            </div>
          </Reveal>
          <Reveal direction="right">
            <div>
              <span className="section-tag">// WHY LUCENEDGE</span>
              <h2 className="section-title">Not Just AI.<br />AI <span className="gradient-text">Refined</span> by Humans.</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {[
                  { icon: '⚡', title: 'Speed of AI, Judgment of Humans', desc: 'Automated systems handle execution at machine speed, while expert humans continuously refine, monitor, and optimize every process.' },
                  { icon: '🧠', title: 'Modular Intelligence Architecture', desc: 'Each service is a standalone AI module you can deploy independently or as a unified intelligent stack tailored to your enterprise.' },
                  { icon: '🛡️', title: 'Enterprise-Grade Reliability', desc: '99.97% uptime backed by redundant AI layers and round-the-clock human observation teams ensuring zero critical failures.' },
                ].map(p => (
                  <div key={p.title} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                    <div style={{ width: 44, height: 44, flexShrink: 0, border: '1px solid var(--glass-border)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', background: 'var(--glass)' }}>{p.icon}</div>
                    <div>
                      <h4 style={{ fontSize: '.95rem', fontWeight: 700, marginBottom: 6 }}>{p.title}</h4>
                      <p style={{ fontSize: '.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <Reveal>
        <section style={{ padding: '100px 80px', textAlign: 'center', borderTop: '1px solid var(--glass-border)' }}>
          <span className="section-tag">// READY TO INTEGRATE</span>
          <h2 className="section-title">Start Building with<br /><span className="gradient-text">LucenEdge Intelligence</span></h2>
          <p className="section-sub" style={{ margin: '0 auto 40px' }}>Connect with our team and we'll architect the right AI module stack for your enterprise in 48 hours.</p>
          <Link href="/contact"><button className="btn-primary"><span>INITIATE CONTACT</span></button></Link>
        </section>
      </Reveal>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo">LUCEN<span className="edge">EDGE</span></div>
            <p>AI-first technology company engineering intelligent systems for modern enterprises. Every service is AI-powered, human-refined.</p>
          </div>
          <div className="footer-col">
            <h5>Modules</h5>
            {['OCaaS','SaaS Platform','IaaS','Automation','AI Agents'].map(l => <Link key={l} href="/services">{l}</Link>)}
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            {[['About','/about'],['Case Studies','/cases'],['Careers','/careers'],['Contact','/contact']].map(([l,h]) => (
              <Link key={l} href={h}>{l}</Link>
            ))}
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <a href="mailto:hr@headhuntersolutions.com">✉ hr@headhuntersolutions.com</a>
            <a href="tel:+916354666048">📞 +91 63546 66048</a>
            <a href="tel:+919884731607">📞 +91 98847 31607</a>
            <a href="tel:+919286469473">📞 +91 92864 69473</a>
            <span style={{ fontSize: '.82rem', color: 'var(--muted)', display: 'block', marginBottom: 10 }}>📍 Uttarakhand, India</span>
            <span style={{ fontSize: '.82rem', color: 'var(--muted)', display: 'block' }}>📍 Ahmedabad, Gujarat, India</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 LucenEdge Technologies. All rights reserved.</p>
          <div className="footer-status"><div className="status-dot" />ALL SYSTEMS OPERATIONAL</div>
        </div>
      </footer>
    </main>
  )
}
