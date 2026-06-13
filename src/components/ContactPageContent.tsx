'use client'

// src/components/ContactPageContent.tsx

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/sections'
import {
  FadeIn,
  PageHero,
  GradientDivider,
  ArrowIcon,
} from '@/components/ui/primitives'

/* ── Types ───────────────────────────────────────────────── */

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface FormData {
  name:        string
  email:       string
  projectType: string
  budget:      string
  message:     string
}

/* ── Options ─────────────────────────────────────────────── */

const PROJECT_TYPES = [
  'Website or Landing Page',
  'Web Application',
  'Software System / Dashboard',
  'Restaurant / Hospitality Tech',
  'Custom Solution',
  'Something else',
]

const BUDGET_RANGES = [
  'Under ₹25,000',
  '₹25,000 – ₹75,000',
  '₹75,000 – ₹1,50,000',
  '₹1,50,000 – ₹5,00,000',
  'Above ₹5,00,000',
  "Not sure yet — let's talk",
]

const FAQS = [
  {
    q: 'How quickly do you respond?',
    a: "Within 24 hours on weekdays. If you've sent us a detailed brief, you'll likely hear from us faster.",
  },
  {
    q: 'Do you take on small projects?',
    a: "Yes. We've delivered single-page websites and multi-month product builds. Budget size matters less than problem clarity.",
  },
  {
    q: 'Are you available for long-term work?',
    a: 'We do ongoing client relationships — maintenance, feature additions, and product iterations. We prefer working with clients over time rather than one-off handoffs.',
  },
  {
    q: 'We need something built fast. Can you help?',
    a: "Depends on the scope. Tell us what you need. We've turned around client websites in under two weeks, and we'll be honest if the timeline isn't realistic.",
  },
]

/* ── Input components ────────────────────────────────────── */

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[13px] font-medium mb-2"
      style={{ color: 'var(--text-2)' }}
    >
      {children}
    </label>
  )
}

const inputBase = {
  background:  'var(--bg-elevated)',
  border:      '1px solid var(--border)',
  borderRadius: 10,
  color:        'var(--text-1)',
  fontSize:     14,
  width:        '100%',
  outline:      'none',
  transition:   'border-color .2s',
  fontFamily:   'inherit',
} as const

function TextInput({
  id, name, type = 'text', placeholder, value, onChange, required,
}: {
  id: string; name: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      required={required}
      autoComplete="off"
      style={{
        ...inputBase,
        padding: '12px 14px',
        borderColor: focused ? 'rgba(45,217,180,.5)' : 'var(--border)',
        boxShadow: focused ? '0 0 0 3px rgba(45,217,180,.08)' : 'none',
      }}
    />
  )
}

function SelectInput({
  id, name, value, onChange, options, placeholder,
}: {
  id: string; name: string; value: string; onChange: (v: string) => void;
  options: string[]; placeholder: string
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputBase,
          padding: '12px 36px 12px 14px',
          borderColor: focused ? 'rgba(45,217,180,.5)' : 'var(--border)',
          boxShadow: focused ? '0 0 0 3px rgba(45,217,180,.08)' : 'none',
          appearance: 'none',
          cursor: 'pointer',
        }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        width="14" height="14" viewBox="0 0 14 14" fill="none"
      >
        <path d="M3 5l4 4 4-4" stroke="var(--text-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

function TextareaInput({
  id, name, placeholder, value, onChange, rows = 5,
}: {
  id: string; name: string; placeholder?: string; value: string;
  onChange: (v: string) => void; rows?: number
}) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        padding: '12px 14px',
        borderColor: focused ? 'rgba(45,217,180,.5)' : 'var(--border)',
        boxShadow: focused ? '0 0 0 3px rgba(45,217,180,.08)' : 'none',
        resize: 'vertical',
        minHeight: 120,
      }}
    />
  )
}

