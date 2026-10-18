import { motion } from 'framer-motion'
import { FileText, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navItems, site } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'
import { cn } from '@/lib/cn'
import { ButtonLink } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { MobileMenu } from './MobileMenu'

const sectionIds = navItems.map((item) => item.id)

export function Header() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const reduce = useReducedMotionSafe()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        data-inert-root
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300',
          scrolled ? 'header-glass border-border' : 'border-transparent bg-transparent',
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <a
            href="#top"
            className="group -ml-1 inline-flex min-h-11 items-center gap-2.5 rounded-control px-1 font-semibold tracking-tight"
            aria-label={`${site.name} — back to top`}
          >
            <span
              aria-hidden="true"
              className="inline-flex size-8 items-center justify-center rounded-control border border-border-strong bg-surface-2 font-mono text-xs text-text transition-colors group-hover:border-accent/60"
            >
              {site.initials}
            </span>
            <span className="hidden lg:inline">{site.name}</span>
          </a>

          <nav aria-label="Primary" className="hidden sm:block">
            <ul className="flex items-center">
              {navItems.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id} className="relative">
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'relative inline-flex min-h-11 items-center px-2 text-sm transition-colors md:px-3',
                        isActive ? 'text-text' : 'text-text-muted hover:text-text',
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId={reduce ? undefined : 'nav-indicator'}
                          aria-hidden="true"
                          className="absolute inset-x-2 -bottom-px h-px bg-accent shadow-[0_0_8px_var(--color-accent-glow)] md:inset-x-3"
                          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                        />
                      ) : null}
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <ButtonLink href="#resume" size="sm" className="hidden sm:inline-flex">
              <FileText aria-hidden="true" />
              Resume
            </ButtonLink>
            <button
              id="mobile-menu-button"
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-control text-text-muted hover:bg-white/5 hover:text-text sm:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeId={active}
        returnFocusId="mobile-menu-button"
      />
    </>
  )
}
