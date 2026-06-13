'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '#solutions', label: 'Solutions' },
  { href: '#projects', label: 'Projects' },
  { href: '#vision', label: 'Vision' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[68px] transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(8,10,12,0.85)] border-b border-[#131920] backdrop-blur-[16px]'
            : 'border-b border-transparent'
        }`}
      >
        <div className="max-w-[1160px] mx-auto px-7 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-[15px] tracking-[-0.02em] text-[var(--text-1)]">
            <div className="w-8 h-8 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9L9 3L15 9L9 15L3 9Z" stroke="#2DD9B4" strokeWidth="1.5" fill="none"/>
                <path d="M6 9L9 6L12 9L9 12L6 9Z" fill="#2DD9B4" fillOpacity="0.4"/>
              </svg>
            </div>
            CYS
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-sm font-medium text-[var(--text-2)] px-4 py-2 rounded-[6px] hover:text-[var(--text-1)] hover:bg-[var(--bg-elevated)] transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex btn-ghost text-[13px] !px-[18px] !py-[9px]"
            >
              Let's Talk
            </a>
            <a
              href="#contact"
              className="btn-primary text-[13px] !px-[18px] !py-[9px]"
            >
              Start a Project
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <button
              className="md:hidden flex flex-col gap-[5px] p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span className="w-[22px] h-[1.5px] bg-[var(--text-2)] rounded-[2px]" />
              <span className="w-[22px] h-[1.5px] bg-[var(--text-2)] rounded-[2px]" />
              <span className="w-[22px] h-[1.5px] bg-[var(--text-2)] rounded-[2px]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[190] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[200] w-[min(320px,85vw)] bg-[#0D1117] border-l border-[var(--border)] flex flex-col gap-2 pt-20 px-7 pb-10"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            >
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-[var(--text-2)] py-3 border-b border-[var(--border-subtle)] hover:text-[var(--text-1)] transition-colors"
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary justify-center mt-6"
              >
                Start a Project →
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
