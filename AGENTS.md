# kevin-porto — AI Agent Context

This is the **personal portfolio website** of **Kevin William Faith**, an iOS Developer & Web Developer.
Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **GSAP** for animations.

---

## 👤 Owner

- **Name**: Kevin William Faith
- **Role**: iOS Developer & Web Developer
- **Headline**: "I build native Apple experiences and production web systems."
- **Education**: Information System for Business, Ciputra University
- **Academy**: Apple Developer Academy @UC
- **Principle**: "Build clearly. Ship responsibly."

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4 + custom CSS variables |
| Animations | GSAP 3 (`@gsap/react`, `ScrollTrigger`) + Motion (Framer) |
| Fonts | Geist Sans + Geist Mono (via `geist` npm package) |
| Icons | Lucide React |
| Runtime | React 19 |

---

## 🎨 Design System

### Color Tokens (CSS Variables & Tailwind)

```
--color-page:           #080909   → graphite-page  (darkest background)
--color-base:           #0E1010   → graphite-base  (base surface)
--color-raised:         #151818   → graphite-raised (card backgrounds)
--color-inset:          #1C2020   → graphite-inset
--color-border:         #252A29   → graphite-border
--color-border-strong:  #3A413F   → graphite-strong
--color-accent:         #D7F75B   → signal (yellow-green highlight color)
--color-text:           #F3F0E8   → ink-primary
--color-text-secondary: #B9B5AA   → ink-secondary
--color-text-muted:     #77766E   → ink-muted
```

**Design direction**: Dark mode only. Minimal, technical, high-contrast.
Accent color `signal` (`#D7F75B`) is used sparingly for highlights and interactive states.

### Responsive Breakpoints (Tailwind custom screens)
```
xs: 375px | mobile: 430px | tablet: 768px | laptop: 1024px
desktop: 1280px | wide: 1440px | cinema: 1728px
```

### Typography
- **Sans**: `var(--font-geist-sans)`, Geist, Inter, system-ui
- **Mono**: `var(--font-geist-mono)`, Geist Mono, ui-monospace
- **Technical labels**: `.technical-label` — mono, 0.72rem, uppercase, letter-spacing 0.08em
- **Body background**: subtle horizontal scanline (`background-size: 100% 4px`)
- **Grain overlay**: fixed `body::before` with radial noise dots at 3% opacity

### Layout
- `.container-grid`: `width: min(calc(100% - margin * 2), 1536px)`, centered
- `--container-margin`: `clamp(1rem, 4vw, 6rem)`
- `--nav-height`: `4.5rem`
- `.site-shell`: wraps all content with `isolation: isolate`

### CSS Utilities
- `.screen-reader-only` — accessible hidden text
- `.hairline` — border with `--color-border`
- `.technical-label` — mono uppercase label style

---

## 📁 Project Structure

```
kevin-porto/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout: HTML shell, fonts, SiteHeader, SiteFooter, SkipLink
│   ├── page.tsx                  # HOME PAGE — assembles all sections in order
│   ├── globals.css               # Global CSS: design tokens, reset, layout utilities
│   ├── not-found.tsx             # 404 page
│   └── projects/
│       └── [slug]/
│           └── page.tsx          # Dynamic project detail page (SSG via slug)
│
├── src/
│   ├── components/               # All UI components
│   │   ├── intro/
│   │   │   ├── SystemLoader.tsx  # Animated boot/loading screen shown on first visit
│   │   │   └── SystemLoader.module.css  # CSS Module for SystemLoader animations
│   │   ├── effects/
│   │   │   └── PixelTrail/      # Cursor pixel trail visual effect
│   │   │
│   │   ├── site-header.tsx      # Top navigation bar (height: --nav-height)
│   │   ├── site-footer.tsx      # Bottom footer
│   │   ├── skip-link.tsx        # Accessibility: "skip to content" link
│   │   ├── container.tsx        # Reusable max-width container wrapper
│   │   ├── section-heading.tsx  # Reusable section title component
│   │   │
│   │   ├── hero-dossier.tsx           # Hero section: name, tagline, profile, intro text
│   │   ├── evidence-counter-strip.tsx # Animated stat counters (3 projects, 2 Tech Lead, etc.)
│   │   ├── capability-matrix.tsx      # Skill capability grid/matrix
│   │   ├── selected-work-showcase.tsx # Project cards / portfolio showcase
│   │   ├── technical-skills-system.tsx # Full technical skills grouped by category
│   │   ├── evidence-about.tsx         # "About Me" section with evidence/proof
│   │   ├── contact-closing.tsx        # Contact section / call-to-action at page end
│   │   │
│   │   ├── case-study-motion.tsx    # Animation wrapper for project detail pages
│   │   └── project-media.tsx        # Image/video media component for project pages
│   │
│   ├── data/                    # Static content data (source of truth for all content)
│   │   ├── profile.ts           # Kevin's name, role, bio, links, education
│   │   ├── projects.ts          # All 3 projects: QuackFight, Rizki Mobil, Squeaky
│   │   ├── skills.ts            # Skill groups + evidenceCounters (counter strip data)
│   │   └── project-visuals.ts   # Asset/image data per project
│   │
│   └── lib/                     # Utility functions and hooks
│       ├── cn.ts                # className merger utility (lightweight clsx)
│       ├── motion.ts            # GSAP/Motion animation config helpers
│       ├── intro.ts             # SystemLoader constants/config
│       └── use-prefers-reduced-motion.ts  # Hook: respects OS reduced-motion setting
│
├── public/
│   └── assets/                  # Static assets (images, etc.)
│
├── next.config.ts               # Next.js config
├── tailwind.config.ts           # Tailwind config with custom colors, fonts, screens
├── tsconfig.json                # TypeScript config (path alias: @/ → src/)
└── package.json                 # Dependencies and scripts
```

