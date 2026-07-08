# design-sync notes — Render

## Repo shape

This repo is a Next.js 14 App Router marketing site, not a packaged component
library — there's no `dist/`, no `main`/`module`/`exports` in `package.json`,
and no Storybook. The sync uses the package shape's synth-entry path:

- `.design-sync/entry.ts` is a hand-authored barrel re-exporting the 9 synced
  components from `components/ui/*.tsx`. It's the `cfg.entry` value.
- `cfg.componentSrcMap` explicitly lists each component (there's no shipped
  `.d.ts` to discover them from) and excludes `Logo` (`null`) — see below.
- `next/link` and `next/image` are aliased to local shims
  (`.design-sync/shims/next-link.tsx`, `next-image.tsx`) via a dedicated
  `.design-sync/tsconfig.build.json` (NOT the repo's real `tsconfig.json` —
  don't merge these paths into it). Neither works standalone outside a real
  Next.js app (`next/link` needs App Router context; `next/image` needs the
  image optimizer).

## docs/ is business content, not design docs — do not re-enable

`docsDir` is deliberately pointed at a nonexistent path
(`.design-sync/no-docs`) and `guidelinesGlob` is `[]`. The repo's real
`docs/` folder holds Render's internal sales/pricing/lead-gen strategy
(`sales-and-outreach.md`, `lead-generation-plan.md`, etc.) — the converter's
default `docs/*.md` guideline glob will scrape it verbatim into the uploaded
project if these overrides are ever removed. **Never point `docsDir` or
`guidelinesGlob` at the repo's `docs/` directory.**

## cssEntry is a generated file — regenerate before every re-sync

`cfg.cssEntry` (`.design-sync/build/styles.css`, gitignored) is NOT hand
maintained. Regenerate it before every build:

```sh
npm run build   # produces .next/static/css/<hash>.css
node -e "
const fs = require('fs');
const [f] = fs.readdirSync('.next/static/css');
let css = fs.readFileSync('.next/static/css/' + f, 'utf8');
css = css.replace(/@font-face\{[^}]*\}/g, ''); // strip Next's self-hosted __Inter_* @font-face (unused outside the app shell)
const header = \"@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');\n\";
fs.writeFileSync('.design-sync/build/styles.css', header + css);
"
```

Inter loads via a Google Fonts CDN `@import` (see `cfg.runtimeFontPrefixes:
["Inter"]`) rather than self-hosted files — Next's `next/font` self-hosts
with a scoped hashed family name (`__Inter_xxxxx`) applied via a class on
`<html>`, which no preview card carries, so those `@font-face` rules are
stripped as dead weight.

## Known limitations (accepted, documented — not bugs to chase)

- **Logo is excluded from this sync** (`componentSrcMap.Logo: null`, removed
  from `entry.ts`). The user is remaking the logo; its real component always
  resolves `/brand/*.svg` from the app's own public assets, which have no
  supported path into this bundle. Re-add once the new logo exists — same
  asset-path problem will apply unless the new component embeds its image
  as a data URI or otherwise avoids `/public/*` paths.
- **`TeamMember`'s `image` prop and any `/public/*`-referencing prop**: not
  resolvable in previews. The authored `TeamMember.tsx` previews deliberately
  omit `image` to show the (fully real, always-correct) initials fallback
  state instead.
- **DemoModal `[RENDER_THIN]` warn (rendered height 0px) — benign, known.**
  The local capture harness's full-bleed single-story wrapper (`.ds-single`)
  has no explicit height. `position: fixed; inset: 0` collapses to 0px
  height when its containing block has zero height — confirmed via direct
  Playwright inspection that the real DOM (chrome bar, close button, iframe)
  mounts correctly with the right classes/content; only the *measured*
  height in the automated check is 0. This is inherent to previewing any
  full-viewport-overlay component in a bounded card, not fixable from
  `.design-sync/previews/DemoModal.tsx` or via `cfg.overrides` (the local
  harness always renders `?story=` full-bleed regardless of the declared
  `viewport`). Graded `good`. Re-syncs: this warn is expected, not new.
- **ScanlineHeading raw per-story capture PNGs are blank — capture-timing
  only, not a defect.** `package-capture.mjs`'s isolated `?story=` capture
  screenshots immediately after `networkidle`, before the component's
  scroll-reveal opacity transition (~0.55–0.65s via framer-motion) finishes.
  Confirmed via direct Playwright inspection (1.5s wait) that the DOM
  settles to `opacity: 1` with the correct heading text. The full multi-cell
  `validate` contact sheet (different capture path, more elapsed time)
  already showed this correctly. Graded `good`. Re-syncs: expect the same
  blank raw PNG under `_screenshots/review/raw/` for this component; don't
  re-chase it.
- **ResponsiveDemoPreview's `LiveDemoTile` story loads a real external URL**
  (`fuego-street-tacos.vercel.app`) — needs network access during capture/
  validate. If a future re-sync runs offline, this component's render
  check may show a loading/blank iframe; that's expected, not a regression.

## Re-sync risks

- `cssEntry` is fully regenerated from a fresh `npm run build` each time —
  if Tailwind's output hash or content changes, re-run the steps above
  before re-syncing, or the bundle ships stale styles.
- `next/link`/`next/image` shims are minimal (plain `<a>`/`<img>`). If
  `Button`, `ServiceCard`, or `TeamMember` grow real Next-specific behavior
  (e.g. `next/image` `loader` config, prefetch), the shims won't reflect it.
- No `tokens/` directory is shipped — token values are baked directly into
  the compiled Tailwind CSS rather than exposed as a separate token package.
  This is correct for how this repo works (Tailwind config, not a runtime
  token system) but means renaming a token in `tailwind.config.ts` only
  shows up here after the `npm run build` + cssEntry regen above.
