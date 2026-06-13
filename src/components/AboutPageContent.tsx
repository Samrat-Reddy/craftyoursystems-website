'use client'

// src/components/AboutPageContent.tsx

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/sections'
import {
  FadeIn,
  PageHero,
  GradientDivider,
  ArrowIcon,
} from '@/components/ui/primitives'
import { viewStagger, viewChild } from '@/lib/motion'

/* ── Principles data ─────────────────────────────────────── */

const PRINCIPLES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#2DD9B4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="7"/>
        <path d="M10 6v4l3 2"/>
      </svg>
    ),
    title: 'Problem First',
    desc: "We don't pick up a tool before we understand the problem. Every line of code we write answers a specific question asked by a real person in a real situation.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#2DD9B4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 7 2 10 4 13"/>
        <polyline points="16 7 18 10 16 13"/>
        <line x1="9" y1="4" x2="11" y2="16"/>
      </svg>
    ),
    title: 'Build Fast, Honestly',
    desc: 'We move quickly but don\'t pretend features exist before they do. Shipping a working v1 with clear limitations beats a polished v0 that overpromises.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#2DD9B4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L8 10h5l-1 8-4-8H3"/>
      </svg>
    ),
    title: 'Learn Constantly',
    desc: "We're students — that's not a limitation, it's the point. Every project teaches us something the last one couldn't. We document what breaks and build better the next time.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#2DD9B4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l4-8 4 4 4-6 2 10"/>
        <path d="M3 12l4-4"/>
      </svg>
    ),
    title: 'Think Long-Term',
    desc: 'We build systems, not scripts. Code should still make sense in six months. Decisions made today compound — for better or worse — so we make them deliberately.',
  },
]

/* ── Timeline data ───────────────────────────────────────── */

const TIMELINE_EVENTS = [
  {
    date:    'March 2026',
    title:   'Craft Your Systems Founded',
    desc:    'CYS was registered as a student-led technology studio. Started with one clear goal: build software that solves practical problems rather than chasing trends.',
    done:    true,
    current: false,
  },
  {
    date:    'April 2026',
    title:   'Started Building Steward',
    desc:    'Development kicked off on Steward — a restaurant operating system. Chose this problem deliberately: local restaurants were struggling with disconnected tools and manual processes.',
    done:    true,
    current: false,
  },
  {
    date:    'May 2026',
    title:   'First Pilot Customer Onboarded',
    desc:    'Onboarded our first restaurant partner to test Steward in a live environment. Moved from theory to real feedback within weeks of starting development.',
    done:    true,
    current: false,
  },
  {
    date:    'May 2026',
    title:   'First Client Website Delivered',
    desc:    "Designed and built a responsive website for a local specialty coffee brand. First external client project — delivered on time, on brief, and on budget.",
    done:    true,
    current: false,
  },
  {
    date:    'Today',
    title:   'Growing Through Real Projects',
    desc:    'Continuing to develop Steward, taking on client projects, and learning from every build. One step at a time.',
    done:    false,
    current: true,
  },
]

/* ── Who We Are stat bubbles ─────────────────────────────── */

const IDENTITY_STATS = [
  { value: 'Mar 2026', label: 'Founded'            },
  { value: 'HYD',      label: 'Hyderabad, India'   },
  { value: '100%',     label: 'Student-led'        },
  { value: '2',        label: 'Projects shipped'   },
]

/* ── Main component ──────────────────────────────────────── */

