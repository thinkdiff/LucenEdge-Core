'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import { CASES } from '@/lib/data'

const CaseCanvas = dynamic(() => import('@/components/3d/CaseCanvas'), { ssr: false })

export default function CasesClient() {
  return (
    <main style={{ paddingTop: 72 }}>
      {/* HERO */}
      <section style={{ padding: '80px 80px 60px', textAlign: 'center' }}>
        <Reveal>
          <span className="section-tag">// TRANSFORMATION RECORDS</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>
            Intelligence in<br /><span className="gradient-text">Action</span>
          </h1>
          <p className="section-sub" style={{ margin: '20px auto 0' }}>
            Real enterprises. Real results. Documented transformations powered by LucenEdge AI modules.
          </p>
        </Reveal>
      </section>

      {/* METRICS BAND */}
      <Reveal>
        <div style={{ margin: '0 80px 60px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'var(--glass-border)', border: '1px solid var(--glass-border)' }}>
          {[['$50M+','Client Revenue Generated'],['94%','Avg Automation Rate'],['3.2×','Avg Revenue Multiple'],['100%','Client Retention']].map(([v,l]) => (
            <div key={l} style={{ background: 'var(--bg2)', padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: '1.8rem', fontWeight: 900, background: 'linear-gradient(135deg,var(--cyan),var(--green))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v}</div>
              <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: 8, letterSpacing: '.1em', textTransform: 'uppercase' }}>{l}</div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* CASE CARDS */}
      <section style={{ padding: '0 80px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 24 }}>
          {CASES.map((c, i) => (
            <Reveal key={i} delay={i * 100}>
              <div
                className="case-card"
                onMouseMove={e => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const dx = (e.clientX - rect.left - rect.width/2) / rect.width * 10
                  const dy = (e.clientY - rect.top - rect.height/2) / rect.height * 10
                  e.currentTarget.style.transform = `perspective(1000px) rotateY(${dx}deg) rotateX(${-dy}deg) translateY(-8px)`
                  e.currentTarget.style.boxShadow = `0 0 30px ${c.color}33`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.boxShadow = ''
                }}
              >
                <div className="case-card-header" style={{ background: `radial-gradient(ellipse at center,${c.color}12 0%,transparent 70%)` }}>
                  <CaseCanvas color={c.color} />
                  {/* Overlay label */}
                  <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 2, display: 'flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(2,4,8,0.8)', border: `1px solid ${c.color}44`, borderRadius: 100 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.color, boxShadow: `0 0 8px ${c.color}` }} />
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.6rem', color: c.color, letterSpacing: '.15em' }}>CASE STUDY</span>
                  </div>
                </div>
                <div className="case-card-body">
                  <div className="case-tag">{c.tag}</div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <div className="case-metric">
                    {c.metrics.map(m => (
                      <div key={m.l} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <div className="metric-val" style={{ background: `linear-gradient(135deg,${c.color},var(--green))`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{m.v}</div>
                        <div className="metric-lbl">{m.l}</div>
                      </div>
                    ))}
                    <div style={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.65rem', color: c.color, cursor: 'pointer', letterSpacing: '.1em' }}>READ MORE →</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED QUOTE */}
      <Reveal>
        <section style={{ padding: '80px', background: 'linear-gradient(135deg,rgba(0,102,255,0.04),rgba(124,58,237,0.04))', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ fontSize: '3rem', color: 'var(--cyan)', fontFamily: "'Orbitron',monospace", marginBottom: 24 }}>"</div>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text)', marginBottom: 32 }}>
              LucenEdge didn't just deliver a product. They architected a living system that thinks alongside our team. It's the closest thing to having an AI co-founder on the team.
            </p>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.72rem', color: 'var(--cyan)', letterSpacing: '.2em' }}>— CTO, Global Fintech Platform</div>
          </div>
        </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section style={{ padding: '80px', textAlign: 'center', borderTop: '1px solid var(--glass-border)' }}>
          <span className="section-tag">// YOUR TRANSFORMATION AWAITS</span>
          <h2 className="section-title">Ready to Become<br /><span className="gradient-text">a Case Study?</span></h2>
          <p className="section-sub" style={{ margin: '0 auto 40px' }}>Join 500+ enterprises that have deployed LucenEdge AI modules to transform their operations.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link href="/contact"><button className="btn-primary"><span>START YOUR TRANSFORMATION →</span></button></Link>
            <Link href="/services"><button className="btn-outline">EXPLORE MODULES</button></Link>
          </div>
        </section>
      </Reveal>

      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo">LUCEN<span className="edge">EDGE</span></div>
            <p>AI-powered execution. Human-refined precision.</p>
          </div>
          <div className="footer-col">
            <h5>Explore</h5>
            {[['Services','/services'],['About','/about'],['Contact','/contact']].map(([l,h]) => (
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
