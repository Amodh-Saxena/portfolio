# Amodh Saxena — Personal Portfolio Website

A fast, responsive, modern single-page portfolio engineered for Software Engineering, AI/ML, and Data Science roles.

Built with **React 19**, **Vite**, **TypeScript** (strict mode), **Tailwind CSS v4**, **Framer Motion**, and **Lucide Icons**.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open your browser to [http://localhost:5173](http://localhost:5173).

### 3. Build for Production
```bash
npm run build
```
The optimized bundle will be generated in `dist/`.

### 4. Run Linting & Format Checks
```bash
npm run lint
```

---

## 🗂️ How to Update Content (`src/data/`)

All content and copy are strictly typed and centralized in `src/data/`. You never need to modify JSX to update personal information or project details:

- **`src/data/links.ts`**:
  - Configure `GITHUB_USERNAME`, `LINKEDIN_URL`, and `EMAIL`.
  - Add pinned repositories to `pinnedRepos`.
- **`src/data/projects.ts`**:
  - Case-study data for featured projects (problem, solution, architecture workflow, stack, key implementation points, and GitHub/demo links).
  - Links remain hidden unless a valid URL is provided.
- **`src/data/education.ts`**:
  - University details, degree, expected graduation, opt-in CGPA, and confirmed coursework.
- **`src/data/achievements.ts`**:
  - Certifications, hackathons, and academic honors.
- **`src/data/skills.ts`**:
  - Categorized skill sets (Programming, AI/ML, Frontend, Backend, Databases, Infrastructure).
- **`src/data/site.ts`**:
  - Hero copy, About narrative, footer information, and resume availability status (`resume.available`).
- **`src/lib/seo.ts`**:
  - Set `SITE_URL` for production canonical links, Open Graph URLs, and automated sitemap generation.

---

## 📋 Pre-Launch Checklist (Placeholder Register)

The portfolio strictly adheres to the zero-fabrication rule (PRD §1.3). Any unsupplied item is rendered as a clean, marked placeholder:

| Item | File Location | Status | Action Required |
|---|---|---|---|
| Resume PDF | `public/resume/Amodh_Saxena_Resume.pdf` | Placeholder | Place official PDF and set `resume.available = true` in `src/data/site.ts` |
| Contact Email | `src/data/links.ts` | `null` | Add your email address to enable mailto CTA |
| LinkedIn Profile | `src/data/links.ts` | `null` | Add profile URL |
| GitHub Profile | `src/data/links.ts` | `null` | Add GitHub username |
| Project Links | `src/data/projects.ts` | `null` | Add GitHub repo and demo URLs for projects |
| Project Specifics | `src/data/projects.ts` | `TODO` | Confirm datasets, thresholds, and database choices |
| Relevant Coursework | `src/data/education.ts` | Unconfirmed | Confirm courses and set `coursework.confirmed = true` |
| Achievements | `src/data/achievements.ts` | Empty | Add certifications or competitive achievements |
| Production Domain | `src/lib/seo.ts` | `null` | Set `SITE_URL` to your production URL |

---

## 🌐 Deployment Guide

### Deploy to Vercel
1. Push this repository to GitHub.
2. In Vercel, click **Add New Project** and import the repository.
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click **Deploy**.

### Deploy to Netlify
1. Connect repository in Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy site.

### Deploy to GitHub Pages
1. In `vite.config.ts`, if hosting on `<username>.github.io/<repo>`, add `base: '/<repo>/'`.
2. Add a deploy script or GitHub Actions workflow to publish `dist/` to `gh-pages`.

---

## ♿ Accessibility & Performance Standards

- **Semantic landmarks**: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, single `<h1>`.
- **Keyboard navigation**: Skip link, focus-visible styling with glowing outline, focus-trapped modal dialog and mobile menu.
- **Motion safety**: Respects `prefers-reduced-motion: reduce` across Framer Motion transitions and CSS.
- **Deep linking**: Projects can be directly accessed via `#project-<id>` (e.g. `#project-canaryml`).
