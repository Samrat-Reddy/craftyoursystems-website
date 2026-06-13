// src/app/page.tsx
import { Nav } from '@/components/Nav'
import { HeroSection } from '@/components/HeroSection'
import {
  SolutionsSection,
  FeaturedProjectSection,
  StatsSection,
  ProjectsSection,
  TimelineSection,
  VisionSection,
  CTASection,
  Footer,
} from '@/components/sections'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <div className="h-px" style={{ background: 'linear-gradient(90deg,transparent,var(--border),transparent)' }} />
        <SolutionsSection />
        <FeaturedProjectSection />
        <StatsSection />
        <ProjectsSection />
        <TimelineSection />
        <VisionSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
