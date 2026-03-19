# mikeSanity — Project Instructions

## Overview
Headless CMS website. **Next.js 16** (App Router) as the front-end, **Sanity v5** as the CMS. The Studio lives in `studio/`, the Next.js app at the root. Package manager: `pnpm`.

## Commands
```bash
pnpm dev          # Run Next.js + Sanity Studio concurrently
pnpm dev:next     # Next.js only
pnpm dev:studio   # Studio only
pnpm build        # Production build
pnpm lint         # ESLint
```

## Architecture

### Key directories
- `app/` — Next.js App Router pages, components, queries, types
- `app/components/layout/` — structural components (row, column, innerRow, card, form, menus)
- `app/components/hero/` — hero dispatcher + variants
- `app/components/fields/` — primitive renderers (heading, advancedText, button, imageField, pill)
- `app/components/utils/` — shared utility functions
- `app/queries/` — all GROQ queries and data-fetching helpers
- `app/types/sanity.ts` — shared TypeScript types (`LinkField`, `ButtonField`, `ContentBlock`)
- `studio/schemaTypes/` — Sanity schema definitions

### Sanity config
- **Project ID / Dataset:** see `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` env vars | **API version:** `v2025-12-20`
- Client is in `studio/client.ts`

## Coding Patterns

### GROQ queries
- All queries use the `groq` tag from `next-sanity`
- Queries are **modular and composable**: small named projections (`linkProjection`, `buttonQuery`, `pillQuery`, etc.) are imported and interpolated into parent queries using template literals
- Main page query is `app/queries/pageQuery.tsx` — assembles everything via conditional type projections (`_type == "hero" => { ... }`)
- Data fetching uses async Server Components; use `Promise.all()` for parallel fetches

### Components
- **Server Components by default** — only add `"use client"` when using `useState`/`useEffect`
- Block dispatchers use `switch (block._type)` pattern (see `pagebuilder.tsx`, `column.tsx`, `hero.tsx`)
- Always resolve links through `getLinkUrl()` / `getLinkTarget()` / `getLinkRel()` in `app/components/utils/linkHelpers.tsx`

### Styling — dual system
- **Primary:** Tailwind v4 — theme tokens defined in `app/globals.css` using `@theme {}` block (no `tailwind.config.ts`)
- **Secondary:** SCSS (`sass`) for `advancedText.scss` and `hero.scss` only
- Button styles use `getButtonStyles(style)` from `app/components/utils/buttonStyles.ts` — returns full Tailwind class strings. Tokens: `btn--sun`, `btn--outline-grey`, `btn--plain`
- Grid columns use `getGridClass()` from `app/components/utils/gridUtils.ts`
- Dark theme only. Primary = warm orange-red, accent = golden yellow (HSL CSS vars)

### TypeScript
- `strict: true` throughout; studio has its own tsconfig (excluded from root)
- Use `@/*` path alias for root-relative imports
- Shared types go in `app/types/sanity.ts`

### SEO / Metadata
- Every page implements `generateMetadata()` using the shared `app/queries/generateMetaData.ts` utility
- Per-page SEO fields in Sanity (`metaTitle`, `metaDescription`, `noIndex`, `metaImage`) override `siteSettings` defaults

## Environment Variables
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=...
NEXT_PUBLIC_SITE_URL=...
RESEND_API_KEY=...         # Contact form email
CONTACT_EMAIL=...          # Contact form recipient
REVALIDATE_SECRET=...      # Sanity webhook ISR revalidation
SANITY_STUDIO_SITE_URL=http://localhost:3000
```

## API Routes
- `POST /api/contact` — contact form → Resend email
- `POST /api/revalidate?secret=<REVALIDATE_SECRET>` — Sanity webhook for ISR cache revalidation

## Sanity Document Types
- `page` — page builder pages (SEO, slug, publishedDate, row blocks)
- `blogs` — blog posts (title, subTitle, slug, body as advancedText, SEO)
- `mainMenu` — nav items + optional CTA button
- `footer` — links + optional advancedText
- `siteSettings` — singleton: siteName, siteUrl, defaultSeo
