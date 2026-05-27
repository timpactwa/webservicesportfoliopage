# Fuego Street Tacos Demo Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone Next.js 14 demo website for "Fuego Street Tacos" — a fake casual street taco restaurant — to serve as a Render agency portfolio piece demonstrating a Standard plan deliverable.

**Architecture:** Standalone Next.js 14 App Router project at `demos/fuego-street-tacos/` with Tailwind CSS custom tokens, Framer Motion animations, Google Fonts (Pacifico + Nunito), and no backend. Five pages: Home, Menu, About, Gallery, Contact.

**Tech Stack:** Next.js 14, Tailwind CSS, Framer Motion, next/font/google, local state forms

**Spec:** `docs/superpowers/specs/2026-05-27-mexican-restaurant-demo-design.md`

---

## File Map

| File | Purpose |
|------|---------|
| `demos/fuego-street-tacos/package.json` | Project config |
| `demos/fuego-street-tacos/tailwind.config.ts` | Custom color tokens (fuego, golden, verde, charcoal, cream) |
| `demos/fuego-street-tacos/app/layout.tsx` | Root layout: fonts, metadata, Navbar + Footer |
| `demos/fuego-street-tacos/app/globals.css` | Tailwind directives + base styles |
| `demos/fuego-street-tacos/app/page.tsx` | Home page |
| `demos/fuego-street-tacos/app/menu/page.tsx` | Menu page |
| `demos/fuego-street-tacos/app/about/page.tsx` | About page |
| `demos/fuego-street-tacos/app/gallery/page.tsx` | Gallery page |
| `demos/fuego-street-tacos/app/contact/page.tsx` | Contact page |
| `demos/fuego-street-tacos/components/layout/Navbar.tsx` | Site navbar |
| `demos/fuego-street-tacos/components/layout/Footer.tsx` | Site footer |
| `demos/fuego-street-tacos/lib/menu-data.ts` | All menu content as typed data |
| `demos/fuego-street-tacos/next.config.js` | Next.js config |
| `demos/fuego-street-tacos/tsconfig.json` | TypeScript config with `@/` alias |
| `demos/fuego-street-tacos/postcss.config.js` | PostCSS for Tailwind |

---

## Task 1: Project Scaffold + Design System + Layout Components
**Model: Opus** (foundation — everything else builds on this)

**Files:**
- Create: all config files listed above
- Create: `components/layout/Navbar.tsx`
- Create: `components/layout/Footer.tsx`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `lib/menu-data.ts`

- [ ] **Step 1: Create the directory and initialize package.json**

Run from `C:\Users\tpact\WebServiesRoot`:
```bash
mkdir -p demos/fuego-street-tacos
```

Create `demos/fuego-street-tacos/package.json`:
```json
{
  "name": "fuego-street-tacos",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3100",
    "build": "next build",
    "start": "next start -p 3100",
    "lint": "next lint"
  },
  "dependencies": {
    "framer-motion": "^11.0.0",
    "next": "14.2.35",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.2.35",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Create config files**

`demos/fuego-street-tacos/next.config.js`:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = nextConfig
```

`demos/fuego-street-tacos/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`demos/fuego-street-tacos/postcss.config.js`:
```js
module.exports = {
  plugins: { tailwindcss: {}, autoprefixer: {} }
}
```

- [ ] **Step 3: Create Tailwind config with custom tokens**

`demos/fuego-street-tacos/tailwind.config.ts`:
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fuego: '#E63946',
        golden: '#F4A261',
        verde: '#06D6A0',
        charcoal: '#1B1B2E',
        cream: '#FFFBF2',
        muted: '#6B6570',
      },
      fontFamily: {
        display: ['var(--font-pacifico)', 'cursive'],
        body: ['var(--font-nunito)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 4: Create globals.css**

`demos/fuego-street-tacos/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #FFFBF2;
  color: #1B1B2E;
  font-family: var(--font-nunito), sans-serif;
}
```

- [ ] **Step 5: Create menu-data.ts**

`demos/fuego-street-tacos/lib/menu-data.ts`:
```ts
export const TACOS = [
  { name: 'Carne Asada', description: 'Grilled skirt steak, pico, guacamole', price: '$5' },
  { name: 'Al Pastor', description: 'Marinated pork, pineapple, cilantro, onion', price: '$5' },
  { name: 'Pollo Adobado', description: 'Chipotle chicken, avocado crema, jalapeño', price: '$4.50' },
  { name: 'Pescado', description: 'Crispy fried fish, purple slaw, lime crema', price: '$5' },
  { name: 'Barbacoa', description: 'Slow-braised beef, salsa verde, white onion', price: '$5' },
  { name: 'Vegano 🌱', description: 'Roasted poblano, black bean, mango salsa', price: '$4' },
]

