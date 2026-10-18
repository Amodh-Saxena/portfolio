import { motion, useScroll, useSpring } from 'framer-motion'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'

/** Thin blue reading-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const reduce = useReducedMotionSafe()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent shadow-[0_0_12px_var(--color-accent-glow)]"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  )
}
