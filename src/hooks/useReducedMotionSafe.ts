import { useReducedMotion } from 'framer-motion'

/** Boolean wrapper around Framer's `useReducedMotion` (null → false). */
export function useReducedMotionSafe(): boolean {
  return useReducedMotion() ?? false
}
