'use client'

// src/components/ProjectsPageContent.tsx

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/sections'
import {
  FadeIn,
  PageHero,
  GradientDivider,
  TechBadge,
  CheckItem,
  ArrowIcon,
} from '@/components/ui/primitives'
import { viewStagger, viewChild } from '@/lib/motion'

/* ── Data ─────────────────────────────────────────────────── */

const STEWARD_STACK = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS',
  'Prisma', 'PostgreSQL', 'Node.js', 'Vercel',
]

const STEWARD_FEATURES_DONE = [
  'QR-based table ordering — customers scan, browse, and order without staff intervention',
  'Real-time order management — kitchen and front-of-house view live order queue',
  'Full menu management — categories, items, pricing, availability toggles',
  'Kitchen display workflow — orders routed to kitchen with status tracking',
]

const STEWARD_FEATURES_PENDING = [
  'Payments & billing — integrated UPI / card checkout',
  'Analytics & insights — revenue, popular items, peak hours',
  'Inventory management — track stock levels, low-stock alerts',
  'Multi-branch support — manage multiple restaurant locations',
]

const STEWARD_ROADMAP = [
  { phase: 'Phase 1', label: 'Core Ordering', status: 'done',    desc: 'QR ordering, menu management, order queue — live with pilot partner.' },
  { phase: 'Phase 2', label: 'Payments',      status: 'active',  desc: 'Integrated checkout with UPI, card, and split-bill support.' },
  { phase: 'Phase 3', label: 'Analytics',     status: 'pending', desc: 'Revenue dashboards, peak-hour heatmaps, item-level performance.' },
  { phase: 'Phase 4', label: 'Scale',         status: 'pending', desc: 'Multi-branch management, staff roles, franchisee tooling.' },
]

const CLIENT_STACK = ['Next.js', 'React', 'Tailwind CSS', 'Vercel']

/* ── Mock app screenshots built from CSS ──────────────────── */

