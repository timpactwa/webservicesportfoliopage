# Fuego Street Tacos — Demo Website Design Spec

## Overview

A standalone Next.js 14 demo website for **Fuego Street Tacos**, a fake casual street taco spot in Morristown, NJ. Built to demonstrate a Render Standard plan deliverable ($750 / 5-page site). Deployed separately from the Render agency site.

**Tagline:** "Born on the Block. Built for the Hungry."

---

## Business Details (Fake)

- **Name:** Fuego Street Tacos
- **Address:** 47 South Street, Morristown, NJ 07960
- **Phone:** (973) 555-0198
- **Email:** hola@fuegotacos.com
- **Hours:** Mon–Thu 11am–9pm · Fri–Sat 11am–11pm · Sun 12pm–8pm · Closed Tuesdays

---

## Design System

### Colors

| Token | Hex | Use |
|-------|-----|-----|
| `--fuego` | `#E63946` | Primary red — CTAs, accents |
| `--golden` | `#F4A261` | Secondary warm orange-gold |
| `--verde` | `#06D6A0` | Bright green accent |
| `--charcoal` | `#1B1B2E` | Dark text, header bg |
| `--cream` | `#FFFBF2` | Page background |
| `--muted` | `#6B6570` | Body secondary text |

### Typography

- **Display:** `Pacifico` (Google Fonts) — hero headings, logo name
- **Body:** `Nunito` (Google Fonts) — all body text, nav, UI

### Aesthetic Direction

Loud, graphic, street-art energy. Bold typography, high-contrast color blocks, warm cream backgrounds. Papel picado-inspired decorative SVG zigzag borders between sections. Food emoji used as decorative elements in menus. No stock photography — colored gradient cards for image placeholders (keeps it clean and demo-safe without external image dependencies).

---

## Pages (5 — Standard Plan)

### 1. Home (`/`)
- **Hero:** Full-height dark section (`charcoal` bg), Pacifico heading "Fuego Street Tacos", subheading tagline, two CTAs ("See the Menu" + "Book a Table"), animated entrance
- **Featured Tacos strip:** 3 taco cards — Carne Asada, Al Pastor, Pescado — each with gradient image placeholder, name, price, one-line description
- **"Why Fuego" bar:** 3 short punchy reasons (Fresh daily · Made to order · No shortcuts)
- **CTA banner:** Bold red section, "Ready to eat?" heading, phone number large, "Book a Table" button

### 2. Menu (`/menu`)
- Sticky category tab bar: Tacos · Plates · Extras · Drinks · Desserts
- Each category rendered as a card grid with item name, description, price
- Tacos shown with "min 2" note
- Clean layout, warm background, verde accent dots on prices

### 3. About (`/about`)
- Hero text block: restaurant origin story (2–3 paragraphs, fun and casual voice)
- "Our Ingredients" section: 3 value cards (Locally sourced · Made fresh · Real recipes)
- Full-width CTA strip at bottom linking to menu

### 4. Gallery (`/gallery`)
- Masonry-style grid of 9 placeholder image cards (colored gradients: red, gold, green combos)
- Each card has a caption: food item name or vibe phrase like "The Al Pastor" / "Saturday Night"
- Hover lifts the card slightly

### 5. Contact (`/contact`)
- Left column: address, phone, hours table
- Right column: reservation form (name, phone, date, time, party size, notes, submit button)
- Form submits to local state (no backend — shows success message on submit)
- Google Maps embed placeholder (a styled static div)

---

## Navigation

```
[Fuego 🌮] · Menu · About · Gallery · Contact · [Book a Table →]
```

- Dark charcoal background
- White links, fuego-red CTA button
- Mobile: hamburger → full-screen overlay menu

---

## Footer

- Logo + tagline
- Quick links column
- Hours column
- Address + phone
- "© 2025 Fuego Street Tacos · Site by Render"

---

## Fake Menu Content

### Tacos (min 2, $4–5 each)
| Item | Description | Price |
|------|-------------|-------|
| Carne Asada | Grilled skirt steak, pico, guacamole | $5 |
| Al Pastor | Marinated pork, pineapple, cilantro, onion | $5 |
| Pollo Adobado | Chipotle chicken, avocado crema, jalapeño | $4.50 |
| Pescado | Crispy fried fish, purple slaw, lime crema | $5 |
| Barbacoa | Slow-braised beef, salsa verde, white onion | $5 |
| Vegano 🌱 | Roasted poblano, black bean, mango salsa | $4 |

### Plates
| Item | Description | Price |
|------|-------------|-------|
| Taco Plate | 3 tacos + Mexican rice + beans | $14 |
| Burrito Bowl | Your choice of protein, rice, guac, pico | $13 |
| Quesadilla Grande | Oaxacan cheese, peppers, crema | $12 |

### Extras
| Item | Price |
|------|-------|
| Guacamole + Chips | $8 |
| Elotes Callejeros | $6 |
| Extra Jalapeños | $2 |

### Drinks
| Item | Price |
|------|-------|
| Horchata | $4 |
| Agua Fresca (Hibiscus / Watermelon / Tamarind) | $4 |
| Mexican Coke | $4 |
| Jarritos | $4 |

### Desserts
| Item | Description | Price |
|------|-------------|-------|
| Churros | Cinnamon sugar, cajeta dip | $7 |
| Tres Leches Cup | House-made, fresh strawberries | $6 |

---

## Technical Architecture

- **Location:** `demos/fuego-street-tacos/` (standalone project, own package.json)
- **Framework:** Next.js 14 App Router
- **Styling:** Tailwind CSS with custom color tokens
- **Animation:** Framer Motion
- **Fonts:** Google Fonts (Pacifico + Nunito) via `next/font/google`
- **Images:** No external images — gradient placeholder divs only
- **Forms:** Local state only, no backend
- **SEO:** `metadata` export on every page with title, description, OG tags
- **Deploy:** Vercel (separate project from Render agency site)