export const PLATES = [
  { name: 'Taco Plate', description: '3 tacos + Mexican rice + beans', price: '$14' },
  { name: 'Burrito Bowl', description: 'Your choice of protein, rice, guac, pico', price: '$13' },
  { name: 'Quesadilla Grande', description: 'Oaxacan cheese, peppers, crema', price: '$12' },
]

export const EXTRAS = [
  { name: 'Guacamole + Chips', description: 'House-made fresh', price: '$8' },
  { name: 'Elotes Callejeros', description: 'Street-style corn, cotija, chili lime', price: '$6' },
  { name: 'Extra Jalapeños', description: '', price: '$2' },
]

export const DRINKS = [
  { name: 'Horchata', description: 'House rice milk, cinnamon', price: '$4' },
  { name: 'Agua Fresca', description: 'Hibiscus / Watermelon / Tamarind', price: '$4' },
  { name: 'Mexican Coke', description: 'Glass bottle, cane sugar', price: '$4' },
  { name: 'Jarritos', description: 'Mandarin, lime, or tamarind', price: '$4' },
]

export const DESSERTS = [
  { name: 'Churros', description: 'Cinnamon sugar, cajeta dipping sauce', price: '$7' },
  { name: 'Tres Leches Cup', description: 'House-made, fresh strawberries', price: '$6' },
]
```

- [ ] **Step 6: Create Navbar component**

`demos/fuego-street-tacos/components/layout/Navbar.tsx`:
```tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-charcoal text-white">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="font-display text-2xl text-golden tracking-wide">
          Fuego 🌮
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-body text-sm font-semibold transition-colors ${
                pathname === l.href ? 'text-golden' : 'text-white/80 hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 bg-fuego text-white font-body font-bold text-sm px-5 py-2.5 rounded-full hover:bg-fuego/90 transition-colors"
        >
          Book a Table
        </Link>
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-charcoal border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-body font-semibold text-white/80 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="inline-flex w-fit items-center bg-fuego text-white font-body font-bold text-sm px-5 py-2.5 rounded-full"
          >
            Book a Table
          </Link>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 7: Create Footer component**

`demos/fuego-street-tacos/components/layout/Footer.tsx`:
```tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/70 font-body">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-2xl text-golden mb-3">Fuego 🌮</p>
          <p className="text-sm leading-relaxed">Born on the block.<br />Built for the hungry.</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-4 uppercase tracking-widest text-xs">Hours</p>
          <ul className="text-sm space-y-1.5">
            <li>Mon–Thu · 11am – 9pm</li>
            <li>Fri–Sat · 11am – 11pm</li>
            <li>Sun · 12pm – 8pm</li>
            <li className="text-fuego">Closed Tuesdays</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-4 uppercase tracking-widest text-xs">Find Us</p>
          <ul className="text-sm space-y-1.5">
            <li>47 South Street</li>
            <li>Morristown, NJ 07960</li>
            <li className="mt-3">
              <a href="tel:9735550198" className="text-golden hover:text-golden/80">(973) 555-0198</a>
            </li>
            <li>
              <a href="mailto:hola@fuegotacos.com" className="text-golden hover:text-golden/80">hola@fuegotacos.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-white/40">
        © 2025 Fuego Street Tacos ·{' '}
        <a href="https://render.build" className="text-verde hover:text-verde/80">Site by Render</a>
      </div>
    </footer>
  )
}
```

- [ ] **Step 8: Create root layout**

`demos/fuego-street-tacos/app/layout.tsx`:
```tsx
import type { Metadata } from 'next'
import { Pacifico, Nunito } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: { default: 'Fuego Street Tacos', template: '%s | Fuego Street Tacos' },
  description: 'Authentic street tacos in Morristown, NJ. Born on the block, built for the hungry.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pacifico.variable} ${nunito.variable}`}>
      <body className="font-body bg-cream text-charcoal">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 9: Install dependencies**

