// src/app/projects/page.tsx
import type { Metadata } from 'next'
import { ProjectsPageContent } from '@/components/ProjectsPageContent'

export const metadata: Metadata = {
  title: 'Projects & Products — Craft Your Systems',
  description:
    'Real solutions built to solve real-world problems. Steward restaurant operating system and client work by CYS.',
}

export default function ProjectsPage() {
  return <ProjectsPageContent />
}
