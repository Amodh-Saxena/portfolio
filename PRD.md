# PRD: Amodh Saxena — Personal Portfolio Website

**Version:** 2.0 (modern UI system)  **Date:** 18 Oct 2026  **Owner:** Amodh Saxena
**Build target:** Antigravity / any AI coding agent  **Stack:** React + Vite + TypeScript + Tailwind CSS + Lucide + Framer Motion

---

## 1. Overview

A premium, fast, fully responsive single-page portfolio that positions Amodh for **Software Engineering, AI/ML, Data Science, and technical internship / entry-level roles**. It must read as an engineer's portfolio: restrained, precise, quick, and evidence-first.

### Goals
1. A recruiter or engineer understands who Amodh is, what he builds, and how to contact him within **10 seconds**.
2. Each featured project is presented as a **case study** (problem → solution → architecture → stack → implementation → links), not a thumbnail.
3. The site itself demonstrates engineering quality: performance, accessibility, clean code.

### Non-goals
- No blog, CMS, backend, auth, or analytics dashboard in v1.
- No stock photos, fake testimonials, or decorative 3D/WebGL.

### Content integrity rule (hard constraint)
**Never invent** experience, achievements, metrics, certifications, coursework, URLs, or contribution stats. Anything not supplied renders as a clearly marked placeholder (see §12). Placeholders must be easy to find and replace (single data file, `TODO:` markers).

---

## 2. Target audience
| Audience | Needs |
|---|---|
| Recruiters / hiring managers | Role fit, skills, education, resume, contact — scannable fast |
| Engineers / interviewers | Architecture depth, tech decisions, working repos |
| Academic / research contacts | Rigor, clear problem framing, links |

---

## 3. Information architecture

Single page, anchor navigation, deep-linkable (`#projects`, `#project-canaryml`).

1. Hero
2. About
3. Skills
4. Featured Projects (case-study cards)
5. Education
6. Coursework
7. Achievements & Certifications
8. GitHub
9. Resume
10. Contact + Footer

Sticky header nav: About · Skills · Projects · Education · GitHub · Contact, plus a primary **Resume** button.

---

## 4. Modern UI system (the "updated UI" spec)

### 4.1 Principles
- **Quiet confidence:** dark, spacious, typographic. Color is used sparingly — blue marks interaction and emphasis only.
- **Content-first:** effects never compete with text.
- **Consistent tokens:** every color, size, radius, and duration comes from design tokens — no magic values in components.
- **Performance is part of the design:** animate only `transform` and `opacity`.

### 4.2 Color tokens (dark theme, default)
Define as CSS variables via Tailwind v4 `@theme` (OKLCH preferred; hex fallbacks shown).

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0B0D10` | page background |
| `--surface-1` | `#12151A` | cards, header on scroll |
| `--surface-2` | `#181C22` | elevated / hover surface |
| `--border` | `rgba(255,255,255,0.08)` | hairlines |
| `--border-strong` | `rgba(255,255,255,0.14)` | hover/focus borders |
| `--text` | `#F5F7FA` | primary text |
| `--text-muted` | `#A3ABB8` | secondary text (≥ 4.5:1 on bg) |
| `--text-subtle` | `#6B7380` | tertiary / meta (large text only) |
| `--accent` | `#3B82FF` | electric blue, links, CTAs |
| `--accent-hover` | `#5C99FF` | hover |
| `--accent-glow` | `rgba(59,130,255,0.35)` | glows, focus ring halo |

Rules: one accent color only. Glows only on primary CTA, focused elements, and hovered project cards. Light theme is **out of scope for v1**, but tokens must make it addable later. Set `color-scheme: dark`.