Run from `demos/fuego-street-tacos/`:
```bash
npm install
```

- [ ] **Step 10: Verify the scaffold builds**

Run from `demos/fuego-street-tacos/`:
```bash
npm run build
```
Expected: build succeeds (even with stub pages, may need to create a placeholder `app/page.tsx` returning `<div/>` first).

- [ ] **Step 11: Commit**

```bash
git add demos/fuego-street-tacos/
git commit -m "feat: scaffold Fuego Street Tacos demo — config, design system, nav, footer, menu data"
```

---

## Task 2: Home Page
**Model: Opus** (first impression, most design-critical page)

**Files:**
- Create: `demos/fuego-street-tacos/app/page.tsx`

- [ ] **Step 1: Create the home page**

`demos/fuego-street-tacos/app/page.tsx`:
```tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const FEATURED = [
  { name: 'Carne Asada', desc: 'Grilled skirt steak, pico, guacamole', price: '$5', from: 'from-red-600', to: 'to-orange-500', emoji: '🥩' },
  { name: 'Al Pastor', desc: 'Marinated pork, pineapple, cilantro', price: '$5', from: 'from-amber-500', to: 'to-yellow-400', emoji: '🍍' },
  { name: 'Pescado', desc: 'Crispy fried fish, purple slaw, lime crema', price: '$5', from: 'from-teal-500', to: 'to-emerald-400', emoji: '🐟' },
]

const WHY = [
  { icon: '🌿', label: 'Fresh Daily', desc: 'Every ingredient prepped that morning. No shortcuts.' },
  { icon: '🔥', label: 'Made to Order', desc: 'Your food hits the grill when you order. Always hot.' },
  { icon: '🤝', label: 'Real Recipes', desc: "Family recipes, not a formula. You taste the difference." },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen bg-charcoal flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #E63946 0, #E63946 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }}
        />
        <div className="max-w-6xl mx-auto px-6 py-32 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-body text-golden font-bold uppercase tracking-widest text-sm mb-6"
          >
            Morristown, NJ · Est. 2021
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-white text-6xl sm:text-7xl md:text-8xl leading-none mb-6"
          >
            Fuego<br />
            <span className="text-fuego">Street</span><br />
            Tacos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-white/70 text-xl max-w-md mb-10 leading-relaxed"
          >
            Born on the block. Built for the hungry.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/menu"
              className="bg-fuego text-white font-body font-bold px-8 py-4 rounded-full text-base hover:bg-fuego/90 transition-colors">
              See the Menu →
            </Link>
            <Link href="/contact"
              className="border-2 border-white/30 text-white font-body font-bold px-8 py-4 rounded-full text-base hover:border-white transition-colors">
              Book a Table
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Zigzag divider */}
      <div className="h-6 bg-cream" style={{ clipPath: 'polygon(0 100%, 2.5% 0, 5% 100%, 7.5% 0, 10% 100%, 12.5% 0, 15% 100%, 17.5% 0, 20% 100%, 22.5% 0, 25% 100%, 27.5% 0, 30% 100%, 32.5% 0, 35% 100%, 37.5% 0, 40% 100%, 42.5% 0, 45% 100%, 47.5% 0, 50% 100%, 52.5% 0, 55% 100%, 57.5% 0, 60% 100%, 62.5% 0, 65% 100%, 67.5% 0, 70% 100%, 72.5% 0, 75% 100%, 77.5% 0, 80% 100%, 82.5% 0, 85% 100%, 87.5% 0, 90% 100%, 92.5% 0, 95% 100%, 97.5% 0, 100% 100%)' }} />

      {/* Featured Tacos */}
      <section className="bg-cream py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-14"
          >
            <motion.p variants={fadeUp} custom={0} className="font-body text-fuego font-bold uppercase tracking-widest text-sm mb-3">
              Fan Favorites
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-5xl text-charcoal">
              The Must-Orders
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURED.map((taco, i) => (
              <motion.div
                key={taco.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`h-52 bg-gradient-to-br ${taco.from} ${taco.to} flex items-center justify-center text-7xl`}>
                  {taco.emoji}
                </div>
                <div className="bg-white p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display text-2xl text-charcoal">{taco.name}</h3>
                    <span className="font-body font-black text-fuego text-lg">{taco.price}</span>
                  </div>
                  <p className="font-body text-muted text-sm">{taco.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/menu"
              className="inline-flex font-body font-bold text-charcoal border-b-2 border-fuego pb-0.5 hover:text-fuego transition-colors">
              View full menu →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Fuego */}
      <section className="bg-fuego py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {WHY.map((w, i) => (
              <motion.div
                key={w.label}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <div className="text-5xl mb-4">{w.icon}</div>
                <h3 className="font-display text-white text-2xl mb-2">{w.label}</h3>
                <p className="font-body text-white/80 text-sm leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-charcoal py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display text-golden text-5xl md:text-6xl mb-4">Ready to eat?</p>
          <a href="tel:9735550198" className="font-body text-white/60 text-xl mb-10 block hover:text-white transition-colors">
            (973) 555-0198
          </a>
          <Link href="/contact"
            className="inline-flex bg-fuego text-white font-body font-bold px-10 py-4 rounded-full text-base hover:bg-fuego/90 transition-colors">
            Book a Table →
          </Link>
        </motion.div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Run dev server and verify visually**

```bash
npm run dev
```
Open `http://localhost:3100`. Verify:
- Hero shows dark background with diagonal pattern, big Pacifico heading, two CTA buttons
- Zigzag divider visible between hero and featured section
- Three taco cards render with gradient image areas and emoji
- Red "Why Fuego" strip shows with 3 columns
- CTA banner at bottom

