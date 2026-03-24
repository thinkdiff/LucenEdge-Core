'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import { TIMELINE } from '@/lib/data'

const OrbScene = dynamic(() => import('@/components/3d/OrbScene'), { ssr: false })

const TEAM = [
  { name: 'Aryan Mehra', role: 'Founder & Chief AI Architect', emoji: '👤' },
  { name: 'Priya Sharma', role: 'Head of AI Operations', emoji: '👤' },
  { name: 'Daniel Koh', role: 'VP of Infrastructure', emoji: '👤' },
  { name: 'Lena Vasquez', role: 'Director of Human Oversight', emoji: '👤' },
  { name: 'Rohan Patel', role: 'Lead AI Engineer', emoji: '👤' },
  { name: 'Sarah Chen', role: 'Head of Product', emoji: '👤' },
]

export default function AboutClient() {
  return (
    <main style={{ paddingTop: 72 }}>
      {/* HERO */}
      <section style={{ padding: '80px 80px 40px', textAlign: 'center' }}>
        <Reveal>
          <span className="section-tag">// ORIGIN PROTOCOL</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>
            The Evolution of<br /><span className="gradient-text">Intelligent Systems</span>
          </h1>
          <p className="section-sub" style={{ margin: '20px auto 0' }}>
            LucenEdge was built on a singular belief: that the future of enterprise belongs to those who harness AI without losing the irreplaceable clarity of human judgment.
          </p>
        </Reveal>
      </section>

      {/* STATS */}
      <Reveal>
        <section style={{ padding: '0 80px 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--glass-border)', border: '1px solid var(--glass-border)' }}>
            {[['2019','FOUNDED'],['42','TEAM MEMBERS'],['11','AI MODULES']].map(([n, l], i) => {
              const colors = [
                'linear-gradient(135deg,var(--cyan),var(--blue))',
                'linear-gradient(135deg,var(--blue),var(--violet))',
                'linear-gradient(135deg,var(--violet),var(--pink))',
              ]
              return (
                <div key={l} style={{ background: 'var(--bg2)', padding: '48px 40px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Orbitron',monospace", fontSize: '2.5rem', fontWeight: 900, background: colors[i], WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{n}</div>
                  <div style={{ fontSize: '.8rem', color: 'var(--muted)', marginTop: 8, letterSpacing: '.1em' }}>{l}</div>
                </div>
              )
            })}
          </div>
        </section>
      </Reveal>

      {/* ORBS + MISSION */}
      <section style={{ padding: '0 80px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: 80 }}>
        <Reveal direction="left">
          <OrbScene />
        </Reveal>
        <Reveal direction="right">
          <span className="section-tag">// MISSION STATEMENT</span>
          <h2 className="section-title">Intelligence That<br /><span className="gradient-text">Never Sleeps</span></h2>
          <p style={{ color: 'var(--muted)', fontSize: '.95rem', lineHeight: 1.8, marginBottom: 24 }}>
            We believe that the most powerful business systems are those where AI handles the volume, speed, and complexity — while human experts provide the judgment, context, and strategic thinking machines can't replicate.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '.95rem', lineHeight: 1.8, marginBottom: 32 }}>
            Every LucenEdge module is designed to this principle: AI-first execution, human-refined outcomes. Not automation that replaces humans — but intelligence that amplifies them.
          </p>
          <div className="ai-human-badge" style={{ padding: '10px 20px', fontSize: '.72rem' }}>
            <div className="dot dot-ai" />
            AI Execution Layer
            <div style={{ width: 1, height: 16, background: 'var(--glass-border)', margin: '0 8px' }} />
            <div className="dot dot-human" />
            Human Intelligence Layer
          </div>
        </Reveal>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: '80px', background: 'rgba(0,102,255,0.02)', borderTop: '1px solid var(--glass-border)' }}>
        <Reveal>
          <span className="section-tag" style={{ textAlign: 'center', display: 'block', marginBottom: 48 }}>// SYSTEM EVOLUTION TIMELINE</span>
        </Reveal>
        <div className="timeline-track">
          {TIMELINE.map((item, i) => (
            <Reveal key={item.year} delay={i * 100}>
              <div className="tl-item">
                <div className="tl-content" style={{ gridColumn: i % 2 === 0 ? 1 : 2 }}>
                  <span className="tl-year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: '80px' }}>
        <Reveal>
          <span className="section-tag">// INTELLIGENCE OPERATORS</span>
          <h2 className="section-title">The Humans Behind<br /><span className="gradient-text">the Machine</span></h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 24, marginTop: 48 }}>
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 80}>
              <div
                className="team-card"
                onMouseMove={e => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const dx = (e.clientX - rect.left - rect.width/2) / rect.width * 14
                  const dy = (e.clientY - rect.top - rect.height/2) / rect.height * 14
                  e.currentTarget.style.transform = `perspective(600px) rotateY(${dx}deg) rotateX(${-dy}deg) translateY(-8px)`
                }}
                onMouseLeave={e => { e.currentTarget.style.transform = '' }}
              >
                <div className="team-avatar">{m.emoji}</div>
                <h4>{m.name}</h4>
                <p>{m.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <Reveal>
        <section style={{ padding: '80px', borderTop: '1px solid var(--glass-border)', background: 'linear-gradient(135deg,rgba(124,58,237,0.03),rgba(0,102,255,0.03))' }}>
          <span className="section-tag">// CORE PROTOCOLS</span>
          <h2 className="section-title">What We <span className="gradient-text">Stand For</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 24, marginTop: 48 }}>
            {[
              { icon: '🔬', title: 'Precision Over Volume', desc: 'We build AI systems that are exactly right for your context, not generic solutions retrofitted to your problems.' },
              { icon: '🤝', title: 'Human-AI Partnership', desc: 'Technology without human wisdom is just noise. Every module pairs AI capability with expert human oversight.' },
              { icon: '📐', title: 'Architect-Grade Thinking', desc: 'We design systems for the decade ahead, not the quarter ahead. Scalability and adaptability are non-negotiable.' },
              { icon: '🌐', title: 'Global, Remote-First', desc: 'Intelligence doesn\'t have borders. Our team operates across 12 countries, bringing global perspective to every client.' },
            ].map(v => (
              <div key={v.title} className="perk-card">
                <div className="perk-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo">LUCEN<span className="edge">EDGE</span></div>
            <p>AI-powered execution. Human-refined precision. Built for the modern enterprise.</p>
          </div>
          <div className="footer-col">
            <h5>Explore</h5>
            {[['Services','/services'],['Case Studies','/cases'],['Careers','/careers'],['Contact','/contact']].map(([l,h]) => (
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
