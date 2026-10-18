import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { isTodo, type Text } from '@/data/types'

const TodoBadge = () => (
  <span className="inline-flex shrink-0 items-center rounded-[4px] bg-accent/15 px-1.5 py-px font-mono text-[0.6875rem] font-medium tracking-[0.08em] text-accent-hover uppercase">
    TODO
  </span>
)

interface PlaceholderProps {
  label: ReactNode
  children?: ReactNode
  className?: string
  inline?: boolean
}

/**
 * Visibly marked placeholder for content that hasn't been supplied or verified yet.
 * Every instance is listed in the README placeholder register — never replace with invented facts.
 */
export function Placeholder({ label, children, className, inline = false }: PlaceholderProps) {
  if (inline) {
    return (
      <span data-todo className={cn('placeholder inline-flex items-center gap-2 px-2 py-0.5 text-sm text-text-muted', className)}>
        <TodoBadge />
        <span>{label}</span>
      </span>
    )
  }
  return (
    <div data-todo className={cn('placeholder p-4 text-sm text-text-muted', className)}>
      <div className="flex items-start gap-2.5">
        <TodoBadge />
        <span className="text-text">{label}</span>
      </div>
      {children ? <div className="mt-2 pl-0.5">{children}</div> : null}
    </div>
  )
}

/** Renders real copy, or an inline placeholder when the value is a `todo(...)`. */
export function TextOrTodo({ value }: { value: Text }) {
  return isTodo(value) ? <Placeholder inline label={value.todo} /> : <>{value}</>
}