export function AboutPageContent() {
  return (
    <>
      <Nav />
      <main>

        {/* ── Hero ── */}
        <PageHero
          eyebrow="About CYS"
          title={<>Building software that<br />solves real problems.</>}
          subtitle="We're a student-led technology studio that started with a simple idea: build things that actually get used."
        />

        <GradientDivider />

        {/* ══════════════════════════════════════════════
            WHO WE ARE
        ══════════════════════════════════════════════ */}
        <section className="py-24" aria-labelledby="who-we-are-heading">
          <div className="max-w-[1160px] mx-auto px-7">

            <FadeIn className="mb-3">
              <span className="eyebrow">Who We Are</span>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">

              {/* Text block */}
              <div>
                <FadeIn delay={0.08}>
                  <h2
                    id="who-we-are-heading"
                    className="section-title mb-6"
                  >
                    A studio that builds with purpose, not hype.
                  </h2>
                </FadeIn>
                <FadeIn delay={0.16}>
                  <p className="text-[16px] leading-[1.8] mb-5" style={{ color: 'var(--text-2)' }}>
                    Craft Your Systems was founded in March 2026 by a group of students who were tired of building portfolio projects that no one used. We wanted to build things that mattered — even at a small scale.
                  </p>
                </FadeIn>
                <FadeIn delay={0.22}>
                  <p className="text-[16px] leading-[1.8] mb-5" style={{ color: 'var(--text-2)' }}>
                    We're not a startup in the traditional sense. There's no funding round, no pitch deck, no growth-at-all-costs mentality. We're a small, focused team that takes on problems we find genuinely interesting and builds solutions we'd actually want to use ourselves.
                  </p>
                </FadeIn>
                <FadeIn delay={0.28}>
                  <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-2)' }}>
                    We work with clients who need real software — not templates, not off-the-shelf tools rebranded with their logo. And we build our own products when we spot a problem nobody's solving well.
                  </p>
                </FadeIn>
              </div>

              {/* Identity card */}
              <FadeIn delay={0.1}>
                <div
                  className="rounded-[14px] overflow-hidden"
                  style={{ border: '1px solid var(--border)' }}
                >
                  {/* Logo header */}
                  <div
                    className="p-6 flex items-center gap-4"
                    style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}
                  >
                    <div
                      className="w-12 h-12 rounded-[10px] flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                    >
                      <svg width="24" height="24" viewBox="0 0 18 18" fill="none">
                        <path d="M3 9L9 3L15 9L9 15L3 9Z" stroke="#2DD9B4" strokeWidth="1.5" fill="none"/>
                        <path d="M6 9L9 6L12 9L9 12L6 9Z" fill="#2DD9B4" fillOpacity="0.4"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-[15px] font-bold text-[var(--text-1)] tracking-[-0.02em]">Craft Your Systems</div>
                      <div className="font-mono text-[11px] mt-0.5" style={{ color: 'var(--text-3)' }}>Technology Studio · Hyderabad</div>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2">
                    {IDENTITY_STATS.map((s, i) => (
                      <div
                        key={s.label}
                        className="p-5"
                        style={{
                          background: 'var(--bg-surface)',
                          borderRight: i % 2 === 0 ? '1px solid var(--border)' : undefined,
                          borderBottom: i < 2 ? '1px solid var(--border)' : undefined,
                        }}
                      >
                        <div
                          className="text-[22px] font-extrabold tracking-[-0.03em] leading-none mb-1.5"
                          style={{ color: 'var(--accent)' }}
                        >
                          {s.value}
                        </div>
                        <div className="font-mono text-[11px] tracking-wider uppercase" style={{ color: 'var(--text-3)' }}>
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer note */}
                  <div className="px-6 py-4" style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)' }}>
                    <p className="text-[12px] leading-[1.6]" style={{ color: 'var(--text-3)' }}>
                      We're honest about where we are. Small, early, and building every day.
                    </p>
                  </div>
                </div>
              </FadeIn>

            </div>
          </div>
        </section>

        <GradientDivider />

        {/* ══════════════════════════════════════════════
            PRINCIPLES
        ══════════════════════════════════════════════ */}
        <section className="py-24" aria-labelledby="principles-heading">
          <div className="max-w-[1160px] mx-auto px-7">

            <div className="text-center mb-16">
              <FadeIn><span className="eyebrow">How We Work</span></FadeIn>
              <FadeIn delay={0.08}>
                <h2 id="principles-heading" className="section-title mt-4">Our Principles</h2>
              </FadeIn>
              <FadeIn delay={0.16}>
                <p
                  className="mt-4 text-[15px] leading-[1.75] max-w-[480px] mx-auto"
                  style={{ color: 'var(--text-2)' }}
                >
                  These aren't values we stuck on a wall. They're the decisions we make every time we sit down to build something.
                </p>
              </FadeIn>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              variants={viewStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              {PRINCIPLES.map((p) => (
                <motion.article
                  key={p.title}
                  variants={viewChild}
                  className="p-8 rounded-[14px] flex flex-col gap-4 transition-colors duration-200 hover:bg-[var(--bg-elevated)] cursor-default"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
                >
                  <div
                    className="w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent-glow)', border: '1px solid var(--accent-border)' }}
                  >
                    {p.icon}
                  </div>
                  <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-[var(--text-1)]">
                    {p.title}
                  </h3>
                  <p className="text-[14px] leading-[1.75]" style={{ color: 'var(--text-2)' }}>
                    {p.desc}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <GradientDivider />

        {/* ══════════════════════════════════════════════
            JOURNEY TIMELINE
        ══════════════════════════════════════════════ */}
        <section className="py-24" aria-labelledby="journey-heading">
          <div className="max-w-[1160px] mx-auto px-7">

            <div className="mb-16">
              <FadeIn><span className="eyebrow">Our Journey</span></FadeIn>
              <FadeIn delay={0.08}>
                <h2 id="journey-heading" className="section-title mt-4">
                  Three months.<br />Real progress.
                </h2>
              </FadeIn>
            </div>

            {/* Timeline vertical */}
            <div className="relative max-w-[720px]">
              {/* Vertical connector */}
              <div
                className="absolute left-[15px] top-4 bottom-4 w-px"
                style={{ background: 'linear-gradient(180deg, var(--accent-border), rgba(45,217,180,.1) 80%, transparent)' }}
              />

              <div className="flex flex-col gap-0">
                {TIMELINE_EVENTS.map((event, i) => (
                  <FadeIn key={event.title} delay={i * 0.1}>
                    <div className="flex gap-6 pb-10 last:pb-0">
                      {/* Dot */}
                      <div className="relative z-10 flex-shrink-0 mt-1">
                        <div
                          className="w-[30px] h-[30px] rounded-full flex items-center justify-center"
                          style={{
                            background: event.current
                              ? 'var(--bg-elevated)'
                              : event.done
                              ? 'var(--accent-glow)'
                              : 'var(--bg-elevated)',
                            border: event.done
                              ? '2px solid var(--accent)'
                              : '2px solid var(--border)',
                          }}
                        >
                          {event.done ? (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#2DD9B4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : event.current ? (
                            <div
                              className="w-2 h-2 rounded-full animate-[pulse-dot_2s_ease-in-out_infinite]"
                              style={{ background: 'var(--accent)' }}
                            />
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#2A3440' }} />
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-0.5">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span
                            className="font-mono text-[11px] font-bold tracking-widest"
                            style={{ color: event.current ? 'var(--accent)' : 'var(--text-3)' }}
                          >
                            {event.date}
                          </span>
                          {event.current && (
                            <span className="badge badge-teal" style={{ fontSize: 10, padding: '2px 8px' }}>Now</span>
                          )}
                        </div>
                        <h3 className="text-[16px] font-semibold text-[var(--text-1)] mb-2 tracking-[-0.01em]">
                          {event.title}
                        </h3>
                        <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--text-2)' }}>
                          {event.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        <GradientDivider />

        {/* ══════════════════════════════════════════════
            MISSION STATEMENT
        ══════════════════════════════════════════════ */}
        <section className="py-24" aria-labelledby="mission-heading">
          <div className="max-w-[1160px] mx-auto px-7">

            <FadeIn>
              <div className="max-w-[760px]">
                <span className="eyebrow">Mission</span>
                <blockquote
                  className="mt-6 font-bold leading-[1.25] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(1.5rem,3.5vw,2.2rem)', color: 'var(--text-1)' }}
                >
                  "Build software that solves real problems for real people — honestly, methodically, and with enough ambition to grow into something that matters."
                </blockquote>
                <p className="mt-6 text-[15px] leading-[1.8]" style={{ color: 'var(--text-2)' }}>
                  We're not trying to build the next unicorn. We're trying to build systems that work, clients who trust us, and a team that gets better with every project. The ambition comes from the craft, not the pitch deck.
                </p>
              </div>
            </FadeIn>

            {/* Honest context box */}
            <FadeIn delay={0.15}>
              <div
                className="mt-12 p-6 rounded-[12px] flex items-start gap-5 max-w-[720px]"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
              >
                <div
                  className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round">
                    <circle cx="8" cy="8" r="6"/><path d="M8 5v3.5"/><circle cx="8" cy="11" r=".5" fill="var(--accent)"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[var(--text-1)] mb-1.5">A note on where we are</p>
                  <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--text-2)' }}>
                    We're three months old. One product in active development, one client website delivered, one pilot customer. We're proud of what we've shipped and honest about how much is still ahead. This page will look very different in a year.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── CTA ── */}
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
                    Want to work with us?
                  </h3>
                  <p className="text-[15px] leading-[1.75] max-w-[440px] mx-auto mb-8" style={{ color: 'var(--text-2)' }}>
                    We take on a small number of client projects at a time so we can do them properly. Tell us what you're building.
                  </p>
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <Link href="/contact" className="btn-primary">
                      Get in touch <ArrowIcon size={14} />
                    </Link>
                    <Link href="/projects" className="btn-ghost">
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
