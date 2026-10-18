/**
 * Contact & profile links.
 * TODO: fill these in before launch (PRD §12). `null` renders a visible placeholder
 * and is excluded from JSON-LD `sameAs`. Never put guessed URLs here.
 *
 * Keep this file free of React/DOM imports — it is also read by vite.config.ts.
 */
import type { PinnedRepo } from './types'

/**
 * PRD §5.8 — TODO: add real pinned repositories (static, no fabricated stats).
 * Example: { name: 'canaryml', description: '...', url: 'https://github.com/...', language: 'Python' }
 */
export const pinnedRepos: PinnedRepo[] = [
  {
    name: 'portfolio',
    description: 'Personal portfolio website engineered with React 19, TypeScript, and Tailwind CSS v4.',
    url: 'https://github.com/Amodh-Saxena/portfolio',
    language: 'TypeScript',
  },
]

/** e.g. 'amodhsaxena' — TODO */
export const GITHUB_USERNAME: string | null = 'Amodh-Saxena'

/** e.g. 'https://www.linkedin.com/in/your-handle' — TODO */
export const LINKEDIN_URL: string | null = null

/** e.g. 'you@example.com' — TODO */
export const EMAIL: string | null = null

export const GITHUB_URL: string | null = GITHUB_USERNAME
  ? `https://github.com/${GITHUB_USERNAME}`
  : null

export type ProfileLinkId = 'github' | 'linkedin' | 'email'

export interface ProfileLink {
  id: ProfileLinkId
  label: string
  href: string | null
  /** Human-readable value, e.g. the email address or handle */
  display: string | null
}

export const profileLinks: ProfileLink[] = [
  { id: 'github', label: 'GitHub', href: GITHUB_URL, display: GITHUB_USERNAME },
  { id: 'linkedin', label: 'LinkedIn', href: LINKEDIN_URL, display: LINKEDIN_URL ? 'LinkedIn profile' : null },
  { id: 'email', label: 'Email', href: EMAIL ? `mailto:${EMAIL}` : null, display: EMAIL },
]

/** Real, public profile URLs only (used for JSON-LD sameAs). */
export const sameAsUrls: string[] = [GITHUB_URL, LINKEDIN_URL].filter(
  (url): url is string => typeof url === 'string',
)
