// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': '#080A0C',
        'bg-surface': '#0D1117',
        'bg-elevated': '#131A22',
        'accent': '#2DD9B4',
        'text-1': '#F0F6FC',
        'text-2': '#8B949E',
        'text-3': '#4A5568',
        'border-default': '#1E2530',
        'border-subtle': '#131920',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '14px',
        'xl': '22px',
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease forwards',
        'cube-rotate': 'cube-rotate 20s linear infinite',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.8)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(45,217,180,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,217,180,.04) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
}

export default config
