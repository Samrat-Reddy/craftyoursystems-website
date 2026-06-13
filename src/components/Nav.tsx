'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/projects',   label: 'Projects'  },
  { href: '/about',      label: 'About'     },
  { href: '/#solutions', label: 'Solutions' },
  { href: '/#vision',    label: 'Vision'    },
  { href: '/contact',    label: 'Contact'   },
]

export function Nav() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname                    = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  function isActive(href: string) {
    if (href.startsWith('/#')) return false
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[68px] transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(8,10,12,0.88)] border-b border-[#131920] backdrop-blur-[16px]'
            : 'border-b border-transparent'
        }`}
      >
        <div className="max-w-[1160px] mx-auto px-7 h-full flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-[15px] tracking-[-0.02em]"
            style={{ color: 'var(--text-1)' }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9L9 3L15 9L9 15L3 9Z" stroke="#2DD9B4" strokeWidth="1.5" fill="none"/>
                <path d="M6 9L9 6L12 9L9 12L6 9Z" fill="#2DD9B4" fillOpacity="0.4"/>
              </svg>
            </div>
            CYS
          </Link>

          <ul className="hidden md:flex items-center">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="relative text-sm font-medium px-4 py-2 rounded-[6px] transition-colors duration-200"
                  style={{
                    color: isActive(href) ? 'var(--text-1)' : 'var(--text-2)',
                    background: isActive(href) ? 'var(--bg-elevated)' : 'transparent',
                  }}
                >
                  {label}
                  {isActive(href) && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full"
                      style={{ background: 'var(--accent)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden md:inline-flex btn-ghost" style={{ fontSize: '13px', padding: '9px 18px' }}>
              Let's Talk
            </Link>
            <Link href="/contact" className="btn-primary" style={{ fontSize: '13px', padding: '9px 18px' }}>
              Start a Project
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <button
              className="md:hidden flex flex-col gap-[5px] p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              {[0,1,2].map(i => (
                <span key={i} className="w-[22px] h-[1.5px] rounded-sm block" style={{ background: 'var(--text-2)' }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[190]"
              style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              className="fixed top-0 right-0 bottom-0 z-[200] flex flex-col gap-1 pt-20 px-7 pb-10"
              style={{ width: 'min(320px,85vw)', background: '#0D1117', borderLeft: '1px solid var(--border)' }}
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            >
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href} href={href}
                  className="text-base font-medium py-3 transition-colors duration-200"
                  style={{ color: isActive(href) ? 'var(--accent)' : 'var(--text-2)', borderBottom: '1px solid var(--border-subtle)' }}
                >
                  {label}
                </Link>
              ))}
              <Link href="/contact" className="btn-primary justify-center mt-6">Start a Project →</Link>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
