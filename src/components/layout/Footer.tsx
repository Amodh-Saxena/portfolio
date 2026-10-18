import { ArrowUp } from 'lucide-react'
import { site } from '@/data/site'
import { ContactLinks } from '@/components/ui/ContactLinks'

export function Footer() {
  return (
    <footer data-inert-root className="border-t border-border">
      <div className="container-page flex flex-col gap-6 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-text">
            © {site.footer.year} {site.name}
          </p>
          <p className="text-sm text-text-muted">{site.footer.builtWith}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ContactLinks />
          <a
            href="#top"
            className="inline-flex min-h-11 items-center gap-2 rounded-control px-3 text-sm text-text-muted transition-colors hover:bg-white/5 hover:text-text"
          >
            <ArrowUp className="size-4" aria-hidden="true" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
