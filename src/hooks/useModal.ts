import { useEffect, useEffectEvent, type RefObject } from 'react'

const FOCUSABLE =
  'a[href], area[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, object, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'

interface ModalOptions {
  /** Element to focus when the modal closes; defaults to whatever was focused before opening. */
  getReturnFocus?: () => HTMLElement | null
}

/**
 * Shared modal behaviour for the mobile menu and case-study dialog (PRD §7):
 * focus trap, Esc to close, background `inert`, scroll lock, focus return.
 * Background regions opt in with the `data-inert-root` attribute.
 */
export function useModal(
  ref: RefObject<HTMLElement | null>,
  open: boolean,
  onClose: () => void,
  options: ModalOptions = {},
) {
  const handleClose = useEffectEvent(onClose)
  const getReturnFocus = useEffectEvent(() => options.getReturnFocus?.() ?? null)

  useEffect(() => {
    if (!open) return
    const node = ref.current
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null

    const roots = Array.from(document.querySelectorAll<HTMLElement>('[data-inert-root]'))
    roots.forEach((el) => (el.inert = true))

    const html = document.documentElement
    const prevOverflow = html.style.overflow
    html.style.overflow = 'hidden'

    const focusables = () =>
      node
        ? Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
            (el) => el.getClientRects().length > 0 && !el.closest('[inert]'),
          )
        : []

    const initial = node?.querySelector<HTMLElement>('[data-autofocus]') ?? focusables()[0] ?? node
    initial?.focus({ preventScroll: true })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        handleClose()
        return
      }
      if (event.key !== 'Tab') return
      const items = focusables()
      if (!items.length) {
        event.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (event.shiftKey && (active === first || active === node)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      roots.forEach((el) => (el.inert = false))
      html.style.overflow = prevOverflow
      const target = getReturnFocus() ?? previouslyFocused
      target?.focus({ preventScroll: true })
    }
  }, [open, ref])
}
