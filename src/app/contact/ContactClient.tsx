'use client'
import { useState } from 'react'
import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwmYDf0Lb6-3rodbqf-QVZj59XuznmwwhJ9eHVJLgWSc_Al9nYrlv6XRb0HjZvolvlVlw/exec'

const MODULES = [
  'OpenClaw-as-a-Service (OCaaS)', 'SaaS Platform Engineering', 'Infrastructure-as-a-Service (IaaS)',
  'Automation-as-a-Service', 'Custom Development', 'AI Agent Building',
  'AI Agent-as-a-Service', 'AI Integration for Legacy Software', 'HR & Staffing Solutions',
  'Compliance & Business Services', 'AI-enabled Digital Marketing', 'Full Stack (All Modules)',
]

export default function ContactClient() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', company: '', module: '', message: '' })
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; msg: string }>({ type: 'idle', msg: '' })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.firstName || !form.lastName || !form.email || !form.company) {
      setStatus({ type: 'error', msg: '✘ PLEASE FILL ALL REQUIRED FIELDS' }); return
    }
    setStatus({ type: 'loading', msg: '◎ Establishing secure channel...' })
    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus({ type: 'success', msg: '✓ REQUEST TRANSMITTED SUCCESSFULLY' })
      setForm({ firstName: '', lastName: '', email: '', company: '', module: '', message: '' })
      setTimeout(() => setStatus({ type: 'idle', msg: '' }), 4000)
    } catch {
      setStatus({ type: 'error', msg: '✘ TRANSMISSION FAILED — Please contact us directly.' })
    }
  }

  return (
    <main style={{ paddingTop: 72 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, padding: '80px', minHeight: 'calc(100vh - 72px)', alignItems: 'center' }}>

        {/* LEFT: INFO */}
        <Reveal direction="left">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <div>
              <span className="section-tag">// OPEN CHANNEL</span>
              <h1 className="section-title" style={{ fontFamily: "'Orbitron',monospace" }}>
                Initiate<br /><span className="gradient-text">Contact Protocol</span>
              </h1>
              <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginTop: 16 }}>
                Connect with our intelligence architects. We'll design a custom AI module stack for your enterprise within 48 hours.
              </p>
            </div>

            {/* Terminal */}
            <div className="terminal-block">
              <div className="terminal-topbar">
                <div className="terminal-dot" style={{ background: '#ff5f57' }} />
                <div className="terminal-dot" style={{ background: '#febc2e' }} />
                <div className="terminal-dot" style={{ background: '#28c840' }} />
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.65rem', color: 'var(--muted)', letterSpacing: '.1em', marginLeft: 8 }}>lucenedge — terminal v2.4.1</span>
              </div>
              <div className="terminal-body">
                {[
                  { prompt: true, cmd: 'ping lucenedge.ai' },
                  { out: 'PONG — Response time: 1ms', green: true },
                  { prompt: true, cmd: 'status --all-modules' },
                  { out: '✓ All 11 modules operational', green: true },
                  { prompt: true, cmd: 'ai --layer human-oversight' },
                  { out: '✓ Human team active: 42 operators online', green: true },
                  { prompt: true, cmd: 'connect --enterprise' },
                  { out: 'Awaiting secure channel...', green: false },
                  { cursor: true },
                ].map((line, i) => (
                  <div key={i} className="terminal-line">
                    {line.prompt && <><span className="prompt">› </span><span>{line.cmd}</span></>}
                    {line.out && <span style={{ color: line.green ? 'var(--green)' : 'var(--muted)' }}>{line.out}</span>}
                    {line.cursor && <span style={{ color: 'var(--green)', animation: 'blink 1s step-end infinite' }}>▌</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '✉', val: 'hr@headhuntersolutions.com', href: 'mailto:hr@headhuntersolutions.com' },
                { icon: '📞', val: '+91 63546 66048', href: 'tel:+916354666048' },
                { icon: '📞', val: '+91 98847 31607', href: 'tel:+919884731607' },
                { icon: '📞', val: '+91 92864 69473', href: 'tel:+919286469473' },
              ].map(c => (
                <div key={c.val} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: '.85rem' }}>
                  <span style={{ color: 'var(--cyan)' }}>{c.icon}</span>
                  <a href={c.href} style={{ color: 'var(--muted)', transition: 'color .2s' }}
                    onMouseOver={e => (e.currentTarget.style.color = 'var(--cyan)')}
                    onMouseOut={e => (e.currentTarget.style.color = 'var(--muted)')}>{c.val}</a>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '.85rem', marginTop: 4 }}>
                <span style={{ color: 'var(--cyan)', flexShrink: 0 }}>📍</span>
                <span style={{ color: 'var(--muted)', lineHeight: 1.6 }}>Uttarakhand, India<br />Ahmedabad, Gujarat, India</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* RIGHT: FORM */}
        <Reveal direction="right" delay={200}>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <input className="form-input" placeholder="Aryan" value={form.firstName} onChange={set('firstName')} required />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name *</label>
                <input className="form-input" placeholder="Mehra" value={form.lastName} onChange={set('lastName')} required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Work Email *</label>
              <input type="email" className="form-input" placeholder="aryan@company.com" value={form.email} onChange={set('email')} required />
            </div>
            <div className="form-group">
              <label className="form-label">Company *</label>
              <input className="form-input" placeholder="Enterprise Inc." value={form.company} onChange={set('company')} required />
            </div>
            <div className="form-group">
              <label className="form-label">AI Module of Interest</label>
              <select className="form-select" value={form.module} onChange={set('module')}>
                <option value="">Select a module...</option>
                {MODULES.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Mission Brief</label>
              <textarea className="form-textarea" placeholder="Describe your enterprise challenge and what you're looking to achieve..." value={form.message} onChange={set('message')} />
            </div>

            <button
              type="submit"
              className="btn-submit"
              disabled={status.type === 'loading'}
              style={{ opacity: status.type === 'loading' ? 0.6 : 1, background: status.type === 'success' ? 'linear-gradient(135deg,#00ff88,#00cc66)' : undefined }}
            >
              {status.type === 'loading' ? 'TRANSMITTING...' : status.type === 'success' ? 'TRANSMITTED ✓' : 'TRANSMIT REQUEST →'}
            </button>

            {status.msg && (
              <div style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: '.75rem', letterSpacing: '.1em',
                color: status.type === 'error' ? 'var(--pink)' : status.type === 'success' ? 'var(--green)' : 'var(--cyan)'
              }}>
                {status.msg}
              </div>
            )}

            {/* Security note */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <div className="dot dot-ai" />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.62rem', color: 'var(--muted)', letterSpacing: '.1em' }}>
                ENCRYPTED · SECURE CHANNEL · RESPONSE WITHIN 48H
              </span>
            </div>
          </form>
        </Reveal>
      </div>

      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo">LUCEN<span className="edge">EDGE</span></div>
            <p>Connect with our intelligence architects and start building your AI-powered enterprise today.</p>
          </div>
          <div className="footer-col">
            <h5>Navigation</h5>
            {[['Home','/'],['Services','/services'],['About','/about'],['Case Studies','/cases']].map(([l,h]) => (
              <Link key={l} href={h}>{l}</Link>
            ))}
          </div>
          <div className="footer-col">
            <h5>Reach Us</h5>
            <a href="mailto:hr@headhuntersolutions.com">✉ hr@headhuntersolutions.com</a>
            <a href="tel:+916354666048">📞 +91 63546 66048</a>
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
