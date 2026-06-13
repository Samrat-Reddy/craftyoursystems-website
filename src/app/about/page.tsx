// src/app/about/page.tsx
import type { Metadata } from 'next'
import { AboutPageContent } from '@/components/AboutPageContent'

export const metadata: Metadata = {
  title: 'About — Craft Your Systems',
  description:
    'CYS is a student-led technology studio founded in March 2026. We build software systems and digital experiences that solve real problems.',
}

export default function AboutPage() {
  return <AboutPageContent />
}