### 4.3 Typography
- **Sans:** Inter Variable (or Geist) — self-hosted via `@fontsource-variable`, `font-display: swap`, subset to Latin.
- **Mono:** JetBrains Mono — for tech tags, labels, code snippets.
- **Fluid scale** with `clamp()`:
  - Hero H1: `clamp(2.5rem, 6vw + 1rem, 5rem)`, weight 700, tracking `-0.03em`, line-height 1.05
  - H2: `clamp(1.75rem, 2.5vw + 1rem, 2.75rem)`, weight 650
  - Body: `1rem–1.125rem`, line-height 1.7, max line length ~68ch
  - Eyebrow/labels: mono, `0.75rem`, uppercase, tracking `0.12em`, muted
- Hero headline may highlight "Intelligent Systems." with a subtle blue gradient text (single use only).

### 4.4 Layout, spacing, shape
- 4px base grid; section vertical padding `clamp(4rem, 8vw, 8rem)`.
- Container `max-width: 1200px`, side gutters 16px (mobile) / 24px (tablet) / 32px (desktop).
- Breakpoints: 360 · 640 · 768 · 1024 · 1280. Mobile-first.
- Radius: 12px (cards), 8px (buttons, tags), full (pills).
- **Bento grid** for About highlights and Skills (CSS grid, varied spans on desktop, single column on mobile).
- Use container queries for card internals where useful.

### 4.5 Surface & depth
- Cards: `surface-1` + 1px `border` + very soft inner top highlight (`inset 0 1px 0 rgba(255,255,255,0.04)`).
- Hover: border → `border-strong`, subtle blue radial glow following the cursor (CSS variables `--mx/--my`, pointer devices only), `translateY(-2px)`.
- Background: flat charcoal with one faint radial blue gradient behind the hero and a very low-opacity grid/noise texture (≤ 4% opacity). No heavy blur, no parallax, no particle effects.
- Glassmorphism only on the sticky header (`backdrop-blur`, with solid fallback).

### 4.6 Motion (Framer Motion)
- Easing: spring `{ stiffness: 260, damping: 28 }` for interactive; `easeOut` 0.5s for reveals.
- Hero: staggered fade-up of eyebrow → H1 → intro → buttons (60–80ms stagger).
- Sections: reveal once on scroll via `whileInView` (`viewport={{ once: true, margin: "-80px" }}`), 16px rise + fade.
- Project card → case-study: shared-layout expand into an accessible dialog/drawer (`layoutId`).
- Active nav link indicator animates between items (`layoutId`).
- **`prefers-reduced-motion: reduce`:** disable all transforms/parallax, keep opacity fades ≤ 150ms. Implement with `useReducedMotion()` and a global CSS guard.
- No autoplay loops, no scroll-jacking, no cursor-follower gimmicks.

### 4.7 Components (reusable)
`Header`, `MobileMenu` (full-screen sheet, focus-trapped), `Button` (primary / secondary / ghost, sizes), `Section` (eyebrow + title + description wrapper), `Card`, `Badge/TechTag`, `SkillGroup`, `ProjectCard`, `CaseStudyDialog`, `ArchitectureDiagram`, `TimelineItem`, `ContactLinks`, `Footer`, `ScrollProgress` (thin blue bar at top), `Reveal` (motion wrapper), `Placeholder` (visibly marked TODO block).

### 4.8 Interaction states
Every interactive element defines: default, hover, `:focus-visible` (2px accent ring + 4px glow, 3:1 contrast against adjacent colors), active (scale 0.98), disabled. Tap targets ≥ 44×44px on mobile.

---

## 5. Section specifications

### 5.1 Hero
- Eyebrow (mono): `Computer Science & Engineering · Data Science`
- Name: **Amodh Saxena**
- Headline: **Building Intelligent Systems. Solving Real-World Problems.**
- Intro: "I'm a Computer Science and Engineering student specializing in Data Science, passionate about machine learning, software development, and designing scalable technology solutions."
- Buttons: **View Projects** (primary, scrolls to `#projects`) · **Download Resume** (secondary, `/resume/Amodh_Saxena_Resume.pdf` — placeholder file, see §12)
- Secondary row: GitHub · LinkedIn · Email icon links (URLs from placeholder config).
- Availability chip: "Open to internships & entry-level roles · Graduating 2027" (factual from brief).
- No fake stats or photo unless supplied; optional `<Avatar>` slot behind a placeholder.

