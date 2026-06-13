'use client'

// src/components/ui/primitives.tsx
// ─────────────────────────────────────────────────────────────
// Reusable building blocks shared across Projects, About, Contact
// and the homepage. All tokens come from globals.css :root vars.
// ─────────────────────────────────────────────────────────────

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { viewFadeUp } from '@/lib/motion'

/* ── FadeIn ──────────────────────────────────────────────────
   Wraps any child in a viewport-triggered fade-up reveal.
   Pass `delay` (seconds) to stagger multiple siblings.
───────────────────────────────────────────────────────────── */
export function FadeIn({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: React.ElementType
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

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

/* ── SectionHeader ───────────────────────────────────────────
   Eyebrow + Title + optional subtitle, centred or left-aligned.
───────────────────────────────────────────────────────────── */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}: {
  eyebrow: string
  title: React.ReactNode
  subtitle?: string
  align?: 'center' | 'left'
  className?: string
}) {
  const centered = align === 'center'
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <FadeIn>
        <span className="eyebrow">{eyebrow}</span>
      </FadeIn>
      <FadeIn delay={0.08}>
        <h2 className="section-title mt-4">{title}</h2>
      </FadeIn>
      {subtitle && (
        <FadeIn delay={0.16}>
          <p
            className={`mt-4 text-[15px] leading-[1.75] ${centered ? 'max-w-[520px] mx-auto' : 'max-w-[580px]'}`}
            style={{ color: 'var(--text-2)' }}
          >
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  )
}

/* ── PageHero ────────────────────────────────────────────────
   Inner-page hero (smaller than homepage). Grid bg + glow orb.
───────────────────────────────────────────────────────────── */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  badge,
  children,
}: {
  eyebrow: string
  title: React.ReactNode
  subtitle?: string
  badge?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <section className="relative pt-[68px] overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(45,217,180,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(45,217,180,.03) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 0%,black 30%,transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 0%,black 30%,transparent 100%)',
        }}
      />
      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse,rgba(45,217,180,.07) 0%,transparent 70%)',
        }}
      />

      <div className="max-w-[1160px] mx-auto px-7 relative z-10 py-20 md:py-28 text-center">
        {badge && (
          <motion.div
            className="flex justify-center mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {badge}
          </motion.div>
        )}

        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {eyebrow}
        </motion.span>

        <motion.h1
          className="mt-5 font-extrabold tracking-[-0.04em] leading-[1.1] text-[var(--text-1)]"
          style={{ fontSize: 'clamp(2.4rem,5vw,3.6rem)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="mt-5 text-[17px] leading-[1.7] max-w-[540px] mx-auto"
            style={{ color: 'var(--text-2)' }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            className="mt-8 flex items-center justify-center gap-3 flex-wrap"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}

/* ── GradientDivider ─────────────────────────────────────────
   Subtle horizontal rule that fades out at edges.
───────────────────────────────────────────────────────────── */
export function GradientDivider({ className = '' }: { className?: string }) {
  return (
    <div
      className={`h-px ${className}`}
      style={{
        background:
          'linear-gradient(90deg,transparent,var(--border),transparent)',
      }}
    />
  )
}

/* ── TechBadge ───────────────────────────────────────────────
   Small mono pill for technology labels.
───────────────────────────────────────────────────────────── */
export function TechBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-[6px] font-mono text-[11px] font-semibold tracking-[0.04em]"
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        color: 'var(--text-2)',
      }}
    >
      {label}
    </span>
  )
}

/* ── ArrowIcon ───────────────────────────────────────────────
   Reusable diagonal arrow for CTAs and links.
───────────────────────────────────────────────────────────── */
export function ArrowIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path
        d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ── CheckItem ───────────────────────────────────────────────
   Teal check + label row for feature/progress lists.
───────────────────────────────────────────────────────────── */
export function CheckItem({
  children,
  done = true,
}: {
  children: React.ReactNode
  done?: boolean
}) {
  return (
    <li
      className={`flex items-center gap-2.5 text-[13px] py-0.5 ${
        done ? 'text-[var(--text-1)]' : 'text-[var(--text-3)]'
      }`}
    >
      <div
        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background: done ? 'var(--accent-glow)' : 'var(--bg-elevated)',
          border: done
            ? '1px solid var(--accent-border)'
            : '1px solid var(--border)',
        }}
      >
        {done ? (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path
              d="M1.5 4L3.5 6L6.5 2"
              stroke="#2DD9B4"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: '#2A3440' }}
          />
        )}
      </div>
      {children}
    </li>
  )
}