---

## 🏠 Homepage Flow

**File**: `app/page.tsx`

The homepage renders sections in this exact order:

```
1. <SystemLoader />           — Boot animation / loading screen
2. <HeroDossier />            — Hero: name, role, intro text
3. <EvidenceCounterStrip />   — Animated counters: 3 projects, 2 Tech Lead, 1 live client, ~100 players
4. <CapabilityMatrix />       — Skill capability matrix
5. <SelectedWorkShowcase />   — Project cards
6. <TechnicalSkillsSystem />  — Technical skills grouped by: Native Apple / Web / Delivery
7. <EvidenceAbout />          — About section
8. <ContactClosing />         — Contact / CTA closing section
```

The `app/layout.tsx` wraps everything with:
- `<SkipLink />` — accessibility
- `<SiteHeader />` — navigation
- `<main id="main-content">` — page content
- `<SiteFooter />` — footer

---

## 📂 Projects (Content Data)

All project data lives in `src/data/projects.ts`.

### QuackFight (slug: "quackfight")
- **Platform**: iOS
- **Category**: Turn-based artillery game
- **Context**: Apple Developer Academy game challenge
- **Period**: 27 April 2026 – 27 May 2026
- **Role**: Tech Lead
- **Status**: Completed playable prototype; External TestFlight; not on App Store
- **Kevin owned**: tilt-to-aim (Core Motion), voice throw power (AVFoundation), haptics, local multiplayer, Game Center online multiplayer (GameKit), packet routing, online state debugging
- **Stack**: SpriteKit, GameplayKit, GameKit, Core Motion, AVFoundation, UIKit haptics
- **Architecture**: State machine — AimState → PowerState → ThrowResolveState → TurnHandoffState → AimState
- **Team**: Justin (PM), Kevin (Tech Lead), Theo (Designer), Nathan (Dev), Sharon (Dev)
- **CTA**: `/projects/quackfight` (internal)

### Rizki Mobil (slug: "rizki-mobil")
- **Platform**: Web
- **Category**: Used-car dealership platform
- **Context**: Individual freelance project for a real multi-branch dealership
- **Duration**: ~6 weeks
- **Role**: Independent full-stack developer
- **Status**: Live and in production; ongoing maintenance agreement
- **Kevin owned**: everything — client discussion, DB design, frontend, backend, admin panel, deployment, training, maintenance
- **Stack**: Laravel 12, Filament v4, Tailwind CSS 4, Blade, Vite 7, MySQL, Axios, PHP 8.2+
- **Architecture**: AJAX filtering with URL pushState (bookmarkable), conditional DB queries, branch-specific WhatsApp routing
- **CTA**: `https://rizkimobil.com` (external, live)
- **IMPORTANT**: Do NOT display source code repo publicly. Do NOT describe dashboard as real-time analytics.

### Squeaky! (slug: "squeaky")
- **Platform**: iOS
- **Category**: Personal finance / habit-building app
- **Context**: Apple Developer Academy — Help Yourself Challenge
- **Period**: 13 March 2026 – 14 April 2026
- **Role**: Tech Lead
- **Status**: Functional prototype; not on TestFlight; not on App Store
- **Kevin owned**: transaction CRUD, SwiftData persistence, App Intents/Shortcuts, architecture, code review, cross-feature integration
- **Stack**: SwiftUI, UIKit, SwiftData, App Intents, MVVM
- **Team**: Gaby (PM), Kevin (Tech Lead), Abel (Designer), Farhan (Dev), Elvern (Dev)
- **CTA**: `/projects/squeaky` (internal)

