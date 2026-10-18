# UI Design System & Architecture Specification

**Project:** Amodh Saxena — Personal Portfolio Website  
**Version:** 2.0 (Modern UI System)  
**Status:** Implemented & Running  
**Target Roles:** Software Engineering, AI/ML, Data Science  
**Technology Stack:** React 19, TypeScript (Strict), Vite, Tailwind CSS v4, Framer Motion, Lucide Icons

---

## 1. Design Philosophy & Aesthetic Identity

The UI is engineered with an **"engineer's portfolio"** mindset: restrained, precise, high-performance, and content-first.

- **Quiet Confidence:** A deep obsidian dark mode (`#0B0D10`) where color is never decorative noise—vibrant electric blue (`#3B82FF`) is reserved strictly for interaction, focus states, and primary affordances.
- **Content-First Hierarchy:** Typography and structure guide the eye. Backgrounds, glows, and animations accentuate the content rather than competing with it.
- **Tactile Depth & Subtlety:** Cards use double-surface layering (`--surface-1` and `--surface-2`), 1px translucent borders (`rgba(255,255,255,0.08)`), top edge highlights (`inset 0 1px 0 rgba(255,255,255,0.04)`), and dynamic cursor-following radial halos on pointer devices.
- **Zero-Fabrication Transparency:** Unconfigured or unverified metrics, links, and credentials render with an explicit, high-contrast `<Placeholder>` component instead of fake numbers or stock imagery.

---

## 2. Design Tokens & Styling Architecture

