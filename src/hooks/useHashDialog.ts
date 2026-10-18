import { useCallback, useEffect, useState } from 'react'

const readHash = (prefix: string): string | null => {
  if (typeof window === 'undefined') return null
  const hash = decodeURIComponent(window.location.hash.slice(1))
  return hash.startsWith(prefix) ? hash.slice(prefix.length) || null : null
}

/**
 * Keeps a dialog's open state in sync with the URL hash (e.g. `#project-canaryml`)
 * so case studies are deep-linkable and the back button closes them.
 */
export function useHashDialog(prefix: string, fallbackHash: string) {
  const [openId, setOpenId] = useState<string | null>(() => readHash(prefix))

  useEffect(() => {
    const sync = () => setOpenId(readHash(prefix))
    window.addEventListener('hashchange', sync)
    window.addEventListener('popstate', sync)
    return () => {
      window.removeEventListener('hashchange', sync)
      window.removeEventListener('popstate', sync)
    }
  }, [prefix])

  const open = useCallback(
    (id: string) => {
      window.history.pushState(null, '', `#${prefix}${id}`)
      setOpenId(id)
    },
    [prefix],
  )

  const close = useCallback(() => {
    window.history.replaceState(null, '', `#${fallbackHash}`)
    setOpenId(null)
  }, [fallbackHash])

  return { openId, open, close }
}
