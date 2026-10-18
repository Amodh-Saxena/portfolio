import type { HTMLAttributes, PointerEvent } from 'react'
import { cn } from '@/lib/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds hover lift, stronger border and the cursor-following glow (pointer devices only). */
  interactive?: boolean
}

const trackPointer = (event: PointerEvent<HTMLDivElement>) => {
  if (event.pointerType !== 'mouse') return
  const el = event.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
  el.style.setProperty('--my', `${event.clientY - rect.top}px`)
}

export function Card({ interactive = false, className, onPointerMove, ...props }: CardProps) {
  return (
    <div
      className={cn('card', interactive && 'card-interactive card-glow', className)}
      onPointerMove={
        interactive
          ? (event) => {
              trackPointer(event)
              onPointerMove?.(event)
            }
          : onPointerMove
      }
      {...props}
    />
  )
}