All tokens are defined in [`src/styles/globals.css`](file:///c:/Users/Amodh/OneDrive/Desktop/projects/my_portfolio/src/styles/globals.css) using Tailwind CSS v4 `@theme` directives and CSS variables.

### 2.1 Dual-Theme Color Palettes

The portfolio supports two first-class design personalities toggled via the `<ThemeToggle />` component:

#### Theme A: Obsidian Tech (Default Dark)

| Token                   | Hex / RGBA                  | Role / Application                                        |
| ----------------------- | --------------------------- | --------------------------------------------------------- |
| `--color-bg`            | `#0B0D10`                   | Base page canvas background                               |
| `--color-surface-1`     | `#12151A`                   | Primary card background, header scroll state              |
| `--color-surface-2`     | `#181C22`                   | Elevated surfaces, tag backgrounds, inner pill badges     |
| `--color-border`        | `rgba(255, 255, 255, 0.08)` | Default subtle hairline borders                           |
| `--color-border-strong` | `rgba(255, 255, 255, 0.14)` | Hover borders, terminal header lines, focused edges       |
| `--color-text`          | `#F5F7FA`                   | Primary high-contrast typography (headings, titles)       |
| `--color-text-muted`    | `#A3ABB8`                   | Secondary body copy, descriptions (≥ 4.5:1 WCAG contrast) |
| `--color-text-subtle`   | `#6B7380`                   | Tertiary metadata, step numbers, timestamps               |
| `--color-accent`        | `#3B82FF`                   | Electric blue: primary CTAs, active highlights, key links |
| `--color-accent-hover`  | `#5C99FF`                   | CTA hover state, text link hovers                         |
| `--color-accent-glow`   | `rgba(59, 130, 255, 0.35)`  | Focus ring outer halos, button elevation glows            |

#### Theme B: Newsprint Broadsheet (`[data-theme='newsprint']`)

| Token                   | Hex / RGBA              | Role / Application                                     |
| ----------------------- | ----------------------- | ------------------------------------------------------ |
| `--color-bg`            | `#F9F9F7`               | Newsprint off-white aged paper canvas                  |
| `--color-surface-1`     | `#F9F9F7`               | Standard card surface                                  |
| `--color-surface-2`     | `#E5E5E0`               | Divider grey, secondary badge background               |
| `--color-border`        | `#111111`               | Ink black structural column rules & card borders       |
| `--color-border-strong` | `#111111`               | Thick editorial borders & active element edges         |
| `--color-text`          | `#111111`               | Deep ink black typography                              |
| `--color-text-muted`    | `#525252`               | Editorial neutral-600 secondary body copy              |
| `--color-text-subtle`   | `#737373`               | Neutral-500 dateline metadata, volume numbers          |
| `--color-accent`        | `#CC0000`               | Editorial red: wire badge, breaking alerts, text links |
| `--color-accent-hover`  | `#990000`               | Deep crimson hover state                               |
| `--color-accent-glow`   | `rgba(204, 0, 0, 0.25)` | Red accent focus ring glow                             |

### 2.2 Atmospheric & Background Effects

- **Hero Ambient Glow (`.hero-glow`):** A soft, top-centered radial gradient:
  ```css
  radial-gradient(60% 55% at 50% 0%, rgba(59, 130, 255, 0.18) 0%, rgba(59, 130, 255, 0.06) 40%, transparent 75%)
  ```
- **Grid Texture (`.bg-grid`):** A 56×56px hairline lattice masked radially toward the bottom to create visual depth without clutter (opacity ≤ 3.5%).
- **Interactive Cursor Glow (`.card-glow`):** A 420px spotlight centered dynamically at the cursor's `--mx` / `--my` coordinates on hover (`@media (hover: hover) and (pointer: fine)`).
- **Glassmorphic Navigation (`.header-glass`):**
  ```css
  background-color: rgba(18, 21, 26, 0.65);
  backdrop-filter: saturate(160%) blur(14px);
  ```

### 2.3 Typography System

Self-hosted variable fonts ensure zero layout shift (CLS = 0) and fast rendering:

- **Primary Sans:** `'Inter Variable'`, system-ui, sans-serif
- **Code & Tech Mono:** `'JetBrains Mono'`, monospace

#### Scale & Metrics

- **Hero Title (`text-hero`):** Fluid `clamp(2.5rem, 6vw + 1rem, 5rem)`, weight 700, line-height 1.05, tracking `-0.03em`.
- **Section Heading (`text-h2`):** Fluid `clamp(1.75rem, 2.5vw + 1rem, 2.75rem)`, weight 650, line-height 1.15, tracking `-0.02em`.
- **Hero Accent Text (`text-gradient`):** Triple-stop linear gradient (`#F5F7FA 0% -> #9CC0FF 45% -> #3B82FF 100%`) clipped to text.
- **Eyebrow Label (`.eyebrow`):** Monospace uppercase, `0.75rem`, letter spacing `0.12em`, accompanied by an accent rule (`h-px w-5 bg-accent`).
- **Body Copy:** `1rem` (mobile) to `1.0625rem` (desktop), line-height 1.7, restricted to `68ch` max reading width (`measure`).

### 2.4 Spacing, Radii & Grid

- **Base Spacing:** 4px geometric grid. Section vertical spacing uses fluid `clamp(4rem, 8vw, 8rem)`.
- **Corner Radii:**
  - Cards & Modal surfaces: `12px` (`--radius-card`)
  - Buttons, inputs, tags, controls: `8px` (`--radius-control`)
  - Status indicators & pill chips: `9999px` (full round)
- **Container Max-Width:** `1200px` with responsive horizontal padding (16px mobile, 24px tablet, 32px desktop) plus safe-area insets.

---

## 3. UI Component Architecture

All components reside in [`src/components/`](file:///c:/Users/Amodh/OneDrive/Desktop/projects/my_portfolio/src/components) and adhere to strict atomic modularity.

```
src/components/
├── layout/
│   ├── Header.tsx           # Sticky navigation with animated active underline & blur on scroll
│   ├── MobileMenu.tsx       # Focus-trapped full-screen slide/sheet for viewports < 640px
│   ├── ScrollProgress.tsx   # Top 2px electric-blue scroll reading progress bar
│   └── Footer.tsx           # Semantic footer with live year, tech stack info, and back-to-top
├── ui/
│   ├── Button.tsx           # Primary, secondary, and ghost button & button-link primitives
│   ├── Card.tsx             # Interactive surface container with optional cursor radial glow
│   ├── Badge.tsx            # Monospace technology tags and tag clusters (<TechTag>, <TagList>)
│   ├── BrandIcons.tsx       # Pixel-perfect SVG brand marks (GitHub, LinkedIn)
│   ├── ContactLinks.tsx     # Reusable icon-only and list-based contact links
│   ├── Section.tsx          # Consistent section layout (eyebrow, h2, description)
│   ├── Reveal.tsx           # Viewport scroll-reveal wrapper powered by Framer Motion
│   └── Placeholder.tsx      # Transparent dashed TODO badge for unverified/unfilled data
├── projects/
│   ├── ProjectCard.tsx      # Case-study preview card with shared-layout motion surface
│   ├── CaseStudyDialog.tsx  # Accessible full-screen modal with deep-linking hash support
│   └── ArchitectureDiagram.tsx # Vector SVG + React semantic pipeline/layered diagrams
└── sections/
    ├── Hero.tsx             # Split hero: headline/CTA column + interactive TS profile card
    ├── About.tsx            # Bento layout: narrative overview + 4 feature highlight cards
    ├── Skills.tsx           # 6-category technical skill matrix with mono tech chips
    ├── Projects.tsx         # Responsive project grid with case-study deep-link management
    ├── Education.tsx        # Timeline card displaying degree, institution, and optional CGPA
    ├── Coursework.tsx       # Curriculum tag list with pending/confirmed verification states
    ├── Achievements.tsx     # Structured award cards or refined "Coming Soon" empty state
    ├── GitHub.tsx           # Profile overview + pinned repository cards with language badges
    ├── Resume.tsx           # PDF download preview card with verification banner
    └── Contact.tsx          # Direct mailto action card + social connection channels
```

---

## 4. Section-by-Section UI Breakdown

### 4.1 Hero Section

- **Availability Beacon:** Rounded pill badge featuring a pulsing emerald green status dot (`bg-emerald-400 animate-pulse`) displaying _"Open to internships & entry-level roles · Graduating 2027"_.
- **Headline:** Bold responsive title highlighting _"Intelligent Systems."_ in an electric blue gradient.
- **Dual CTA:**
  - Primary button: _"View Projects"_ with animated arrow pointing down.
  - Secondary button: _"Download Resume"_ with file icon.
- **Interactive Code Window:** A macOS/terminal-styled TypeScript code window displaying `const developer: Candidate = { ... }` with syntax highlighting (purple keywords, blue variables, yellow braces, emerald string values).

### 4.2 About Section (Bento Grid)

- **Main Narrative Card (7 cols on desktop):** Highlights Amodh's computer science foundations, engineering methodology, and interest in building practical AI systems.
- **Highlight Bento Cards (5 cols on desktop):** 4 compact cards with icon badges:
  1. _Machine Learning_ (BrainCircuit icon)
  2. _Data Science_ (Database icon)
  3. _Full-Stack Development_ (Server icon)
  4. _System Design_ (Layers icon)

### 4.3 Technical Skills Grid

- **Structured Categories:** Programming Languages, Frontend, Backend, AI & Machine Learning, Databases, Infrastructure & Tooling.
- **Card Presentation:** Each category features a dedicated icon container and a cluster of monospace `<TechTag>` chips with subtle hover border transitions. No arbitrary percentage or proficiency bars.

### 4.4 Featured Projects & Deep-Link Case Studies

- **3 Signature Projects:**
  1. _Food Detection & Nutrition Analysis System_ (React, TensorFlow, MobileNet)
  2. _CanaryML_ (Kubernetes, Argo Rollouts, Prometheus, Helm)
  3. _Healthcare Management Platform_ (Spring Boot, REST APIs, SQL)
- **Case Study Modal (`CaseStudyDialog`):**
  - Triggered by clicking _"Read case study"_ or navigating directly to `#project-<id>`.
  - Displays Problem Statement, Solution, Key Implementation Details, Technologies, and Architecture Diagram.
  - Locks body scroll, manages ARIA attributes (`role="dialog"`, `aria-modal="true"`), and returns focus to the trigger on close.
- **Custom Architecture Diagrams (`ArchitectureDiagram`):**
  - **Food Detection:** Sequential 5-step horizontal pipeline (Input -> Preprocessing -> Inference -> Nutrition API -> Output).
  - **CanaryML:** Stepwise deployment pipeline featuring an Argo Rollout decision fork (Auto-Promote if healthy vs. Rollback if degraded).
  - **Healthcare Platform:** Vertical layered architecture (Client -> REST API -> Service -> Database) with bi-directional communication arrows.

### 4.5 Education & Relevant Coursework

- **Education Card:** Displays SRM Institute of Science and Technology, campus location, degree, and expected graduation badge (2027). Opt-in CGPA slot with verified/placeholder conditional rendering.
- **Coursework:** Displays relevant CS & Data Science courses (Data Structures, Algorithms, DBMS, Operating Systems, Machine Learning) with transparent status badges.

### 4.6 Achievements & Certifications

- **Status-Aware Rendering:** Features conditional logic: if empty, renders a clean, dashed-border _"Coming Soon"_ card with a clock icon; once populated, renders structured achievement cards with dates and issuing bodies.

### 4.7 GitHub Integration

- **Profile Summary:** Direct profile link with official GitHub logo.
- **Pinned Repositories:** Bento grid of active repositories showing repository name, description, and primary language indicators.

### 4.8 Resume Showcase

- **Download Action:** Primary download trigger targeting `public/resume/Amodh_Saxena_Resume.pdf`.
- **Status Indicator:** Shows an emerald verification checkmark when the file is available, or an informative placeholder instruction banner when pending final upload.

### 4.9 Contact & Footer

- **Direct Mailto Card:** High-visibility card highlighting `amodh.work@gmail.com` with a single-click email trigger.
- **Social Channels:** Verified profile links to GitHub, LinkedIn, and email.
- **Footer Metadata:** Timezone indicator (`IST · UTC +5:30`), copyright note, technology attribution (React, Tailwind, Vite), and smooth "Back to top" navigation.

---

## 5. Motion, Transitions & Micro-Interactions

Built using Framer Motion with automatic accessibility gating:

1. **Spring Dynamics:** Interactive hover states and active navigation indicators utilize spring physics:
   ```json
   { "type": "spring", "stiffness": 260, "damping": 28 }
   ```
2. **Scroll Reveals (`<Reveal>`):** Sections and cards animate into view once (`viewport={{ once: true, margin: "-80px" }}`) with a 16px vertical translation and smooth fade.
3. **Staggered Hero Ingress:** Hero elements animate with a sequential 80ms stagger delay.
4. **Motion-Safe Enforcement (`useReducedMotionSafe`):**
   When `prefers-reduced-motion: reduce` is detected:
   - All translation transforms (`translateY`, scale) are immediately disabled.
   - Opacity transitions are capped at ≤ 150ms.
   - Smooth scroll behavior reverts to instantaneous jumping.

---

## 6. Accessibility & Standards (WCAG 2.2 AA)

- **Semantic Landmarks:** Single `<h1>`, structured `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, and `<footer>`.
- **Skip Navigation:** Off-screen skip link (`.skip-link`) jumps directly to `#content` on `Tab` focus.
- **Focus Rings:** High-visibility 2px electric blue focus ring with a 6px glowing ambient halo (`:focus-visible`).
- **Touch Target Sizing:** All interactive elements, buttons, and navigation links maintain a minimum target size of `44×44px` on mobile viewports.
- **Color Contrast:** All body text maintains ≥ 4.5:1 contrast against `#0B0D10` and `#12151A`. Large headings maintain ≥ 3:1 contrast.
- **Dialog Keyboard Accessibility:** Focus trapped inside `CaseStudyDialog` and `MobileMenu`; pressing `Esc` closes the overlay and restores focus to the invoking button.

---

## 7. Responsive Breakpoint Matrix

| Viewport         | Screen Width      | Layout & Component Behavior                                                                                                 |
| ---------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Mobile**       | `< 640px`         | Single-column layout. Hero CTA buttons span full width. Navigation collapses into hamburger icon opening full-screen sheet. |
| **Tablet**       | `640px – 1023px`  | 2-column bento grids for About and Skills. Sticky header displays inline condensed text links.                              |
| **Desktop**      | `1024px – 1279px` | Full navigation bar. Split hero layout (7-col copy, 5-col code terminal). 3-column project grid.                            |
| **Wide Desktop** | `≥ 1280px`        | Content is clamped within `1200px` centered container with maximum comfortable reading line lengths (`68ch`).               |
