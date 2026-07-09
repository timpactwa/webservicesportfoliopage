import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}', // data.ts holds gradient class names (e.g. project cards)
  ],
  theme: {
    extend: {
      colors: {
        // Warm-neutral rebrand palette. Values live as OKLCH CSS vars in globals.css
        // so the whole system can be tuned in one place; the alpha syntax below lets
        // utilities like `bg-accent/10` keep working.
        bg: 'oklch(var(--bg) / <alpha-value>)',
        surface: 'oklch(var(--surface) / <alpha-value>)',
        hairline: 'var(--hairline)',
        // `accent` name kept (was blue) — now the quiet teal. Repointing here restyles
        // every existing text-accent / bg-accent usage for free.
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          light: 'oklch(var(--accent) / <alpha-value>)',
          dark: 'oklch(var(--accent-dark) / <alpha-value>)',
          soft: 'oklch(var(--accent-soft) / <alpha-value>)',
        },
        // `charcoal` name kept (was near-black) — now warm graphite.
        charcoal: {
          DEFAULT: 'oklch(var(--graphite) / <alpha-value>)',
          soft: 'oklch(var(--graphite) / <alpha-value>)',
          muted: 'oklch(var(--graphite-soft) / <alpha-value>)',
        },
        graphite: {
          DEFAULT: 'oklch(var(--graphite) / <alpha-value>)',
          soft: 'oklch(var(--graphite-soft) / <alpha-value>)',
          light: 'oklch(var(--graphite-light) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter-tight)', 'Inter Tight', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(2.75rem, 7vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-xl': ['clamp(2.25rem, 5vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(1.875rem, 4vw, 3rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        card: '20px',
        'card-lg': '24px',
      },
      boxShadow: {
        card: '0 4px 24px oklch(var(--graphite) / 0.06)',
        'card-hover': '0 12px 48px oklch(var(--graphite) / 0.12)',
        'hero-visual': '0 30px 80px -30px oklch(var(--graphite) / 0.25)',
      },
      keyframes: {
        'marquee-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee-scroll 22s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
