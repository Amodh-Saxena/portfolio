import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/** Monospace technology tag. */
export function TechTag({
  className,
  hover = true,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { hover?: boolean }) {
  return <span className={cn('tag', hover && 'tag-hover', className)} {...props} />
}

export function TagList({ items, className, label }: { items: readonly string[]; className?: string; label?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-2', className)} aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <TechTag>{item}</TechTag>
        </li>
      ))}
    </ul>
  )
}
