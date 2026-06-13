'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─── Animation helpers ── */
function useFadeIn(threshold = 0.15) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })
  return { ref, inView }
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) {
  const { ref, inView } = useFadeIn()
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

/* ─── Shared icons ── */
const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/* ════════════════════════════════════════════════
   SOLUTIONS SECTION
════════════════════════════════════════════════ */
const SOLUTIONS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#2DD9B4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="16" height="12" rx="2"/>
        <path d="M7 19h6M10 15v4"/>
      </svg>
    ),
    title: 'Websites & Digital Experiences',
    desc: 'Modern, responsive websites and web applications that are fast, beautiful, and user-focused. We build for performance and longevity.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#2DD9B4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 7 2 10 4 13"/><polyline points="16 7 18 10 16 13"/>
        <line x1="9" y1="4" x2="11" y2="16"/>
      </svg>
    ),
    title: 'Software Systems',
    desc: 'Custom software, dashboards, and internal tools that simplify operations and drive efficiency. Built for your workflows, not retrofitted from templates.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#2DD9B4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="8"/>
        <path d="M7 10l2 2 4-4"/>
      </svg>
    ),
    title: 'Custom Solutions',
    desc: "When off-the-shelf tools don't cut it, we design and build from scratch. From automation tools to bespoke platforms — if it can be built, we'll build it.",
  },
]

