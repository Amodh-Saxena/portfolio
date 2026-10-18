import { Mail } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { profileLinks, type ProfileLinkId } from '@/data/links'
import { cn } from '@/lib/cn'
import { GitHubIcon, LinkedInIcon } from './BrandIcons'

const icons: Record<ProfileLinkId, ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
}

interface ContactLinksProps {
  variant?: 'icons' | 'list'
  className?: string
}

/**
 * GitHub · LinkedIn · Email links from `data/links.ts`.
 * Links without a real URL render as a visibly marked, non-interactive TODO chip.
 */
export function ContactLinks({ variant = 'icons', className }: ContactLinksProps) {
  if (variant === 'icons') {
    return (
      <ul className={cn('flex items-center gap-2', className)} aria-label="Profiles">
        {profileLinks.map((link) => {
          const Icon = icons[link.id]
          return (
            <li key={link.id}>
              {link.href ? (
                <a
                  href={link.href}
                  aria-label={link.label}
                  className="inline-flex size-11 items-center justify-center rounded-control border border-border text-text-muted transition-colors hover:border-border-strong hover:bg-white/5 hover:text-text"
                  {...(link.id !== 'email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <Icon className="size-[1.125rem]" />
                </a>
              ) : (
                <span
                  data-todo
                  title={`TODO: add ${link.label} in src/data/links.ts`}
                  className="placeholder inline-flex h-11 items-center gap-2 px-3 font-mono text-xs text-text-muted"
                >
                  <Icon className="size-4 opacity-70" />
                  <span>
                    {link.label}
                    <span className="sr-only"> link not added yet</span>
                    <span aria-hidden="true" className="ml-1.5 text-accent-hover">
                      TODO
                    </span>
                  </span>
                </span>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <ul className={cn('grid gap-3', className)}>
      {profileLinks.map((link) => {
        const Icon = icons[link.id]
        const content = (
          <>
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-control border border-border bg-surface-2 text-text-muted">
              <Icon className="size-[1.125rem]" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-text">{link.label}</span>
              <span className="block truncate font-mono text-xs text-text-muted">
                {link.display ?? 'Not added yet'}
              </span>
            </span>
          </>
        )
        return (
          <li key={link.id}>
            {link.href ? (
              <a
                href={link.href}
                className="flex min-h-14 items-center gap-3 rounded-control border border-border p-2 pr-4 transition-colors hover:border-border-strong hover:bg-white/[0.03]"
                {...(link.id !== 'email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {content}
              </a>
            ) : (
              <div data-todo className="placeholder flex min-h-14 items-center gap-3 p-2 pr-4">
                {content}
                <span className="ml-auto font-mono text-[0.6875rem] tracking-[0.08em] text-accent-hover">TODO</span>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
