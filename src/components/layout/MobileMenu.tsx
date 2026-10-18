import { AnimatePresence, motion } from 'framer-motion'
import { FileText, X } from 'lucide-react'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { navItems, site } from '@/data/site'
import { useModal } from '@/hooks/useModal'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'
import { cn } from '@/lib/cn'
import { ButtonLink } from '@/components/ui/Button'
import { ContactLinks } from '@/components/ui/ContactLinks'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  activeId: string | null
  returnFocusId: string
}

/** Full-screen, focus-trapped navigation sheet for small screens. */
export function MobileMenu({ open, onClose, activeId, returnFocusId }: MobileMenuProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotionSafe()
  useModal(ref, open, onClose, { getReturnFocus: () => document.getElementById(returnFocusId) })

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={ref}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          tabIndex={-1}
          className="fixed inset-0 z-[70] flex flex-col bg-bg/95 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] backdrop-blur-xl sm:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.2 }}
        >
          <div className="container-page flex h-16 items-center justify-between">
            <span className="font-semibold tracking-tight">{site.name}</span>
            <button
              type="button"
              onClick={onClose}
              data-autofocus
              aria-label="Close menu"
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-control text-text-muted hover:bg-white/5 hover:text-text"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-page flex-1 overflow-y-auto pt-6">
            <ul className="grid gap-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : 0.04 * i, duration: reduce ? 0.15 : 0.35, ease: 'easeOut' }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={onClose}
                    aria-current={activeId === item.id ? 'true' : undefined}
                    className={cn(
                      'flex min-h-14 items-center justify-between border-b border-border text-2xl font-semibold tracking-tight transition-colors',
                      activeId === item.id ? 'text-text' : 'text-text-muted hover:text-text',
                    )}
                  >
                    {item.label}
                    <span className="font-mono text-xs text-text-subtle">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="container-page grid gap-4 py-6 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted">Style</span>
              <ThemeToggle />
            </div>
            <ButtonLink href="#resume" onClick={onClose} size="lg" className="w-full">
              <FileText aria-hidden="true" />
              Resume
            </ButtonLink>
            <ContactLinks className="flex-wrap" />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