export function SolutionsSection() {
  return (
    <section className="py-[104px]" id="solutions">
      <div className="max-w-[1160px] mx-auto px-7">
        <div className="text-center mb-16">
          <FadeIn><span className="eyebrow">What We Build</span></FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="section-title mt-4">Solutions We Create</h2>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SOLUTIONS.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <article className="card-surface p-8 flex flex-col gap-4 h-full group cursor-default">
                <div
                  className="w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--accent-glow)', border: '1px solid var(--accent-border)' }}
                >
                  {s.icon}
                </div>
                <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-[var(--text-1)]">{s.title}</h3>
                <p className="text-sm text-[var(--text-2)] leading-[1.7] flex-1">{s.desc}</p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold font-mono tracking-[0.02em] group-hover:gap-2.5 transition-all"
                  style={{ color: 'var(--accent)' }}
                >
                  Learn more <ArrowIcon />
                </a>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   FEATURED PROJECT — STEWARD
════════════════════════════════════════════════ */
const STEWARD_FEATURES = [
  { label: 'QR Ordering', done: true },
  { label: 'Order Management', done: true },
  { label: 'Menu Management', done: true },
  { label: 'Kitchen Workflow', done: true },
  { label: 'Payments & Billing', done: false },
  { label: 'Analytics & Insights', done: false },
  { label: 'Inventory Management', done: false },
]

function CheckIcon({ done }: { done: boolean }) {
  if (done) {
    return (
      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: 'var(--accent-glow)', border: '1px solid var(--accent-border)' }}>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1.5 4L3.5 6L6.5 2" stroke="#2DD9B4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    )
  }
  return (
    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
      <div className="w-1 h-1 rounded-full" style={{ background: '#2A3440' }} />
    </div>
  )
}

export function FeaturedProjectSection() {
  return (
    <section className="py-[72px]">
      <div className="max-w-[1160px] mx-auto px-7">
        <div className="text-center mb-14">
          <FadeIn><span className="eyebrow">Featured Project</span></FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="section-title mt-4 inline-flex items-center gap-4 flex-wrap justify-center">
              Steward — Restaurant Operating System
              <span className="badge badge-teal">In Active Development</span>
            </h2>
          </FadeIn>
        </div>

        <FadeIn>
          <div className="card-surface overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px]">
              {/* Screenshot mockup */}
              <div
                className="relative min-h-[300px] lg:min-h-[460px] overflow-hidden"
                style={{ background: 'var(--bg-elevated)', borderRight: '1px solid var(--border)' }}
              >
                <div className="absolute top-8 left-8 right-8 bottom-8 overflow-hidden rounded-[10px]"
                  style={{ border: '1px solid var(--border)', background: '#080A0C' }}>
                  {/* Mock browser */}
                  <div className="h-8 flex items-center gap-1.5 px-3" style={{ background: '#0D1117', borderBottom: '1px solid var(--border)' }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: '#FF5F57' }} />
                    <div className="w-2 h-2 rounded-full" style={{ background: '#FEBC2E' }} />
                    <div className="w-2 h-2 rounded-full" style={{ background: '#28C840' }} />
                    <div className="flex-1 h-4 rounded ml-2" style={{ background: 'var(--border-subtle)' }} />
                  </div>
                  {/* App layout */}
                  <div className="flex" style={{ height: 'calc(100% - 32px)' }}>
                    <div className="w-[100px] p-2.5 shrink-0" style={{ background: '#0D1117', borderRight: '1px solid #1E2530' }}>
                      <div className="text-[9px] font-bold font-mono mb-3 px-1 tracking-[.04em]" style={{ color: '#2DD9B4' }}>STEWARD</div>
                      {[true, false, false, false, false].map((active, i) => (
                        <div key={i} className={`h-5 rounded mb-1 ${active ? 'border-l-2' : ''}`}
                          style={{ background: active ? 'rgba(45,217,180,.1)' : '#131A22', borderColor: active ? '#2DD9B4' : undefined }} />
                      ))}
                    </div>
                    <div className="flex-1 p-3.5" style={{ background: '#080A0C' }}>
                      <div className="flex gap-2 mb-3">
                        {[['ORDERS','24','#8B949E',false], ['ACTIVE','12','#2DD9B4',true], ['DONE','8','#8B949E',false]].map(([label, val, col, accent]) => (
                          <div key={label as string} className="flex-1 rounded-[6px] p-2"
                            style={{ background: accent ? 'rgba(45,217,180,.08)' : '#0D1117', border: `1px solid ${accent ? 'rgba(45,217,180,.2)' : '#1E2530'}` }}>
                            <div className="text-[8px] font-mono mb-1" style={{ color: col as string }}>{label as string}</div>
                            <div className="text-[18px] font-bold leading-none" style={{ color: col as string }}>{val as string}</div>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-[6px] overflow-hidden" style={{ background: '#0D1117', border: '1px solid #1E2530' }}>
                        <div className="px-2.5 py-1.5 text-[8px] font-mono tracking-[.04em]" style={{ background: '#131A22', color: '#8B949E' }}>RECENT ORDERS</div>
                        <div className="p-2.5 flex flex-col gap-1.5">
                          {[true,false,true].map((h, i) => (
                            <div key={i} className="flex gap-1.5">
                              <div className="rounded h-[18px] flex-[0_0_40px]" style={{ background: '#1E2530' }} />
                              <div className="rounded h-[18px] flex-[0_0_50px]" style={{ background: '#1E2530' }} />
                              <div className="rounded h-[18px] flex-[0_0_55px]" style={{ background: h ? 'rgba(45,217,180,.15)' : '#131A22' }} />
                              <div className="rounded h-[18px] flex-1" style={{ background: '#1E2530' }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-10 flex flex-col">
                <div className="mb-4">
                  <span className="badge badge-teal">
                    <span className="w-1.5 h-1.5 rounded-full animate-[pulse-dot_2s_ease-in-out_infinite]" style={{ background: 'var(--accent)' }} />
                    Active Development
                  </span>
                </div>
                <h2 className="text-[26px] font-bold tracking-[-0.03em] text-[var(--text-1)] mb-2.5">Steward</h2>
                <p className="text-sm text-[var(--text-2)] leading-[1.7] mb-7">
                  Our flagship product — an all-in-one operating system for restaurants. Built to handle the full service lifecycle from QR ordering to kitchen workflow and analytics.
                </p>

                <p className="font-mono text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--text-3)] mb-3.5">Current Progress</p>
                <ul className="mb-8 flex flex-col gap-1">
                  {STEWARD_FEATURES.map(f => (
                    <li key={f.label} className={`flex items-center gap-2.5 text-[13px] py-1 ${f.done ? 'text-[var(--text-1)]' : 'text-[var(--text-3)]'}`}>
                      <CheckIcon done={f.done} />
                      {f.label}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2.5 flex-wrap mt-auto">
                  <a href="#contact" className="btn-primary text-[13px] !px-4 !py-2.5">
                    Explore Steward Demo <ArrowIcon />
                  </a>
                  <a href="#projects" className="btn-ghost text-[13px] !px-4 !py-2.5">
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   STATS SECTION
════════════════════════════════════════════════ */
const STATS = [
  {
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#2DD9B4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 2 10 4 13"/><polyline points="12 7 14 10 12 13"/><line x1="7" y1="3.5" x2="9" y2="12.5"/></svg>,
    number: '1',
    label: 'Product in Development',
    desc: 'Steward is actively being built and improved with our pilot restaurant.',
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#2DD9B4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="5" r="3"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>,
    number: '1',
    label: 'Pilot Customer',
    desc: 'Working closely with our first partner to refine Steward in a real environment.',
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#2DD9B4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><path d="M5 8h6M8 5v6"/></svg>,
    number: '1',
    label: 'Client Website Delivered',
    desc: 'Delivered a modern, performant website for our first external client.',
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#2DD9B4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2L10 6H14L11 9L12 13L8 11L4 13L5 9L2 6H6L8 2Z"/></svg>,
    number: '1',
    label: 'Step at a Time',
    desc: 'Learning, building, and growing every single day. Honest about where we are.',
  },
]

export function StatsSection() {
  return (
    <section style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-[1160px] mx-auto px-7">
        <div className="text-center pt-14 mb-2">
          <span className="eyebrow">Our Journey So Far</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}>
              <div
                className="py-11 px-8 flex flex-col gap-2"
                style={{ borderRight: i < 3 ? '1px solid var(--border)' : undefined }}
              >
                <div className="w-9 h-9 rounded-[6px] flex items-center justify-center mb-2"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                  {s.icon}
                </div>
                <div className="text-[36px] font-extrabold tracking-[-0.04em] leading-none" style={{ color: 'var(--accent)' }}>{s.number}</div>
                <div className="text-sm font-semibold text-[var(--text-1)]">{s.label}</div>
                <div className="text-[13px] text-[var(--text-2)] leading-[1.55]">{s.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   PROJECTS GRID
════════════════════════════════════════════════ */
const PROJECTS = [
  {
    title: 'Steward',
    subtitle: 'Restaurant Operating System',
    badge: { label: 'In Development', variant: 'badge-teal' },
    desc: 'Our flagship product to streamline restaurant operations, from ordering to analytics. Currently live with our first pilot partner.',
  },
  {
    title: 'Cafe Website',
    subtitle: 'Client Website',
    badge: { label: 'Delivered', variant: 'badge-blue' },
    desc: 'A clean, responsive website built for our first external client. Focused on fast load times, mobile-first design, and simple content management.',
  },
  {
    title: 'Internal Experiments',
    subtitle: 'Internal R&D',
    badge: { label: 'Ongoing', variant: 'badge-amber' },
    desc: 'Automation tools, prototypes, and experiments that sharpen our process and shape the direction of what we build next.',
  },
]

export function ProjectsSection() {
  return (
    <section className="py-[104px]" id="projects">
      <div className="max-w-[1160px] mx-auto px-7">
        <div className="text-center mb-14">
          <FadeIn><span className="eyebrow">Our Projects</span></FadeIn>
          <FadeIn delay={0.1}><h2 className="section-title mt-4">What We&apos;ve Built</h2></FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}>
              <article className="card-surface overflow-hidden flex flex-col h-full group">
                <div className="h-[180px] relative overflow-hidden flex items-center justify-center"
                  style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)' }}>
                  {/* Minimal app preview per project */}
                  <div className="text-[11px] font-mono font-bold tracking-[0.08em]" style={{ color: 'var(--accent)', opacity: 0.5 }}>
                    {p.subtitle.toUpperCase()}
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-2.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-[0.05em]" style={{ color: 'var(--text-3)' }}>{p.subtitle}</span>
                    <span className={`badge ${p.badge.variant}`}>{p.badge.label}</span>
                  </div>
                  <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-[var(--text-1)]">{p.title}</h3>
                  <p className="text-[13px] text-[var(--text-2)] leading-[1.65] flex-1">{p.desc}</p>
                  <a href="#contact" className="inline-flex items-center gap-1.5 text-[12px] font-semibold font-mono group-hover:gap-2.5 transition-all mt-1"
                    style={{ color: 'var(--accent)' }}>
                    View Details <ArrowIcon />
                  </a>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   TIMELINE
════════════════════════════════════════════════ */
const TIMELINE = [
  { date: 'Mar 2026', label: 'Craft Your Systems\nwas founded', done: true },
  { date: 'Apr 2026', label: 'Started building\nSteward MVP', done: true },
  { date: 'May 2026', label: 'Onboarded our\nfirst pilot customer', done: true },
  { date: 'Jun 2026', label: 'Delivered our first\nclient website', done: true },
  { date: 'Coming Next', label: 'Scale & expand\nour work', done: false },
]

export function TimelineSection() {
  return (
    <section className="py-[72px]">
      <div className="max-w-[1160px] mx-auto px-7">
        <div className="text-center mb-16">
          <FadeIn><span className="eyebrow">Our Journey</span></FadeIn>
          <FadeIn delay={0.1}><h2 className="section-title mt-4">From Day One to What&apos;s Next</h2></FadeIn>
        </div>

        <div className="relative flex flex-col lg:flex-row items-start lg:items-start gap-0">
          {/* Horizontal line (desktop) */}
          <div className="hidden lg:block absolute top-[18px] left-[18px] right-[18px] h-px"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(45,217,180,.3) 20%,rgba(45,217,180,.3) 80%,transparent)' }} />

          {TIMELINE.map((node, i) => (
            <div key={node.date} className="flex-1 flex flex-row lg:flex-col items-start lg:items-center gap-4 lg:gap-0 text-left lg:text-center relative pb-7 lg:pb-0">
              {/* Vertical line (mobile) */}
              {i < TIMELINE.length - 1 && (
                <div className="lg:hidden absolute left-[17px] top-[36px] bottom-0 w-px"
                  style={{ background: 'rgba(45,217,180,.2)' }} />
              )}

              <FadeIn delay={i * 0.1}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center relative z-10 shrink-0 lg:mb-5"
                  style={{
                    background: node.done ? 'var(--accent-glow)' : 'var(--bg-elevated)',
                    border: `${node.done ? '2px solid #2DD9B4' : '1.5px solid var(--border)'}`,
                  }}
                >
                  {node.done ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7l3 3 5-5" stroke="#2DD9B4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 3L7 11M3 7L11 7" stroke="#484F58" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                </div>
              </FadeIn>

              <FadeIn delay={i * 0.1 + 0.05}>
                <div>
                  <p className="font-mono text-[11px] font-bold tracking-[0.08em] mb-1.5"
                    style={{ color: node.done ? 'var(--accent)' : 'var(--text-3)' }}>
                    {node.date}
                  </p>
                  <p className="text-[13px] font-semibold leading-[1.4] whitespace-pre-line"
                    style={{ color: node.done ? 'var(--text-1)' : 'var(--text-2)' }}>
                    {node.label}
                  </p>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   VISION SECTION
════════════════════════════════════════════════ */
const ROADMAP = [
  {
    year: '2025 – 2026',
    name: 'Build & Deliver',
    desc: "Delivering real solutions and gaining deep understanding of the problems worth solving. Shipping Steward, delivering client work, sharpening our craft.",
    active: true,
  },
  {
    year: '2026',
    name: 'Scale & Automate',
    desc: "Improving our systems, automating repetitive workflows, and expanding our impact. More clients, sharper products, and a team that grows with ambition.",
    active: false,
  },
  {
    year: 'Future',
    name: 'Intelligent Systems',
    desc: "Exploring intelligent automation, custom tooling, and solving bigger problems at scale. We'll move here when we've earned the foundation to do it right.",
    active: false,
  },
]

export function VisionSection() {
  return (
    <section className="py-[104px]" id="vision">
      <div className="max-w-[1160px] mx-auto px-7">
        <FadeIn><span className="eyebrow block text-center mb-4">Our Vision</span></FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-20 items-start">
          <FadeIn>
            <div>
              <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-bold tracking-[-0.03em] leading-[1.2] text-[var(--text-1)] mb-4">
                The Road Ahead
              </h2>
              <p className="text-[15px] text-[var(--text-2)] leading-[1.75]">
                Today we build software systems and digital experiences. Tomorrow we&apos;ll build systems that think smarter, scale further, and solve bigger problems. We&apos;re taking this one step at a time — honestly.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col">
              {ROADMAP.map((phase, i) => (
                <div key={phase.name}>
                  <div
                    className="flex items-center gap-5 px-7 py-6 rounded-[14px] transition-colors duration-200 hover:bg-[var(--bg-elevated)] cursor-default"
                  >
                    <div className="flex-1">
                      <p className="font-mono text-[11px] font-bold tracking-[0.08em] mb-1" style={{ color: 'var(--accent)' }}>{phase.year}</p>
                      <p className="text-base font-semibold tracking-[-0.01em] text-[var(--text-1)] mb-1.5">{phase.name}</p>
                      <p className="text-[13px] text-[var(--text-2)] leading-[1.65]">{phase.desc}</p>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 10h10M12 7l3 3-3 3" stroke={phase.active ? '#2DD9B4' : '#2A3440'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={phase.active ? undefined : '3 2'}/>
                    </svg>
                  </div>
                  {i < ROADMAP.length - 1 && <div className="h-px mx-7" style={{ background: 'var(--border-subtle)' }} />}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   CTA BANNER
════════════════════════════════════════════════ */
export function CTASection() {
  return (
    <section className="py-20" id="contact">
      <div className="max-w-[1160px] mx-auto px-7">
        <FadeIn>
          <div className="relative overflow-hidden text-center card-surface rounded-[22px] py-[72px] px-8 lg:px-20">
            <div className="absolute top-[-60%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
              style={{ background: 'radial-gradient(ellipse,rgba(45,217,180,.08) 0%,transparent 70%)' }} />
            <div className="relative z-10">
              <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold tracking-[-0.035em] text-[var(--text-1)] mb-3.5">
                Have a project in mind?
              </h2>
              <p className="text-base text-[var(--text-2)] mb-9">Let&apos;s build something useful together.</p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <a href="mailto:hello@craftyoursystems.in" className="btn-primary text-[15px] !px-7 !py-3.5">
                  Start a Project
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a href="mailto:hello@craftyoursystems.in" className="btn-ghost text-[15px] !px-7 !py-3.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1.5" y="3" width="11" height="8" rx="1.5"/><path d="M1.5 5l5 3.5L12 5"/></svg>
                  Schedule a Call
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════════ */
export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-subtle)' }} className="pt-16 pb-10">
      <div className="max-w-[1160px] mx-auto px-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[240px_1fr_1fr_1fr_1fr] gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="inline-flex items-center gap-2.5 font-bold text-[15px] tracking-[-0.02em] text-[var(--text-1)]">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9L9 3L15 9L9 15L3 9Z" stroke="#2DD9B4" strokeWidth="1.5" fill="none"/>
                  <path d="M6 9L9 6L12 9L9 12L6 9Z" fill="#2DD9B4" fillOpacity="0.4"/>
                </svg>
              </div>
              Craft Your Systems
            </a>
            <p className="text-[13px] text-[var(--text-3)] leading-[1.7] mt-3">
              A student-led technology studio building software systems and digital experiences that solve real problems today.
            </p>
            <div className="flex gap-2.5 mt-4">
              {[
                { label: 'GitHub', path: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z' },
                { label: 'LinkedIn', path: 'M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z' },
              ].map(s => (
                <a key={s.label} href="#" aria-label={s.label}
                  className="w-8 h-8 rounded-[6px] flex items-center justify-center transition-colors duration-200"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-3)' }}>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d={s.path}/></svg>
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Navigation', links: [['Home','#'],['Solutions','#solutions'],['Projects','#projects'],['Vision','#vision'],['Contact','#contact']] },
            { title: 'Solutions', links: [['Websites & Digital Experiences','#solutions'],['Software Systems','#solutions'],['Custom Solutions','#solutions']] },
            { title: 'Company', links: [['About Us','#about'],['Our Journey','#vision'],['Careers','#contact']] },
            { title: "Let's Connect", links: [['hello@craftyoursystems.in','mailto:hello@craftyoursystems.in'],['+91 730 456 7890','tel:+917304567890']] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-mono text-[12px] font-semibold tracking-[0.08em] uppercase mb-4" style={{ color: 'var(--text-3)' }}>
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-[13px] transition-colors duration-200"
                      style={{ color: 'var(--text-2)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-1)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <p className="font-mono text-[12px]" style={{ color: 'var(--text-3)' }}>© 2026 Craft Your Systems. All rights reserved.</p>
          <p className="font-mono text-[12px]" style={{ color: 'var(--text-3)' }}>Founded Mar 2026 · Hyderabad, India</p>
        </div>
      </div>
    </footer>
  )
}