function StewardMockDashboard() {
  return (
    <div
      className="rounded-[10px] overflow-hidden"
      style={{ background: '#080A0C', border: '1px solid var(--border)' }}
    >
      {/* Browser chrome */}
      <div
        className="h-8 flex items-center gap-1.5 px-3"
        style={{ background: '#0D1117', borderBottom: '1px solid var(--border)' }}
      >
        {['#FF5F57','#FEBC2E','#28C840'].map(c => (
          <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
        ))}
        <div className="flex-1 h-3.5 rounded ml-2" style={{ background: '#1E2530' }} />
        <div className="w-16 h-3.5 rounded" style={{ background: '#1E2530' }} />
      </div>

      {/* App layout */}
      <div className="flex" style={{ minHeight: 260 }}>
        {/* Sidebar */}
        <div className="w-[110px] p-3 shrink-0" style={{ background: '#0A0D11', borderRight: '1px solid var(--border)' }}>
          <div className="font-mono text-[9px] font-bold mb-4 px-1 tracking-widest" style={{ color: '#2DD9B4' }}>STEWARD</div>
          {[
            ['Overview', true], ['Orders', false], ['Menu', false],
            ['Kitchen', false], ['Analytics', false], ['Settings', false],
          ].map(([label, active]) => (
            <div
              key={label as string}
              className="h-7 rounded mb-1 px-2 flex items-center"
              style={{
                background: active ? 'rgba(45,217,180,.1)' : 'transparent',
                borderLeft: active ? '2px solid #2DD9B4' : '2px solid transparent',
              }}
            >
              <div className="h-[5px] rounded flex-1" style={{ background: active ? 'rgba(45,217,180,.4)' : '#1E2530' }} />
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 p-4" style={{ background: '#080A0C' }}>
          {/* Top row stats */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { l: 'ORDERS', v: '24', accent: false },
              { l: 'IN PROGRESS', v: '12', accent: true },
              { l: 'COMPLETED', v: '8', accent: false },
              { l: 'REVENUE', v: '₹12,450', accent: false },
            ].map(s => (
              <div
                key={s.l}
                className="rounded-[6px] p-2.5"
                style={{
                  background: s.accent ? 'rgba(45,217,180,.08)' : '#0D1117',
                  border: `1px solid ${s.accent ? 'rgba(45,217,180,.2)' : '#1E2530'}`,
                }}
              >
                <div className="font-mono text-[7px] mb-1.5 tracking-widest" style={{ color: s.accent ? '#2DD9B4' : '#4A5568' }}>{s.l}</div>
                <div className="font-bold text-[15px] leading-none" style={{ color: s.accent ? '#2DD9B4' : '#F0F6FC' }}>{s.v}</div>
              </div>
            ))}
          </div>

          {/* Orders table */}
          <div className="rounded-[6px] overflow-hidden" style={{ border: '1px solid #1E2530' }}>
            <div className="px-3 py-2 font-mono text-[8px] tracking-widest" style={{ background: '#0D1117', borderBottom: '1px solid #1E2530', color: '#4A5568' }}>
              RECENT ORDERS
            </div>
            <div className="divide-y" style={{ borderColor: '#1E2530' }}>
              {[
                { id: '#1024', table: 'Table C7', items: '2 items', status: 'In Progress', highlight: true },
                { id: '#1023', table: 'Table D3', items: '4 items', status: 'Completed',   highlight: false },
                { id: '#1022', table: 'Table 11', items: '3 items', status: 'In Progress', highlight: true },
                { id: '#1021', table: 'Table A2', items: '2 items', status: 'Completed',   highlight: false },
              ].map(row => (
                <div key={row.id} className="flex items-center gap-3 px-3 py-2">
                  <span className="font-mono text-[9px] w-10" style={{ color: '#8B949E' }}>{row.id}</span>
                  <span className="font-mono text-[9px] flex-1" style={{ color: '#F0F6FC' }}>{row.table}</span>
                  <span className="font-mono text-[9px] w-12" style={{ color: '#8B949E' }}>{row.items}</span>
                  <span
                    className="font-mono text-[9px] px-2 py-0.5 rounded"
                    style={{
                      background: row.highlight ? 'rgba(45,217,180,.12)' : 'rgba(139,148,158,.08)',
                      color: row.highlight ? '#2DD9B4' : '#8B949E',
                    }}
                  >
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StewardMockMobile() {
  return (
    <div
      className="rounded-[16px] overflow-hidden mx-auto"
      style={{ width: 180, background: '#080A0C', border: '1px solid var(--border)' }}
    >
      {/* Status bar */}
      <div className="h-6 flex items-center justify-between px-3" style={{ background: '#0D1117' }}>
        <div className="font-mono text-[8px]" style={{ color: '#4A5568' }}>9:41</div>
        <div className="flex gap-1">
          <div className="w-3 h-[5px] rounded-sm" style={{ background: '#2DD9B4' }} />
          <div className="w-1.5 h-[5px] rounded-sm" style={{ background: '#2DD9B4' }} />
        </div>
      </div>

      {/* Header */}
      <div className="px-3 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="font-mono text-[9px] font-bold mb-1" style={{ color: '#2DD9B4' }}>Your Order</div>
        <div className="text-[8px]" style={{ color: '#8B949E' }}>Table 7 · Scan to order</div>
      </div>

      {/* Menu items */}
      <div className="p-3 flex flex-col gap-2">
        {[
          { name: 'Margherita Pizza', price: '₹348', qty: 1 },
          { name: 'Pasta Alfredo',    price: '₹248', qty: 1 },
          { name: 'Coke',             price: '₹65',  qty: 2 },
        ].map(item => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded" style={{ background: '#131A22', border: '1px solid #1E2530' }} />
            <div className="flex-1 min-w-0">
              <div className="text-[8px] font-medium truncate" style={{ color: '#F0F6FC' }}>{item.name}</div>
              <div className="font-mono text-[8px]" style={{ color: '#8B949E' }}>{item.price}</div>
            </div>
            <div className="font-mono text-[9px]" style={{ color: '#4A5568' }}>×{item.qty}</div>
          </div>
        ))}
      </div>

      {/* Total + CTA */}
      <div className="px-3 pb-3" style={{ borderTop: '1px solid var(--border)', paddingTop: 10 }}>
        <div className="flex justify-between mb-2.5">
          <span className="font-mono text-[9px]" style={{ color: '#8B949E' }}>Total</span>
          <span className="font-mono text-[9px] font-bold" style={{ color: '#F0F6FC' }}>₹507</span>
        </div>
        <div
          className="h-7 rounded-[6px] flex items-center justify-center font-mono text-[9px] font-bold"
          style={{ background: '#2DD9B4', color: '#060A0D' }}
        >
          Place Order
        </div>
      </div>
    </div>
  )
}

function ClientWebsiteMock() {
  return (
    <div
      className="rounded-[10px] overflow-hidden"
      style={{ background: '#080A0C', border: '1px solid var(--border)' }}
    >
      <div
        className="h-8 flex items-center gap-1.5 px-3"
        style={{ background: '#0D1117', borderBottom: '1px solid var(--border)' }}
      >
        {['#FF5F57','#FEBC2E','#28C840'].map(c => (
          <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
        ))}
        <div className="flex-1 h-3.5 rounded ml-2" style={{ background: '#1E2530' }} />
      </div>

      <div style={{ background: '#0A0A08' }}>
        {/* Hero area */}
        <div className="px-6 py-8 text-center" style={{ borderBottom: '1px solid #1E1A10' }}>
          <div
            className="inline-block px-3 py-1 rounded font-mono text-[9px] mb-3"
            style={{ background: 'rgba(139,90,43,.2)', color: '#B87333', border: '1px solid rgba(139,90,43,.3)' }}
          >
            SPECIALTY COFFEE
          </div>
          <div className="font-bold text-[18px] mb-2" style={{ color: '#F5E6C8', letterSpacing: '-0.02em' }}>
            Brewed to Perfection
          </div>
          <div className="text-[9px] max-w-[200px] mx-auto mb-4" style={{ color: '#7A6A52' }}>
            Single-origin beans, slow-roasted in Hyderabad
          </div>
          <div
            className="inline-block px-4 py-1.5 rounded text-[9px] font-semibold"
            style={{ background: '#B87333', color: '#fff' }}
          >
            View Menu
          </div>
        </div>

        {/* Feature row */}
        <div className="grid grid-cols-3 divide-x" style={{ borderColor: '#1E1A10', borderTop: '1px solid #1E1A10' }}>
          {['Pour Over', 'Cold Brew', 'Espresso'].map(label => (
            <div key={label} className="py-4 text-center">
              <div className="w-6 h-6 rounded mx-auto mb-2" style={{ background: '#1E1A10' }} />
              <div className="text-[8px]" style={{ color: '#7A6A52' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Roadmap status dot ───────────────────────────────────── */
function RoadmapDot({ status }: { status: 'done' | 'active' | 'pending' }) {
  const colors = {
    done:    { outer: 'rgba(45,217,180,.15)', border: '#2DD9B4',  inner: '#2DD9B4'  },
    active:  { outer: 'rgba(45,217,180,.08)', border: '#2DD9B4',  inner: 'transparent' },
    pending: { outer: 'var(--bg-elevated)',   border: 'var(--border)', inner: '#2A3440' },
  }
  const c = colors[status]
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ background: c.outer, border: `2px solid ${c.border}` }}
    >
      {status === 'done' ? (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#2DD9B4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : status === 'active' ? (
        <div className="w-2 h-2 rounded-full animate-[pulse-dot_2s_ease-in-out_infinite]" style={{ background: '#2DD9B4' }} />
      ) : (
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#2A3440' }} />
      )}
    </div>
  )
}

/* ── Main export ──────────────────────────────────────────── */

export function ProjectsPageContent() {
  return (
    <>
      <Nav />
      <main>
        {/* ── Hero ── */}
        <PageHero
          eyebrow="Projects & Products"
          title={<>Real solutions, built<br />to solve real problems.</>}
          subtitle="We build things that actually get used. Here's what we've shipped, what we're building, and where it's going."
        />

        <GradientDivider />

        {/* ══════════════════════════════════════════════
            STEWARD — FEATURED PRODUCT
        ══════════════════════════════════════════════ */}
        <section className="py-24" aria-labelledby="steward-heading">
          <div className="max-w-[1160px] mx-auto px-7">

            {/* Section label */}
            <FadeIn className="flex items-center gap-3 mb-12">
              <span className="eyebrow">Flagship Product</span>
              <div className="h-px flex-1 max-w-[80px]" style={{ background: 'var(--border)' }} />
              <span className="badge badge-teal">
                <span className="w-1.5 h-1.5 rounded-full animate-[pulse-dot_2s_ease-in-out_infinite]" style={{ background: 'var(--accent)' }} />
                Active Development
              </span>
            </FadeIn>

            {/* Product header */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start mb-16">
              <FadeIn>
                <div>
                  <h2
                    id="steward-heading"
                    className="font-extrabold tracking-[-0.04em] leading-[1.1] text-[var(--text-1)] mb-4"
                    style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}
                  >
                    Steward
                  </h2>
                  <p
                    className="text-[17px] leading-[1.75] mb-6"
                    style={{ color: 'var(--text-2)', maxWidth: 560 }}
                  >
                    A full-stack restaurant operating system. Steward handles QR ordering, kitchen workflow, menu management, and real-time order tracking — replacing a tangle of paper tickets and third-party apps with one clean system.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {STEWARD_STACK.map(t => <TechBadge key={t} label={t} />)}
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <Link href="/contact" className="btn-primary">
                      Request a Demo <ArrowIcon size={14} />
                    </Link>
                    <Link href="/contact" className="btn-ghost">
                      Learn more about Steward
                    </Link>
                  </div>
                </div>
              </FadeIn>

              {/* The problem */}
              <FadeIn delay={0.15}>
                <div
                  className="p-6 rounded-[14px]"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
                >
                  <p className="eyebrow mb-4">The Problem</p>
                  <p className="text-[14px] leading-[1.75]" style={{ color: 'var(--text-2)' }}>
                    Most restaurants juggle multiple disconnected systems — paper order slips, separate POS terminals, manual kitchen communication, and third-party delivery apps with high commission fees.
                  </p>
                  <div className="mt-5 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
                    <p className="text-[13px] font-semibold text-[var(--text-1)] mb-3">The result is:</p>
                    <ul className="flex flex-col gap-2">
                      {['Missed or wrong orders', 'Slow table turnover', 'No clear revenue data', 'Staff communication breakdowns'].map(p => (
                        <li key={p} className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--text-2)' }}>
                          <svg className="mt-0.5 flex-shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 2v5M7 9.5v1" stroke="#E55" strokeWidth="1.5" strokeLinecap="round"/>
                            <circle cx="7" cy="7" r="6" stroke="#E55" strokeWidth="1.2"/>
                          </svg>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Screenshots */}
            <FadeIn className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-6 items-start">
                <div>
                  <p className="eyebrow mb-4">Dashboard View</p>
                  <StewardMockDashboard />
                </div>
                <div>
                  <p className="eyebrow mb-4">Customer Ordering</p>
                  <StewardMockMobile />
                </div>
              </div>
            </FadeIn>

            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <FadeIn>
                <div>
                  <p className="eyebrow mb-5">What's shipped</p>
                  <ul className="flex flex-col gap-2.5">
                    {STEWARD_FEATURES_DONE.map(f => (
                      <CheckItem key={f} done>{f}</CheckItem>
                    ))}
                  </ul>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div>
                  <p className="eyebrow mb-5">What's coming</p>
                  <ul className="flex flex-col gap-2.5">
                    {STEWARD_FEATURES_PENDING.map(f => (
                      <CheckItem key={f} done={false}>{f}</CheckItem>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>

            {/* Roadmap */}
            <FadeIn>
              <p className="eyebrow mb-6">Development Roadmap</p>
              <div
                className="rounded-[14px] overflow-hidden"
                style={{ border: '1px solid var(--border)' }}
              >
                {STEWARD_ROADMAP.map((item, i) => (
                  <div
                    key={item.phase}
                    className="flex items-start gap-5 px-7 py-5 transition-colors duration-200 hover:bg-[var(--bg-elevated)]"
                    style={{
                      borderBottom: i < STEWARD_ROADMAP.length - 1 ? '1px solid var(--border-subtle)' : undefined,
                      background: 'var(--bg-surface)',
                    }}
                  >
                    <RoadmapDot status={item.status as 'done' | 'active' | 'pending'} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <span className="font-mono text-[11px] font-bold tracking-widest" style={{ color: 'var(--text-3)' }}>
                          {item.phase}
                        </span>
                        <span className="text-[14px] font-semibold text-[var(--text-1)]">{item.label}</span>
                        {item.status === 'active' && (
                          <span className="badge badge-teal" style={{ fontSize: 10, padding: '2px 8px' }}>In Progress</span>
                        )}
                        {item.status === 'done' && (
                          <span className="badge" style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(45,217,180,.08)', color: 'var(--accent)', border: '1px solid rgba(45,217,180,.15)' }}>Shipped</span>
                        )}
                      </div>
                      <p className="text-[13px] leading-[1.6]" style={{ color: 'var(--text-2)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <GradientDivider />

        {/* ══════════════════════════════════════════════
            CLIENT WEBSITE
        ══════════════════════════════════════════════ */}
        <section className="py-24" aria-labelledby="cafe-heading">
          <div className="max-w-[1160px] mx-auto px-7">

            <FadeIn className="flex items-center gap-3 mb-12">
              <span className="eyebrow">Client Work</span>
              <div className="h-px flex-1 max-w-[80px]" style={{ background: 'var(--border)' }} />
              <span className="badge badge-blue">Delivered</span>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Info */}
              <FadeIn>
                <div>
                  <h2
                    id="cafe-heading"
                    className="font-extrabold tracking-[-0.04em] leading-[1.1] text-[var(--text-1)] mb-4"
                    style={{ fontSize: 'clamp(1.8rem,3.5vw,2.4rem)' }}
                  >
                    Cafe Website
                  </h2>
                  <p className="text-[15px] leading-[1.75] mb-8" style={{ color: 'var(--text-2)' }}>
                    A local specialty coffee brand needed a web presence that matched their premium positioning — clean, fast, and designed to turn visitors into regulars.
                  </p>

                  {/* Challenge / Process / Outcome cards */}
                  {[
                    {
                      label: 'The Challenge',
                      text: 'The client had no website. Their social media presence was doing some work but they were losing walk-in traffic to competitors who showed up in search results. They needed something live, fast.',
                    },
                    {
                      label: 'Our Process',
                      text: 'One discovery call, a shared Figma file, and three rounds of iteration. We focused on load performance (Core Web Vitals green), mobile-first layout, and copy that spoke to their regulars rather than generic coffee-shop language.',
                    },
                    {
                      label: 'Outcome',
                      text: 'Delivered in under two weeks. The site is fully responsive, scores 95+ on Lighthouse, and the client manages menu updates themselves through a simple CMS-free markdown workflow.',
                    },
                  ].map((block, i) => (
                    <FadeIn key={block.label} delay={i * 0.1}>
                      <div
                        className="mb-4 p-5 rounded-[10px]"
                        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
                      >
                        <p className="font-mono text-[11px] font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--text-3)' }}>
                          {block.label}
                        </p>
                        <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--text-2)' }}>{block.text}</p>
                      </div>
                    </FadeIn>
                  ))}

                  <FadeIn delay={0.3}>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {CLIENT_STACK.map(t => <TechBadge key={t} label={t} />)}
                    </div>
                  </FadeIn>
                </div>
              </FadeIn>

              {/* Screenshot */}
              <FadeIn delay={0.12}>
                <div>
                  <p className="eyebrow mb-4">Final Website</p>
                  <ClientWebsiteMock />

                  {/* Metrics */}
                  <div
                    className="mt-4 grid grid-cols-3 rounded-[10px] overflow-hidden"
                    style={{ border: '1px solid var(--border)' }}
                  >
                    {[
                      { label: 'Lighthouse', value: '97' },
                      { label: 'Delivery', value: '12d' },
                      { label: 'Mobile', value: '100%' },
                    ].map((m, i) => (
                      <div
                        key={m.label}
                        className="py-4 text-center"
                        style={{
                          background: 'var(--bg-surface)',
                          borderRight: i < 2 ? '1px solid var(--border)' : undefined,
                        }}
                      >
                        <div
                          className="text-[22px] font-extrabold tracking-[-0.03em] leading-none mb-1"
                          style={{ color: 'var(--accent)' }}
                        >
                          {m.value}
                        </div>
                        <div className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-3)' }}>
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <GradientDivider />

        {/* ══════════════════════════════════════════════
            MORE PROJECTS COMING SOON
        ══════════════════════════════════════════════ */}
        <section className="py-24">
          <div className="max-w-[1160px] mx-auto px-7">
            <FadeIn>
              <div
                className="rounded-[14px] p-10 md:p-14 text-center"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse,rgba(45,217,180,.06) 0%,transparent 70%)' }}
                />
                <div className="relative z-10">
                  <span className="eyebrow">What's Next</span>
                  <h3
                    className="font-bold tracking-[-0.03em] text-[var(--text-1)] mt-4 mb-4"
                    style={{ fontSize: 'clamp(1.5rem,3vw,2rem)' }}
                  >
                    More projects coming soon.
                  </h3>
                  <p className="text-[15px] leading-[1.75] max-w-[460px] mx-auto mb-8" style={{ color: 'var(--text-2)' }}>
                    We don't invent projects for appearances. Every project here is something we've actually built, with real users and real constraints. More work is in progress and will be added as it ships.
                  </p>
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <Link href="/contact" className="btn-primary">
                      Start a project with us <ArrowIcon size={14} />
                    </Link>
                    <Link href="/about" className="btn-ghost">
                      Learn about our process
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Internal experiments note ── */}
        <section className="pb-24">
          <div className="max-w-[1160px] mx-auto px-7">
            <FadeIn>
              <div
                className="flex items-start gap-4 p-5 rounded-[10px]"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
              >
                <div
                  className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2h4M7 2v2l-3 4H3a1 1 0 000 2h10a1 1 0 000-2h-1L9 4V2M5 12v2M11 12v2"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[var(--text-1)] mb-1">Internal Experiments</p>
                  <p className="text-[13px] leading-[1.65]" style={{ color: 'var(--text-2)' }}>
                    We run ongoing internal experiments — automation tools, developer utilities, and product prototypes. These inform how we work and what we build next. They live in private repos until they're worth sharing.
                  </p>
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