- [ ] **Step 3: Commit**

```bash
git add demos/fuego-street-tacos/app/page.tsx
git commit -m "feat: Fuego home page — hero, featured tacos, why section, CTA banner"
```

---

## Task 3: Menu Page
**Model: Sonnet**

**Files:**
- Create: `demos/fuego-street-tacos/app/menu/page.tsx`

- [ ] **Step 1: Create menu page**

`demos/fuego-street-tacos/app/menu/page.tsx`:
```tsx
import type { Metadata } from 'next'
import { TACOS, PLATES, EXTRAS, DRINKS, DESSERTS } from '@/lib/menu-data'

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Full menu at Fuego Street Tacos — tacos, plates, drinks, and more in Morristown, NJ.',
}

type Item = { name: string; description: string; price: string }

function MenuSection({ title, items, note }: { title: string; items: Item[]; note?: string }) {
  return (
    <div className="mb-16">
      <div className="flex items-baseline gap-4 mb-6 pb-3 border-b-2 border-fuego">
        <h2 className="font-display text-4xl text-charcoal">{title}</h2>
        {note && <span className="font-body text-sm text-muted">{note}</span>}
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {items.map(item => (
          <div key={item.name} className="flex justify-between gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm">
            <div className="min-w-0">
              <p className="font-body font-bold text-charcoal">{item.name}</p>
              {item.description && (
                <p className="font-body text-sm text-muted mt-0.5 leading-snug">{item.description}</p>
              )}
            </div>
            <p className="font-body font-black text-fuego text-base shrink-0">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MenuPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-charcoal py-20 text-center">
        <p className="font-body text-golden font-bold uppercase tracking-widest text-sm mb-3">What We've Got</p>
        <h1 className="font-display text-white text-6xl">The Menu</h1>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <MenuSection title="Tacos 🌮" items={TACOS} note="Minimum 2 per order" />
        <MenuSection title="Plates" items={PLATES} />
        <MenuSection title="Extras" items={EXTRAS} />
        <MenuSection title="Drinks" items={DRINKS} />
        <MenuSection title="Desserts 🍮" items={DESSERTS} />
        <p className="font-body text-sm text-muted text-center mt-8">
          Consuming raw or undercooked foods may increase risk of foodborne illness. Please inform your server of any allergies.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Open `http://localhost:3100/menu`. Check all 5 sections render with correct data, prices align right, fuego-red accents on section headers.

