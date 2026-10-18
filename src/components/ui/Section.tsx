import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  description?: ReactNode
  children: ReactNode
  className?: string
}

/** Section wrapper: landmark + eyebrow + h2 + optional description (PRD §4.7). */
export function Section({ id, eyebrow, title, description, children, className }: SectionProps) {
  const titleId = `${id}-title`
  return (
    <section id={id} aria-labelledby={titleId} className={cn('section-y relative', className)}>
      <div className="container-page">
        <Reveal className="mb-10 md:mb-14">
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-6 bg-accent" />
            {eyebrow}
          </p>
          <h2 id={titleId} className="text-h2 font-[650] text-balance text-text">
            {title}
          </h2>
          {description ? <div className="measure mt-4 text-text-muted">{description}</div> : null}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