/* ── FAQ accordion item ──────────────────────────────────── */

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{ borderBottom: '1px solid var(--border-subtle)' }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-[14px] font-medium text-[var(--text-1)]">{q}</span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="var(--text-3)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-5 text-[14px] leading-[1.75]" style={{ color: 'var(--text-2)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Main component ──────────────────────────────────────── */

export function ContactPageContent() {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', projectType: '', budget: '', message: '',
  })
  const [state, setState] = useState<FormState>('idle')

  function set(field: keyof FormData) {
    return (value: string) => setFormData(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('submitting')
    // Simulate async submit — replace with your API / Resend / Formspree call
    await new Promise(r => setTimeout(r, 1400))
    setState('success')
  }

  const canSubmit = formData.name && formData.email && formData.projectType && formData.message

  return (
    <>
      <Nav />
      <main>

        {/* ── Hero ── */}
        <PageHero
          eyebrow="Let's Work Together"
          title={<>Let's build something<br />useful.</>}
          subtitle="Tell us about your project. We'll get back to you within 24 hours."
        />

        <GradientDivider />

        {/* ══════════════════════════════════════════════
            FORM + INFO SPLIT
        ══════════════════════════════════════════════ */}
        <section className="py-24">
          <div className="max-w-[1160px] mx-auto px-7">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 items-start">

              {/* ── Contact form ── */}
              <FadeIn>
                <AnimatePresence mode="wait">
                  {state === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-[14px] p-10 text-center"
                      style={{ background: 'var(--bg-surface)', border: '1px solid var(--accent-border)' }}
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                        style={{ background: 'var(--accent-glow)', border: '2px solid var(--accent)' }}
                      >
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                          <path d="M4 11.5L8.5 16L18 6.5" stroke="#2DD9B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="text-[20px] font-bold tracking-[-0.02em] text-[var(--text-1)] mb-3">
                        Message sent.
                      </h3>
                      <p className="text-[15px] leading-[1.75] mb-6" style={{ color: 'var(--text-2)' }}>
                        We've received your message and will get back to you within 24 hours. Keep an eye on <strong style={{ color: 'var(--text-1)' }}>{formData.email}</strong>.
                      </p>
                      <button
                        onClick={() => { setState('idle'); setFormData({ name:'', email:'', projectType:'', budget:'', message:'' }) }}
                        className="btn-ghost"
                        style={{ fontSize: 13 }}
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col gap-6"
                      noValidate
                    >
                      <div>
                        <h2
                          className="font-bold tracking-[-0.03em] text-[var(--text-1)] mb-1"
                          style={{ fontSize: 'clamp(1.4rem,2.5vw,1.9rem)' }}
                        >
                          Tell us about your project
                        </h2>
                        <p className="text-[14px]" style={{ color: 'var(--text-2)' }}>
                          The more detail, the faster we can give you a useful response.
                        </p>
                      </div>

                      {/* Name + Email row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <FieldLabel htmlFor="name">Your name *</FieldLabel>
                          <TextInput
                            id="name" name="name"
                            placeholder="Arjun Sharma"
                            value={formData.name} onChange={set('name')} required
                          />
                        </div>
                        <div>
                          <FieldLabel htmlFor="email">Email address *</FieldLabel>
                          <TextInput
                            id="email" name="email" type="email"
                            placeholder="arjun@company.com"
                            value={formData.email} onChange={set('email')} required
                          />
                        </div>
                      </div>

                      {/* Project type + Budget row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <FieldLabel htmlFor="projectType">Project type *</FieldLabel>
                          <SelectInput
                            id="projectType" name="projectType"
                            placeholder="Select a type"
                            options={PROJECT_TYPES}
                            value={formData.projectType} onChange={set('projectType')}
                          />
                        </div>
                        <div>
                          <FieldLabel htmlFor="budget">Budget range</FieldLabel>
                          <SelectInput
                            id="budget" name="budget"
                            placeholder="Select a range"
                            options={BUDGET_RANGES}
                            value={formData.budget} onChange={set('budget')}
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <FieldLabel htmlFor="message">
                          Tell us about your project *
                        </FieldLabel>
                        <TextareaInput
                          id="message" name="message"
                          placeholder="What are you building? What problem are you trying to solve? What have you tried already? The more context you give, the better we can help."
                          value={formData.message} onChange={set('message')}
                          rows={6}
                        />
                      </div>

                      {/* Submit */}
                      <div className="flex items-center gap-4">
                        <button
                          type="submit"
                          disabled={!canSubmit || state === 'submitting'}
                          className="btn-primary"
                          style={{
                            fontSize: 15,
                            padding: '13px 26px',
                            opacity: !canSubmit ? 0.5 : 1,
                            cursor: !canSubmit ? 'not-allowed' : 'pointer',
                          }}
                        >
                          {state === 'submitting' ? (
                            <>
                              <svg
                                className="animate-spin"
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                              >
                                <circle cx="8" cy="8" r="6" stroke="rgba(0,0,0,0.2)" strokeWidth="2"/>
                                <path d="M8 2a6 6 0 016 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>Send message <ArrowIcon size={14} /></>
                          )}
                        </button>
                        <p className="text-[12px]" style={{ color: 'var(--text-3)' }}>
                          We reply within 24h on weekdays
                        </p>
                      </div>

                      {state === 'error' && (
                        <p className="text-[13px] px-4 py-3 rounded-[8px]" style={{ color: '#FF6B6B', background: 'rgba(255,107,107,.08)', border: '1px solid rgba(255,107,107,.2)' }}>
                          Something went wrong. Try emailing us directly at{' '}
                          <a href="mailto:hello@craftyoursystems.in" style={{ textDecoration: 'underline' }}>
                            hello@craftyoursystems.in
                          </a>
                        </p>
                      )}
                    </motion.form>
                  )}
                </AnimatePresence>
              </FadeIn>

              {/* ── Contact info sidebar ── */}
              <div className="flex flex-col gap-5">

                {/* Direct contact */}
                <FadeIn delay={0.1}>
                  <div
                    className="p-6 rounded-[14px]"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
                  >
                    <p className="eyebrow mb-5">Direct Contact</p>
                    <div className="flex flex-col gap-4">
                      <a
                        href="mailto:hello@craftyoursystems.in"
                        className="flex items-start gap-3 group"
                      >
                        <div
                          className="w-8 h-8 rounded-[6px] flex items-center justify-center flex-shrink-0"
                          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--text-2)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="1" y="3" width="12" height="8" rx="1.5"/>
                            <path d="M1 5l6 3.5L13 5"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-[12px] font-mono tracking-wider uppercase mb-0.5" style={{ color: 'var(--text-3)' }}>Email</p>
                          <p
                            className="text-[13px] font-medium transition-colors duration-200 group-hover:text-[var(--accent)] break-all"
                            style={{ color: 'var(--text-1)' }}
                          >
                            hello@craftyoursystems.in
                          </p>
                        </div>
                      </a>

                      <div className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 rounded-[6px] flex items-center justify-center flex-shrink-0"
                          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--text-2)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 9.5c-.5 1-1.5 1.8-2.5 1.8C4.8 11.3 2.7 9 2.7 4.5 2.7 3.5 3.5 2.5 4.5 2c.3-.1.6 0 .7.3l.8 1.8c.1.3 0 .6-.2.8l-.6.6c.4 1 1.1 1.8 2 2.2l.6-.6c.2-.2.5-.3.8-.2l1.8.8c.3.1.4.4.3.7z"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-[12px] font-mono tracking-wider uppercase mb-0.5" style={{ color: 'var(--text-3)' }}>Phone</p>
                          <p className="text-[13px] font-medium" style={{ color: 'var(--text-1)' }}>+91 730 456 7890</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 rounded-[6px] flex items-center justify-center flex-shrink-0"
                          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--text-2)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 1a5 5 0 015 5c0 3.5-5 8-5 8S2 9.5 2 6a5 5 0 015-5z"/>
                            <circle cx="7" cy="6" r="1.5"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-[12px] font-mono tracking-wider uppercase mb-0.5" style={{ color: 'var(--text-3)' }}>Location</p>
                          <p className="text-[13px] font-medium" style={{ color: 'var(--text-1)' }}>Hyderabad, Telangana, India</p>
                          <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-3)' }}>Remote-friendly · IST (UTC+5:30)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>

                {/* Response time */}
                <FadeIn delay={0.2}>
                  <div
                    className="p-5 rounded-[12px] flex items-start gap-3"
                    style={{ background: 'rgba(45,217,180,.05)', border: '1px solid rgba(45,217,180,.15)' }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 animate-[pulse-dot_2s_ease-in-out_infinite]"
                      style={{ background: 'var(--accent)' }}
                    />
                    <p className="text-[13px] leading-[1.65]" style={{ color: 'var(--text-2)' }}>
                      <strong style={{ color: 'var(--text-1)' }}>Typically replies within 24 hours</strong> on weekdays. Detailed briefs get faster, more specific responses.
                    </p>
                  </div>
                </FadeIn>

                {/* What to expect */}
                <FadeIn delay={0.25}>
                  <div
                    className="p-6 rounded-[12px]"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
                  >
                    <p className="eyebrow mb-4">What to expect</p>
                    <ol className="flex flex-col gap-3 list-none">
                      {[
                        'We read your message carefully',
                        'We reply with questions or a rough scope',
                        'Short call to align on goals and timeline',
                        'Proposal with pricing and delivery date',
                        'We build it',
                      ].map((step, i) => (
                        <li key={step} className="flex items-start gap-3">
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0 mt-0.5"
                            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--accent)' }}
                          >
                            {i + 1}
                          </span>
                          <span className="text-[13px] leading-[1.6]" style={{ color: 'var(--text-2)' }}>
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </FadeIn>

              </div>
            </div>
          </div>
        </section>

        <GradientDivider />

        {/* ══════════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════════ */}
        <section className="py-24">
          <div className="max-w-[1160px] mx-auto px-7">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
              <FadeIn>
                <div>
                  <span className="eyebrow">FAQ</span>
                  <h2 className="section-title mt-4" style={{ fontSize: 'clamp(1.5rem,2.5vw,2rem)' }}>
                    Common questions
                  </h2>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  {FAQS.map(faq => (
                    <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            BOTTOM CTA
        ══════════════════════════════════════════════ */}
        <section className="py-16">
          <div className="max-w-[1160px] mx-auto px-7">
            <FadeIn>
              <div
                className="rounded-[14px] p-10 md:p-14 text-center relative overflow-hidden"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
              >
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse,rgba(45,217,180,.06) 0%,transparent 70%)' }}
                />
                <div className="relative z-10">
                  <h3
                    className="font-bold tracking-[-0.03em] text-[var(--text-1)] mb-4"
                    style={{ fontSize: 'clamp(1.4rem,3vw,1.9rem)' }}
                  >
                    Ready to start?
                  </h3>
                  <p className="text-[15px] leading-[1.75] max-w-[420px] mx-auto mb-8" style={{ color: 'var(--text-2)' }}>
                    You don't need a finished spec to reach out. A rough idea is enough to start a conversation.
                  </p>
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <a href="mailto:hello@craftyoursystems.in" className="btn-primary" style={{ fontSize: 15, padding: '13px 26px' }}>
                      Email us directly
                      <ArrowIcon size={14} />
                    </a>
                    <Link href="/projects" className="btn-ghost" style={{ fontSize: 15, padding: '13px 26px' }}>
                      See our work first
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
