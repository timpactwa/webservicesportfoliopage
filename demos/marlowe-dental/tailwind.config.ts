import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        porcelain: '#FBF9F6',
        petrol: '#0F3B43',
        petrolDeep: '#0A2A30',
        sage: '#6FA48F',
        powder: '#D8E7EB',
        sand: '#EFE7DA',
        stone: '#55666C',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-figtree)', 'sans-serif'],
      },
      borderRadius: {
        arc: '3rem',
      },
    },
  },
  plugins: [],
}
export default config