### 5.2 About
Bento layout: one narrative card + 3–4 small highlight cards. Narrative covers: computer science foundation, machine learning and data science, full-stack development, system design; interest in practical applications, understanding complex problems, and continuously improving engineering skills. Written in first person, plain, no buzzword stacking. Highlights (text only, no invented numbers): **Machine Learning · Data Science · Full-Stack Development · System Design**.

### 5.3 Technical Skills (categories, no percentages)
| Category | Items |
|---|---|
| Programming | Java, Python, JavaScript, SQL |
| Frontend | React, HTML, CSS |
| Backend | Spring Boot, REST APIs |
| AI / ML | TensorFlow, MobileNet, Pandas, NumPy, Model Evaluation |
| Databases | MySQL, MongoDB, PostgreSQL |
| Infrastructure | Kubernetes, Helm, Argo Rollouts, Prometheus, Git |

Each category = card with Lucide icon + tech tags (mono). Hover highlights tag, no progress bars or ratings.

### 5.4 Featured Projects
Three `ProjectCard`s in a responsive grid (1 col mobile, 3 col desktop, or 1 featured + 2). Each card shows: title, one-line summary, 3–5 tech tags, "Read case study" affordance, and repo/demo icons **only when a real URL exists**. Clicking opens `CaseStudyDialog` (URL hash updates for deep-linking, Esc closes, focus returns to card).

**Case-study template (required fields for every project):**
1. Problem statement
2. Solution
3. Architecture / workflow (rendered diagram — SVG/React component, not an image)
4. Technology stack
5. Key implementation details
6. Links: GitHub / Live demo (hide if absent)
7. Optional: Outcome — **only** if Amodh supplies verified results; otherwise omit the field entirely

**Project 1 — Food Detection & Nutrition Analysis System**
- Summary: AI-powered food classification and nutritional information.
- Stack: React, TensorFlow, MobileNet, API integrations.
- Workflow diagram: Image upload/camera → preprocessing → MobileNet classification → nutrition API lookup → results view (label, confidence, nutrition breakdown).
- Problem / Solution / Implementation details: draft from the brief in neutral language; mark unverified specifics (dataset, accuracy, API provider) as `TODO`.

**Project 2 — CanaryML**
- Summary: Progressive ML model deployment with gradual traffic shifting and automated monitoring.
- Stack: Kubernetes, Argo Rollouts, Prometheus, Helm.
- Workflow diagram: New model version → Argo Rollout canary (stepwise traffic weight) → Prometheus metrics → analysis gate (accuracy, latency, error rate) → promote or auto-rollback.
- Problem: shipping a new ML model all at once risks degraded accuracy, latency, or errors reaching all users.
- Implementation details: Helm-packaged deployment; canary steps shift traffic gradually; monitoring tracks accuracy, latency, and error rate. Thresholds and test results appear only if Amodh confirms them for public display (`TODO`).

**Project 3 — Healthcare Management Platform**
- Summary: Healthcare-oriented application built with Spring Boot and database technologies.
- Stack: Spring Boot, REST APIs, MySQL/PostgreSQL (`TODO: confirm which`).
- Architecture: Client → REST API (Spring Boot) → service layer → database (generic layered diagram; confirm modules).
- Features, roles, and schema details: `TODO` — do not fabricate.

### 5.5 Education
Timeline card: **SRM Institute of Science and Technology, Kattankulathur** — B.Tech in Computer Science and Engineering (Data Science). Expected graduation: **2027**. CGPA shown only if Amodh opts in (`TODO`).

