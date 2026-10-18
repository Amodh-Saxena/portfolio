import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'article'
}

/** Reveal-once-on-scroll wrapper: 16px rise + fade. Opacity-only (≤150ms) under reduced motion. */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const reduce = useReducedMotionSafe()
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={reduce ? { duration: 0.15 } : { duration: 0.5, ease: 'easeOut', delay }}
    >
      {children}
    </Component>
  )
}
