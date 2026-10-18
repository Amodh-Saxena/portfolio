import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/** Teach tailwind-merge about our custom design tokens so e.g. `text-hero` and `text-text` don't collide. */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['hero', 'h2', 'eyebrow'],
      radius: ['card', 'control'],
      color: [
        'bg',
        'surface-1',
        'surface-2',
        'border',
        'border-strong',
        'text',
        'text-muted',
        'text-subtle',
        'accent',
        'accent-hover',
        'accent-glow',
      ],
    },
  },
})

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
