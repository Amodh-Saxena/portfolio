import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { SITE_URL, seo, buildPersonJsonLd } from './src/lib/seo'

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * Injects all SEO metadata (title, description, Open Graph, Twitter, canonical, JSON-LD)
 * into index.html from the typed config in `src/lib/seo.ts`, and emits robots.txt /
 * sitemap.xml at build time. Single source of truth — no duplicated copy in HTML.
 */
function seoPlugin(): Plugin {
  const abs = (path: string) => (SITE_URL ? new URL(path, SITE_URL).toString() : path)

  return {
    name: 'portfolio-seo',
    transformIndexHtml() {
      const meta = (attrs: Record<string, string>) => ({
        tag: 'meta',
        attrs,
        injectTo: 'head' as const,
      })
      const tags = [
        { tag: 'title', children: seo.title, injectTo: 'head' as const },
        meta({ name: 'description', content: seo.description }),
        meta({ name: 'author', content: seo.author }),
        meta({ property: 'og:type', content: 'website' }),
        meta({ property: 'og:title', content: seo.title }),
        meta({ property: 'og:description', content: seo.description }),
        meta({ property: 'og:image', content: abs(seo.ogImage) }),
        meta({ property: 'og:image:width', content: '1200' }),
        meta({ property: 'og:image:height', content: '630' }),
        meta({ property: 'og:image:alt', content: seo.ogImageAlt }),
        meta({ name: 'twitter:card', content: 'summary_large_image' }),
        meta({ name: 'twitter:title', content: seo.title }),
        meta({ name: 'twitter:description', content: seo.description }),
        meta({ name: 'twitter:image', content: abs(seo.ogImage) }),
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(buildPersonJsonLd()).replace(/</g, '\\u003c'),
          injectTo: 'head' as const,
        },
      ]
      if (SITE_URL) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: escapeAttr(SITE_URL) }, injectTo: 'head' } as never,
          meta({ property: 'og:url', content: SITE_URL }),
        )
      }
      return tags
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /']
      if (SITE_URL) robots.push('', `Sitemap: ${abs('/sitemap.xml')}`)
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' })

      if (SITE_URL) {
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${abs('/')}</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
</urlset>
`
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2022',
    cssMinify: true,
  },
})
