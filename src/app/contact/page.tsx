// src/app/contact/page.tsx
import type { Metadata } from 'next'
import { ContactPageContent } from '@/components/ContactPageContent'

export const metadata: Metadata = {
  title: 'Contact — Craft Your Systems',
  description:
    'Start a project with CYS. Tell us about your idea and we\'ll get back to you quickly.',
}

export default function ContactPage() {
  return <ContactPageContent />
}
