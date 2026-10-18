/**
 * SEO config — single source of truth for <head> metadata (injected by vite.config.ts).
 * Keep free of React/DOM imports.
 */
import { site } from '../data/site'
import { sameAsUrls } from '../data/links'

/** TODO: set to the production URL, e.g. 'https://amodhsaxena.dev/'. Enables canonical, og:url and sitemap. */
export const SITE_URL: string | null = null

export const seo = {
  title: 'Amodh Saxena — Software Engineer & AI/ML Student',
  description:
    'Portfolio of Amodh Saxena, a Computer Science and Engineering (Data Science) student building machine learning systems and scalable software.',
  author: site.name,
  themeColor: '#0B0D10',
  /** TODO: replace public/og-image.png (1200×630) with a final design. */
  ogImage: '/og-image.png',
  ogImageAlt: 'Amodh Saxena — Building Intelligent Systems. Solving Real-World Problems.',
} as const

export function buildPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: 'Student',
    description: seo.description,
    ...(SITE_URL ? { url: SITE_URL } : {}),
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'SRM Institute of Science and Technology',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'SRM Institute of Science and Technology',
    },
    knowsAbout: ['Machine Learning', 'Data Science', 'Full-Stack Development', 'System Design'],
    ...(sameAsUrls.length ? { sameAs: sameAsUrls } : {}),
  }
}
