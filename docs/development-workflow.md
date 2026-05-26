# Development Workflow

## Local Setup

Use the app folder as the project root:

```bash
cd /Users/lukewilkins/Documents/Codex/2026-05-25/Websolutions/webservicesportfoliopage
```

Install packages:

```bash
npm install
```

Start local development:

```bash
npm run dev
```

The app should run at:

```text
http://localhost:3000
```

## Before Making Changes

Check the current state:

```bash
git status --short --branch
```

Read the relevant files before editing. Most page content lives in:

```text
lib/data.ts
components/sections/
app/
```

## During Development

Prefer small changes that can be reviewed easily.

Good change examples:

- Update pricing copy in `lib/data.ts`
- Improve one section component
- Add one new page
- Connect the contact form to a real endpoint
- Replace placeholder portfolio cards with real projects

Avoid bundling unrelated work together.

## Validation

Before committing meaningful changes, run:

```bash
npm run lint
npm run build
```

For visual changes, also run the app locally and inspect the affected pages on desktop and mobile widths.

## GitHub Flow

The repo is connected to:

```text
https://github.com/timpactwa/webservicesportfoliopage
```

Basic workflow:

```bash
git status --short --branch
git add .
git commit -m "Describe the change"
git push
```

Use clear commit messages. A good message explains what changed, not just that files were edited.

## Deployment Readiness

Before a production deploy, confirm:

- The contact form submits to a real destination.
- Placeholder names, emails, and project examples are replaced or intentionally kept.
- Metadata and page titles are accurate.
- The site builds successfully.
- Mobile layout is checked.
- Any required environment variables are documented.