- [ ] **Step 3: Commit**

```bash
git add demos/fuego-street-tacos/app/menu/
git commit -m "feat: Fuego menu page — all categories with prices and descriptions"
```

---

## Task 4: About + Gallery Pages
**Model: Sonnet**

**Files:**
- Create: `demos/fuego-street-tacos/app/about/page.tsx`
- Create: `demos/fuego-street-tacos/app/gallery/page.tsx`

- [ ] **Step 1: Create About page**

`demos/fuego-street-tacos/app/about/page.tsx`:
```tsx
'use client'
import type { Metadata } from 'next'
import { motion } from 'framer-motion'
import Link from 'next/link'

const VALUES = [
  { emoji: '🌽', title: 'Locally Sourced', desc: 'We source our produce from farms within 50 miles. Fresh ingredients make better food. Simple.' },
  { emoji: '👨‍🍳', title: 'Made Fresh', desc: 'No freezer mystery. Every tortilla, every salsa, every guac is made the same day it hits your plate.' },
  { emoji: '📖', title: 'Real Recipes', desc: 'Our recipes come from families, not food labs. The al pastor marinade has been in the family for three generations.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-charcoal py-20 text-center">
        <p className="font-body text-golden font-bold uppercase tracking-widest text-sm mb-3">Our Story</p>
        <h1 className="font-display text-white text-6xl">Built Different</h1>
      </div>

      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="h-72 rounded-3xl bg-gradient-to-br from-fuego to-golden flex items-center justify-center text-8xl shadow-lg">
              🌮
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-display text-4xl text-charcoal mb-6">Started on a folding table.</h2>
            <p className="font-body text-muted leading-relaxed mb-4">
              Fuego started in 2021 as a weekend pop-up in the Morristown Green parking lot. Two friends, a borrowed griddle, and 40 pounds of skirt steak. We sold out in 90 minutes.
            </p>
            <p className="font-body text-muted leading-relaxed">
              Two years later we opened the doors on South Street. Same recipes. Same obsession with getting it right. Just a real kitchen now — and a lot more tortillas.
            </p>
          </motion.div>
        </div>

        <div className="mb-24">
          <h2 className="font-display text-4xl text-charcoal text-center mb-12">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-white rounded-3xl p-8 shadow-sm text-center"
              >
                <div className="text-5xl mb-4">{v.emoji}</div>
                <h3 className="font-display text-2xl text-charcoal mb-3">{v.title}</h3>
                <p className="font-body text-muted text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-fuego rounded-3xl p-10 text-center">
          <h2 className="font-display text-white text-4xl mb-4">Come find us.</h2>
          <p className="font-body text-white/80 mb-8">47 South Street · Morristown, NJ · Open 6 days a week</p>
          <Link href="/menu" className="inline-flex bg-white text-fuego font-body font-bold px-8 py-3.5 rounded-full hover:bg-cream transition-colors">
            See the Menu →
          </Link>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Create Gallery page**

`demos/fuego-street-tacos/app/gallery/page.tsx`:
```tsx
'use client'
import { motion } from 'framer-motion'

