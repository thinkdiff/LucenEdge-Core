'use client'
import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import { JOBS } from '@/lib/data'

const PERKS = [
  { icon: '🧠', title: 'AI-First Culture', desc: 'Every process, tool, and decision at LucenEdge is AI-augmented. You\'ll work at the bleeding edge of applied AI.' },
  { icon: '🌐', title: 'Remote-Native', desc: 'Fully distributed team across 12 countries. Async-first with synchronous collaboration windows that actually work.' },
  { icon: '📈', title: 'Equity & Growth', desc: 'Meaningful equity packages, aggressive performance bonuses, and a clear path to senior and principal roles.' },
  { icon: '🔬', title: 'R&D Time', desc: '20% of your time is dedicated to exploration and innovation. Some of our best features came from this unstructured time.' },
  { icon: '🛡️', title: 'Top-Tier Benefits', desc: 'Premium health, dental, vision. Mental health stipend. $5,000 annual learning budget. High-spec hardware.' },
  { icon: '⚡', title: 'High Agency', desc: 'No micromanagement. You own your domain. Decisions are made by the people closest to the problem.' },
]

export default function CareersClient() {
  return (
    <main style={{ paddingTop: 72 }}>
      {/* HERO */}
      <section style={{ padding: '80px 80px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Animated grid background */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'linear-gradient(rgba(0,245,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.03) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <span className="section-tag">// RECRUITMENT PROTOCOL</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>
              Build the Future of<br /><span className="gradient-text">Intelligent Systems</span>
            </h1>
            <p className="section-sub" style={{ margin: '20px auto 0' }}>
              Join a team of engineers, researchers, and operators pushing the frontier of AI-human hybrid systems.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 40 }}>
              <button className="btn-primary" onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}>
                <span>VIEW OPEN POSITIONS</span>
              </button>
              <Link href="/contact"><button className="btn-outline">INTRODUCE YOURSELF</button></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <Reveal>
        <section style={{ padding: '0 80px 60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'var(--glass-border)', border: '1px solid var(--glass-border)' }}>
            {[['42','Team Members'],['12','Countries'],['4.9★','Glassdoor Rating'],['100%','Remote Options']].map(([v,l]) => (
              <div key={l} style={{ background: 'var(--bg2)', padding: '40px 32px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: '2rem', fontWeight: 900, background: 'linear-gradient(135deg,var(--cyan),var(--violet))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v}</div>
                <div style={{ fontSize: '.78rem', color: 'var(--muted)', marginTop: 8, letterSpacing: '.1em', textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* PERKS */}
      <section style={{ padding: '0 80px 80px' }}>
        <Reveal>
          <span className="section-tag">// OPERATOR BENEFITS</span>
          <h2 className="section-title">Why Build Here</h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginTop: 48 }}>
          {PERKS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="perk-card">
                <div className="perk-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CULTURE BAND */}
      <Reveal>
        <section style={{ padding: '80px', background: 'linear-gradient(135deg,rgba(0,102,255,0.04),rgba(124,58,237,0.04))', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <span className="section-tag">// ENGINEERING CULTURE</span>
              <h2 className="section-title">We Build Systems<br /><span className="gradient-text">That Think</span></h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 24 }}>
                LucenEdge isn't a typical tech company. We operate more like a research lab crossed with a mission-critical ops center. Every engineer here works on systems that impact thousands of enterprise users daily.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 32 }}>
                You'll work with the latest AI models, build production-grade infrastructure that handles billions of events, and have real ownership over systems that matter.
              </p>
              <div className="ai-human-badge">
                <div className="dot dot-ai" />
                AI-augmented workflows
                <div className="dot dot-human" style={{ marginLeft: 8 }} />
                Human-driven decisions
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { label: 'Avg. Eng Experience', val: '8+ years' },
                { label: 'PhD & Research Backgrounds', val: '35%' },
                { label: 'Open Source Contributions', val: '60%' },
                { label: 'Internal AI Tool Usage', val: '100%' },
              ].map(s => (
                <div key={s.label} style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: 4, padding: '24px 20px' }}>
                  <div style={{ fontFamily: "'Orbitron',monospace", fontSize: '1.4rem', fontWeight: 900, background: 'linear-gradient(135deg,var(--cyan),var(--blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.val}</div>
                  <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: 8, letterSpacing: '.08em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* OPEN POSITIONS */}
      <section id="openings" style={{ padding: '80px' }}>
        <Reveal>
          <span className="section-tag">// OPEN POSITIONS</span>
          <h2 className="section-title">Active <span className="gradient-text">Deployments</span></h2>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--glass-border)', marginTop: 48, border: '1px solid var(--glass-border)' }}>
          {JOBS.map((j, i) => (
            <Reveal key={j.title} delay={i * 60}>
              <div
                className="job-row"
                onClick={() => window.location.href = '/contact'}
                style={{ cursor: 'pointer' }}
              >
                <div>
                  <div className="job-title">{j.title}</div>
                  <div className="job-dept">{j.dept}</div>
                </div>
                <span className="job-type">{j.type}</span>
                <span style={{ color: 'var(--cyan)', fontSize: '1.2rem', transition: 'transform .2s' }}>→</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div style={{ marginTop: 32, padding: '24px 40px', background: 'var(--glass)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Don't see your role?</div>
              <div style={{ fontSize: '.85rem', color: 'var(--muted)' }}>We're always looking for exceptional humans to join the intelligence layer.</div>
            </div>
            <Link href="/contact"><button className="btn-outline">INTRODUCE YOURSELF →</button></Link>
          </div>
        </Reveal>
      </section>

      {/* INTERVIEW PROCESS */}
      <Reveal>
        <section style={{ padding: '80px', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,245,255,0.01)' }}>
          <span className="section-tag">// SELECTION PROTOCOL</span>
          <h2 className="section-title">The Interview <span className="gradient-text">Process</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, marginTop: 48 }}>
            {[
              { num: '01', title: 'Signal', desc: 'Submit your application or introduce yourself. We review every submission within 48 hours.' },
              { num: '02', title: 'Screen', desc: '30-minute call with an engineer. No trick questions — we want to understand how you think.' },
              { num: '03', title: 'Build', desc: 'A realistic take-home challenge. Paid for your time. Real problem, real context.' },
              { num: '04', title: 'Deploy', desc: 'Final conversation with the team. Meet who you\'ll work with. We move fast — offer within a week.' },
            ].map(step => (
              <div key={step.num} style={{ padding: '32px 24px', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: 4, position: 'relative' }}>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: '2.5rem', fontWeight: 900, color: 'rgba(0,245,255,0.08)', position: 'absolute', top: 16, right: 20 }}>{step.num}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.68rem', color: 'var(--cyan)', letterSpacing: '.2em', marginBottom: 12 }}>STEP {step.num}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: '.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo">LUCEN<span className="edge">EDGE</span></div>
            <p>Join us in building intelligent systems that define the next era of enterprise technology.</p>
          </div>
          <div className="footer-col">
            <h5>Explore</h5>
            {[['Services','/services'],['About','/about'],['Case Studies','/cases'],['Contact','/contact']].map(([l,h]) => (
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