### 5.6 Relevant Coursework
Tag grid. **Placeholder list** (`TODO: confirm actual courses`); suggested categories to fill: Data Structures & Algorithms, DBMS, Operating Systems, Machine Learning, etc. Do not render as real until confirmed.

### 5.7 Achievements & Certifications
Card list with date/issuer fields. **All placeholder** until supplied. If empty at launch, show a single tasteful "Coming soon" card rather than fabricated entries, or hide the section via a config flag.

### 5.8 GitHub
- Profile link card + "Pinned repositories" grid (static, from data file; optional build-time fetch from the public GitHub API with graceful fallback).
- Contribution graph: embed only if a real username is configured; otherwise placeholder. No fabricated commit counts.

### 5.9 Resume
Preview card with **Download PDF** button and optional inline viewer (`<object>` with fallback link). File: `public/resume/Amodh_Saxena_Resume.pdf` (placeholder until provided). `download` attribute set; filename stable.

### 5.10 Contact & Footer
- Email (mailto), LinkedIn, GitHub; optional location "India" only if desired.
- Simple contact: primary mailto CTA. A form is optional and, if added, uses a third-party endpoint (`TODO`) with client validation, honeypot, and accessible error messages. Default v1: no form.
- Footer: © 2026 Amodh Saxena, built-with note, back-to-top link.

---

## 6. Technical requirements

### Stack
React 18/19, Vite, TypeScript (strict), Tailwind CSS v4 (CSS-first tokens), `lucide-react`, `framer-motion` (or `motion`). Add `clsx` + `tailwind-merge`. Lint/format: ESLint + Prettier.

### Suggested structure
```
src/
  components/ui/        Button, Card, Badge, Section, Reveal, Placeholder
  components/layout/    Header, MobileMenu, Footer, ScrollProgress
  components/sections/  Hero, About, Skills, Projects, Education,
                        Coursework, Achievements, GitHub, Resume, Contact
  components/projects/  ProjectCard, CaseStudyDialog, ArchitectureDiagram
  data/                 site.ts, skills.ts, projects.ts, education.ts, links.ts
  hooks/                useActiveSection, useReducedMotionSafe, useHashDialog
  lib/                  cn.ts, seo.ts
  styles/               globals.css (tokens via @theme)
public/                 favicon, og-image placeholder, resume/, robots.txt, sitemap.xml
```
All copy and links live in typed `data/` files — components contain no hardcoded content. Projects are typed (`Project` interface) so the case-study template is enforced by the compiler.

### Quality bars
- Lighthouse (mobile): Performance ≥ 90, Accessibility 100, Best Practices ≥ 95, SEO 100.
- Core Web Vitals targets: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.
- Initial JS budget: aim ≤ 200 KB gzipped; lazy-load `CaseStudyDialog` and heavy sections; fonts preloaded; images `loading="lazy"` with width/height; AVIF/WebP.
- No console errors/warnings; no layout shift from fonts or reveals.

---

## 7. Accessibility (WCAG 2.2 AA)
- Semantic landmarks (`header`, `nav`, `main`, `section[aria-labelledby]`, `footer`); one `h1`; logical heading order.
- "Skip to content" link as the first focusable element.
- Full keyboard operation; visible `:focus-visible`; focus trap + return in mobile menu and dialog; `Esc` closes.
- Dialog: `role="dialog"`, `aria-modal`, labelled by title; background `inert`; scroll locked.
- Contrast ≥ 4.5:1 body, ≥ 3:1 large text and UI components.
- Icon-only links have `aria-label`; decorative icons `aria-hidden`.
- Respect `prefers-reduced-motion`; never convey info by color alone.
- Diagrams provide text alternative (`<title>`/`<desc>` or adjacent ordered list).
- Test with keyboard-only, VoiceOver/NVDA spot check, and axe.

---