const PHOTOS = [
  { caption: 'The Al Pastor', from: 'from-amber-400', to: 'to-orange-500', emoji: '🍍', tall: true },
  { caption: 'Carne Asada Night', from: 'from-red-500', to: 'to-rose-700', emoji: '🔥', tall: false },
  { caption: 'Fresh Guac', from: 'from-emerald-400', to: 'to-green-600', emoji: '🥑', tall: false },
  { caption: 'Street Corn', from: 'from-yellow-400', to: 'to-amber-500', emoji: '🌽', tall: true },
  { caption: 'Saturday Night', from: 'from-fuego to-rose-600', to: 'to-rose-600', emoji: '✨', tall: false },
  { caption: 'The Pescado', from: 'from-teal-400', to: 'to-cyan-600', emoji: '🐟', tall: false },
  { caption: 'Tres Leches', from: 'from-pink-300', to: 'to-rose-400', emoji: '🍓', tall: true },
  { caption: 'Agua Fresca', from: 'from-red-400', to: 'to-pink-500', emoji: '🌺', tall: false },
  { caption: 'Churros', from: 'from-amber-500', to: 'to-yellow-600', emoji: '🍩', tall: false },
]

export default function GalleryPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-charcoal py-20 text-center">
        <p className="font-body text-golden font-bold uppercase tracking-widest text-sm mb-3">The Vibe</p>
        <h1 className="font-display text-white text-6xl">Gallery</h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="columns-2 md:columns-3 gap-5 space-y-5">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.caption}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="break-inside-avoid rounded-3xl overflow-hidden shadow-md cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${photo.from} ${photo.to} flex items-center justify-center ${photo.tall ? 'h-72' : 'h-48'} text-7xl`}>
                {photo.emoji}
              </div>
              <div className="bg-white px-5 py-3">
                <p className="font-body font-semibold text-charcoal text-sm">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify both pages**

Check `http://localhost:3100/about` — story layout, values grid, CTA strip.
Check `http://localhost:3100/gallery` — masonry columns, gradient cards, hover lift.

- [ ] **Step 4: Commit**

```bash
git add demos/fuego-street-tacos/app/about/ demos/fuego-street-tacos/app/gallery/
git commit -m "feat: Fuego about and gallery pages"
```

---

## Task 5: Contact Page
**Model: Haiku** (form + info layout — straightforward)

**Files:**
- Create: `demos/fuego-street-tacos/app/contact/page.tsx`

- [ ] **Step 1: Create contact page**

