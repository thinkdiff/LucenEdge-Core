'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import { SERVICES } from '@/lib/data'

const ServiceScene = dynamic(() => import('@/components/3d/ServiceScene'), { ssr: false })

export default function ServicesClient() {
  return (
    <main style={{ paddingTop: 72 }}>
      {/* HERO */}
      <section style={{ padding: '80px 80px 60px', textAlign: 'center' }}>
        <Reveal>
          <span className="section-tag">// AI MODULE ARCHITECTURE</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>
            Every Service is an<br /><span className="gradient-text">Intelligent Module</span>
          </h1>
          <p className="section-sub" style={{ margin: '20px auto 0' }}>
            AI-powered execution on every layer. Human experts monitoring every signal. Always.
          </p>
        </Reveal>
      </section>

      {/* AI+HUMAN banner */}
      <Reveal>
        <div style={{
          margin: '0 80px 60px',
          padding: '20px 32px',
          background: 'rgba(0,245,255,0.04)',
          border: '1px solid rgba(0,245,255,0.15)',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="dot dot-ai" style={{ width: 10, height: 10 }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.72rem', color: 'var(--cyan)', letterSpacing: '.2em' }}>
              AI LAYER: ACTIVE
            </span>
          </div>
          <div style={{ width: 1, height: 24, background: 'var(--glass-border)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="dot dot-human" style={{ width: 10, height: 10 }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.72rem', color: 'var(--green)', letterSpacing: '.2em' }}>
              HUMAN OVERSIGHT: 24/7
            </span>
          </div>
          <div style={{ marginLeft: 'auto', fontFamily: "'JetBrains Mono',monospace", fontSize: '.68rem', color: 'var(--muted)', letterSpacing: '.15em' }}>
            ALL 11 MODULES OPERATIONAL
          </div>
        </div>
      </Reveal>

      {/* SERVICE DETAIL ROWS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--glass-border)', margin: '0 80px 80px', border: '1px solid var(--glass-border)' }}>
        {SERVICES.map((s, i) => (
          <div
            key={s.id}
            className="service-detail-row"
            style={{ '--accent': s.color } as React.CSSProperties}
          >
            {/* Content */}
            <div className="sdrow-content">
              <Reveal direction={i % 2 === 0 ? 'left' : 'right'} delay={100}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.7rem', color: 'var(--muted)', letterSpacing: '.3em' }}>
                  MODULE {s.num}
                </div>
                <div className="module-tag" style={{ borderColor: s.color + '44', color: s.color }}>
                  <div className="module-dot" style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
                  {s.short}
                </div>
                <h2 style={{
                  fontFamily: "'Orbitron',monospace", fontSize: 'clamp(1.2rem,2vw,1.7rem)', fontWeight: 900, lineHeight: 1.2,
                  background: `linear-gradient(135deg,#fff,${s.color})`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>
                  {s.name}
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '.88rem', lineHeight: 1.7, maxWidth: 440 }}>{s.desc}</p>
                <p style={{ fontSize: '.78rem', color: s.color, opacity: .7, fontStyle: 'italic' }}>{s.theme}</p>
                <div className="ai-human-badge" style={{ borderColor: s.color + '33', color: s.color }}>
                  <div className="dot dot-ai" style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
                  AI-supported
                  <div className="dot dot-human" style={{ marginLeft: 6 }} />
                  + constant human observation
                </div>
                <Link href="/contact">
                  <button
                    className="btn-outline"
                    style={{ borderColor: s.color + '55', color: s.color, marginTop: 4 }}
                    onMouseOver={e => (e.currentTarget.style.boxShadow = `0 0 20px ${s.color}44`)}
                    onMouseOut={e => (e.currentTarget.style.boxShadow = 'none')}
                  >
                    ACTIVATE MODULE →
                  </button>
                </Link>
              </Reveal>
            </div>

            {/* 3D Visual */}
            <div className="sdrow-visual" style={{ background: `radial-gradient(ellipse at center,${s.color}08 0%,transparent 70%)`, minHeight: 420 }}>
              <ServiceScene color={s.color} visual={s.visual} />
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Reveal>
        <section style={{ padding: '80px', textAlign: 'center', borderTop: '1px solid var(--glass-border)' }}>
          <span className="section-tag">// READY TO DEPLOY</span>
          <h2 className="section-title">Build Your<br /><span className="gradient-text">Intelligence Stack</span></h2>
          <p className="section-sub" style={{ margin: '0 auto 40px' }}>
            Mix and match modules or deploy the full stack. Our architects will design the right configuration for your enterprise.
          </p>
          <Link href="/contact"><button className="btn-primary"><span>INITIATE CONTACT →</span></button></Link>
        </section>
      </Reveal>

      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo">LUCEN<span className="edge">EDGE</span></div>
            <p>Every service is AI-powered, human-refined. Engineering intelligent systems for modern enterprises.</p>
          </div>
          <div className="footer-col">
            <h5>Navigation</h5>
            {[['Home','/'],['About','/about'],['Case Studies','/cases'],['Contact','/contact']].map(([l,h]) => (
              <Link key={l} href={h}>{l}</Link>
            ))}
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <a href="mailto:hr@headhuntersolutions.com">✉ hr@headhuntersolutions.com</a>
            <a href="tel:+916354666048">📞 +91 63546 66048</a>
            <a href="tel:+919884731607">📞 +91 98847 31607</a>
            <a href="tel:+919286469473">📞 +91 92864 69473</a>
            <span style={{ display: 'block', fontSize: '.82rem', color: 'var(--muted)', marginBottom: 10 }}>📍 Uttarakhand, India</span>
            <span style={{ display: 'block', fontSize: '.82rem', color: 'var(--muted)' }}>📍 Ahmedabad, Gujarat, India</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 LucenEdge Technologies.</p>
          <div className="footer-status"><div className="status-dot" />ALL SYSTEMS OPERATIONAL</div>
        </div>
      </footer>
    </main>
  )
}
