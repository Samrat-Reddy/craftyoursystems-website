// src/lib/motion.ts
// ─────────────────────────────────────────────────────────────
// Centralised animation variants for consistent motion across
// every page. Import these instead of defining inline.
// ─────────────────────────────────────────────────────────────

import type { Variants } from 'framer-motion'

/* Fade up — default scroll reveal */
export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

/* Fade in — no vertical movement */
export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, ease: 'easeOut', delay },
})

/* Stagger container — wraps children with staggered delay */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

/* Stagger child — used inside staggerContainer */
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

/* Slide in from left */
export const slideInLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

/* Slide in from right */
export const slideInRight = (delay = 0) => ({
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

/* Scale in — for cards, modals */
export const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

/* Viewport-aware fade up — for use with whileInView */
export const viewFadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

/* Viewport-aware stagger container */
export const viewStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

/* Viewport-aware stagger child */
export const viewChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}