---

## 📊 Evidence Counters (from src/data/skills.ts)

These are the animated numbers shown in `<EvidenceCounterStrip />`:

| Value | Label | Detail |
|-------|-------|--------|
| 3 | Selected projects | game, finance app, dealership platform |
| 2 | Tech Lead projects | QuackFight and Squeaky |
| 1 | Live client platform | Rizki Mobil production system |
| ~100 | Exhibition players | QuackFight booth build |

---

## 🛠️ Skill Groups (from src/data/skills.ts)

Three groups rendered in `<TechnicalSkillsSystem />`:

1. **Native Apple Development** (id: "native")
   - SwiftUI, UIKit, SwiftData, App Intents, SpriteKit, GameplayKit, GameKit, Core Motion, AVFoundation, Haptics

2. **Web and Full-Stack Development** (id: "web")
   - Laravel, PHP, Blade, Tailwind CSS, JavaScript, MySQL, Filament, AJAX filtering, Auth & authorization, Responsive web

3. **Engineering and Delivery** (id: "delivery")
   - MVVM, State-machine architecture, Relational DB design, Git & feature-branch workflows, Code review, Feature integration, Debugging, Technical leadership, Production deployment, Client training, Production maintenance

Each skill has: `name`, `projects[]`, `evidence`, `ownership` level.

Ownership levels: "Direct ownership" | "Team leadership" | "Production delivery" | "Project implementation"

---

## 🔗 Path Aliases

- `@/` → `src/` (configured in `tsconfig.json`)
- Example: `import { cn } from "@/lib/cn"`

---

## ⚙️ Dev Commands

```bash
npm run dev       # Start dev server (Next.js)
npm run build     # Production build
npm run lint      # ESLint
npm run typecheck # TypeScript check (tsc --noEmit)
```

---

## 🚦 Coding Conventions

1. **TypeScript everywhere** — no `any`, use proper types
2. **`"use client"`** — add at top of components that use hooks, GSAP, or browser APIs
3. **GSAP animations** — use `useGSAP` hook from `@gsap/react`, always register plugins at module level with `gsap.registerPlugin()`
4. **Reduced motion** — always check `usePrefersReducedMotion()` hook before running animations
5. **`cn()` utility** — use `cn()` from `@/lib/cn` for conditional classNames (lightweight, no external dep)
6. **Data changes** — all content/copy lives in `src/data/`. Never hardcode content in components.
7. **Tailwind classes** — prefer custom design tokens (`graphite-*`, `signal`, `ink-*`) over generic colors
8. **New components** — place in `src/components/`, import in `app/page.tsx` if it's a homepage section

---

## ⚠️ Content Integrity Rules

These rules protect the accuracy of Kevin's portfolio:

- ❌ Do NOT claim ~100 TestFlight installs — it was ~100 exhibition visitors who played a build at a booth
- ❌ Do NOT claim Rizki Mobil dashboard is real-time analytics — it's inventory-derived data
- ❌ Do NOT attribute every feature of Squeaky or QuackFight to Kevin personally — it was team work
- ❌ Do NOT state Squeaky has receipt scanning — it's a future improvement only
- ❌ Do NOT claim Rizki Mobil source code is public
- ❌ Do NOT invent statistics about Rizki Mobil usage (confidential)
- ❌ Do NOT state gamification in Squeaky was proven to improve long-term habits
- ✅ Kevin's strongest proof points: GameKit multiplayer ownership in QuackFight; full solo production delivery of Rizki Mobil

---

## 📄 Key Files Quick Reference

| File | Purpose |
|------|---------|
| `app/page.tsx` | **Home page** — composes all homepage sections |
| `app/layout.tsx` | **Root layout** — HTML, fonts, header, footer |
| `app/globals.css` | **Global styles** — design tokens, reset, utilities |
| `app/projects/[slug]/page.tsx` | **Project detail page** |
| `src/data/projects.ts` | **All project content** (QuackFight, Rizki Mobil, Squeaky) |
| `src/data/skills.ts` | **All skills + counter data** |
| `src/data/profile.ts` | **Personal info** (name, role, bio) |
| `src/components/intro/SystemLoader.tsx` | **Boot animation** |
| `tailwind.config.ts` | **Design tokens in Tailwind** |