## 8. SEO & metadata
- `<title>`: "Amodh Saxena — Software Engineer & AI/ML Student" (≤ 60 chars); meta description ≤ 160 chars, built from the brief only.
- Canonical URL, `lang="en"`, theme-color `#0B0D10`, viewport.
- Open Graph + Twitter card tags; OG image 1200×630 (placeholder file to be replaced).
- JSON-LD `Person` schema (name, jobTitle "Student", alumniOf/affiliation, sameAs → real profile URLs only).
- `robots.txt`, `sitemap.xml`, favicon set + manifest.
- Domain/URL: `TODO` — use a config constant `SITE_URL`.
- Prefer prerendering/static output (e.g., `vite-plugin-ssg` or build-time prerender) so metadata and content are crawlable.

---

## 9. Responsive behavior
| Viewport | Behavior |
|---|---|
| < 640 | Single column; hamburger → full-screen sheet; sticky bottom-safe CTA not required; hero buttons stack full-width |
| 640–1023 | 2-column bento/skills; header shows condensed nav |
| ≥ 1024 | Full nav, 3-column project grid, bento spans |
| ≥ 1440 | Content stays within 1200px container; larger hero type |

Also: safe-area insets, `100svh/dvh` for hero, no horizontal scroll at 320px, touch-friendly spacing, hover effects gated by `@media (hover: hover)`.

---

## 10. Acceptance criteria
- [ ] All sections in §5 render with the exact hero copy, skill categories, and 3 projects provided.
- [ ] Every project has all required case-study fields; absent links/results are hidden, not faked.
- [ ] Every placeholder is visibly marked and listed in §12; **zero** invented facts, metrics, or URLs.
- [ ] Skills shown as categorized groups, no proficiency percentages.
- [ ] Works at 320–1920px with no horizontal scroll; mobile nav fully keyboard- and screen-reader-operable.
- [ ] Reduced-motion mode verified.
- [ ] Lighthouse and WCAG targets in §6–7 met.
- [ ] `npm run build` and `npm run lint` pass with TypeScript strict and zero errors.
- [ ] README documents setup, how to edit `data/` files, and how to deploy (Vercel / Netlify / GitHub Pages).

---

## 11. Agent build instructions (paste into Antigravity)
1. Scaffold Vite + React + TS; install Tailwind v4, `lucide-react`, `framer-motion`, `clsx`, `tailwind-merge`, `@fontsource-variable/inter`, `@fontsource/jetbrains-mono`.
2. Implement tokens (§4) in `globals.css` first, then `ui/` primitives, then layout, then sections in IA order.
3. Put all content in typed `data/` files; build components from data.
4. Implement the case-study dialog with hash deep-linking and the three SVG/React diagrams.
5. Add SEO (§8), accessibility (§7), and performance (§6) passes; run Lighthouse and axe; fix findings.
6. Do not add any content, number, certification, course, or URL that is not in this document. Use `<Placeholder>` instead.
7. Deliver: working repo, README, and a short list of remaining placeholders.

---

## 12. Placeholder register (fill before launch)
| Item | Location | Status |
|---|---|---|
| Resume PDF | `public/resume/Amodh_Saxena_Resume.pdf` | TODO |
| GitHub username/URL | `data/links.ts` | TODO |
| LinkedIn URL | `data/links.ts` | TODO |
| Contact email | `data/links.ts` | TODO |
| Site URL / domain | `lib/seo.ts` | TODO |
| Profile photo (optional) | `public/` | TODO |
| OG image | `public/og-image.png` | TODO |
| Project repo / live-demo links ×3 | `data/projects.ts` | TODO |
| Project specifics: datasets, thresholds, results, schema, features | `data/projects.ts` | TODO (confirm before publishing) |
| Healthcare project DB choice (MySQL vs PostgreSQL) | `data/projects.ts` | TODO |
| Relevant coursework list | `data/education.ts` | TODO |
| Achievements & certifications | `data/achievements.ts` | TODO |
| GitHub pinned repos / contribution graph | `data/links.ts` | TODO |
| CGPA display (opt-in) | `data/education.ts` | TODO |