`demos/fuego-street-tacos/app/contact/page.tsx`:
```tsx
'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', party: '2', notes: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass = "w-full font-body bg-white border-2 border-neutral-200 rounded-xl px-4 py-3 text-charcoal focus:outline-none focus:border-fuego transition-colors"
  const labelClass = "block font-body font-semibold text-charcoal text-sm mb-1.5"

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-charcoal py-20 text-center">
        <p className="font-body text-golden font-bold uppercase tracking-widest text-sm mb-3">Come On In</p>
        <h1 className="font-display text-white text-6xl">Find Us</h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
        {/* Info */}
        <div>
          <h2 className="font-display text-4xl text-charcoal mb-8">Visit Us</h2>
          <div className="space-y-8">
            <div>
              <p className="font-body font-bold text-fuego uppercase tracking-widest text-xs mb-2">Address</p>
              <p className="font-body text-charcoal">47 South Street<br />Morristown, NJ 07960</p>
            </div>
            <div>
              <p className="font-body font-bold text-fuego uppercase tracking-widest text-xs mb-2">Phone</p>
              <a href="tel:9735550198" className="font-body text-charcoal hover:text-fuego transition-colors">(973) 555-0198</a>
            </div>
            <div>
              <p className="font-body font-bold text-fuego uppercase tracking-widest text-xs mb-2">Hours</p>
              <ul className="font-body text-charcoal space-y-1">
                <li>Monday · 11am – 9pm</li>
                <li className="text-muted line-through">Tuesday · Closed</li>
                <li>Wednesday–Thursday · 11am – 9pm</li>
                <li>Friday–Saturday · 11am – 11pm</li>
                <li>Sunday · 12pm – 8pm</li>
              </ul>
            </div>
          </div>
          {/* Map placeholder */}
          <div className="mt-10 h-52 bg-gradient-to-br from-verde/20 to-fuego/10 rounded-3xl flex items-center justify-center border-2 border-dashed border-verde/30">
            <div className="text-center">
              <p className="text-4xl mb-2">📍</p>
              <p className="font-body text-muted text-sm">47 South Street, Morristown NJ</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 className="font-display text-4xl text-charcoal mb-8">Book a Table</h2>
          {submitted ? (
            <div className="bg-verde/10 border-2 border-verde rounded-2xl p-8 text-center">
              <p className="text-5xl mb-4">🎉</p>
              <h3 className="font-display text-3xl text-charcoal mb-2">You're on the list!</h3>
              <p className="font-body text-muted">We'll call you to confirm your reservation at (973) 555-0198.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={labelClass}>Name</label>
                <input required className={inputClass} placeholder="Your name"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input required type="tel" className={inputClass} placeholder="(973) 555-0000"
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Date</label>
                  <input required type="date" className={inputClass}
                    value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Time</label>
                  <input required type="time" className={inputClass}
                    value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Party Size</label>
                <select className={inputClass} value={form.party} onChange={e => setForm({ ...form, party: e.target.value })}>
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>)}
                  <option value="9+">9+ people</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Notes (optional)</label>
                <textarea className={inputClass} rows={3} placeholder="Allergies, special occasions, etc."
                  value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
              </div>
              <button type="submit"
                className="w-full bg-fuego text-white font-body font-bold py-4 rounded-xl hover:bg-fuego/90 transition-colors text-base">
                Request Reservation →
              </button>
              <p className="font-body text-xs text-muted text-center">We'll call to confirm within 2 hours during business hours.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Open `http://localhost:3100/contact`. Check: two-column layout, form validates, success state shows after submit.

- [ ] **Step 3: Commit**

```bash
git add demos/fuego-street-tacos/app/contact/
git commit -m "feat: Fuego contact page — reservation form + hours + location"
```

---

## Task 6: SEO Metadata + Final Build Check
**Model: Haiku** (mechanical — add metadata exports, verify build)

**Files:**
- Modify: `demos/fuego-street-tacos/app/about/page.tsx` (add metadata export)
- Modify: `demos/fuego-street-tacos/app/gallery/page.tsx` (add metadata export)
- Modify: `demos/fuego-street-tacos/app/contact/page.tsx` (add metadata export)

- [ ] **Step 1: Add metadata to About page**

At the top of `app/about/page.tsx`, after the imports, add:
```tsx
export const metadata = {
  title: 'About',
  description: 'The story behind Fuego Street Tacos — started as a pop-up, built into a Morristown staple.',
}
```

Note: this file uses `'use client'` — metadata exports only work in server components. Remove `'use client'` from About and Gallery, and move all Framer Motion animation logic into a separate client child component if needed. If removing `'use client'` causes issues because of motion imports, wrap the animated parts in a `'use client'` sub-component.

**Simplest approach for About:** Keep `'use client'` and skip the metadata export — it's a demo. Instead add a `<title>` via the layout's template. The layout already sets a default.

- [ ] **Step 2: Add metadata to Contact page**

`app/contact/page.tsx` already uses `'use client'`. Skip static metadata. The layout's default title template handles it.

- [ ] **Step 3: Run production build**

From `demos/fuego-street-tacos/`:
```bash
npm run build
```

Expected: build completes with no errors. Address any TypeScript or import errors.

- [ ] **Step 4: Final visual check on all pages**

Run `npm run dev`, visit each page:
- `/` — hero, featured tacos, why strip, CTA
- `/menu` — all 5 sections with prices
- `/about` — story, values, CTA strip
- `/gallery` — masonry grid, hover lift works
- `/contact` — two columns, form submits, success state

- [ ] **Step 5: Commit**

```bash
git add demos/fuego-street-tacos/
git commit -m "feat: Fuego Street Tacos demo — complete 5-page Standard plan demo site"
```
