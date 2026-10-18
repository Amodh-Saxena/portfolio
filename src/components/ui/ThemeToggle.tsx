import { Newspaper, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/cn'

interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
}

export function ThemeToggle({ className, showLabel = true }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isNewsprint = theme === 'newsprint'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isNewsprint ? 'Switch to Obsidian Dark theme' : 'Switch to Newsprint Broadsheet theme'}
      title={isNewsprint ? 'Switch to Obsidian Dark' : 'Switch to Newsprint Broadsheet'}
      className={cn(
        'group inline-flex min-h-9 items-center justify-center gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-200 select-none cursor-pointer',
        isNewsprint
          ? 'border border-[#111111] bg-[#F9F9F7] text-[#111111] hover:bg-[#111111] hover:text-[#F9F9F7] shadow-[2px_2px_0px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5'
          : 'rounded-control border border-border bg-surface-2/90 text-text-muted hover:border-accent/40 hover:text-text hover:shadow-[0_0_12px_var(--color-accent-glow)] backdrop-blur-sm',
        className,
      )}
    >
      {isNewsprint ? (
        <>
          <Moon className="size-3.5 text-accent shrink-0 transition-transform group-hover:-rotate-12" aria-hidden="true" />
          {showLabel && <span>Obsidian</span>}
        </>
      ) : (
        <>
          <Newspaper className="size-3.5 text-accent shrink-0 transition-transform group-hover:scale-110" aria-hidden="true" />
          {showLabel && <span>Broadsheet</span>}
        </>
      )}
    </button>
  )
}
