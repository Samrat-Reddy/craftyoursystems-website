// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Craft Your Systems — Engineering Solutions. Real Impact.',
  description:
    'CYS is a student-led technology studio building software systems, digital experiences, and custom solutions that solve real problems.',
  keywords: ['software studio', 'web development', 'software systems', 'Hyderabad', 'CYS', 'Craft Your Systems'],
  authors: [{ name: 'Craft Your Systems' }],
  openGraph: {
    title: 'Craft Your Systems',
    description: 'Building systems that solve real problems.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Craft Your Systems',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Craft Your Systems',
    description: 'Building systems that solve real problems.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        {/* Noise texture overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            pointerEvents: 'none',
            opacity: 0.025,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '256px',
          }}
        />
        {children}
      </body>
    </html>
  )
}
