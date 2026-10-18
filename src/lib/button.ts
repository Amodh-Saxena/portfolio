import { cn } from './cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-control font-medium ' +
  'transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out ' +
  'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 ' +
  '[&_svg]:size-4 [&_svg]:shrink-0'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white shadow-[0_0_0_1px_rgb(59_130_255/0.5),0_8px_24px_-8px_var(--color-accent-glow)] ' +
    'hover:bg-accent-hover hover:shadow-[0_0_0_1px_rgb(92_153_255/0.6),0_10px_32px_-6px_var(--color-accent-glow)]',
  secondary:
    'border border-border-strong bg-surface-1 text-text hover:border-white/25 hover:bg-surface-2',
  ghost: 'text-text-muted hover:bg-white/5 hover:text-text',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-3 text-sm',
  md: 'min-h-11 px-4 text-sm',
  lg: 'min-h-12 px-5 text-[0.9375rem]',
}

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className)
}
