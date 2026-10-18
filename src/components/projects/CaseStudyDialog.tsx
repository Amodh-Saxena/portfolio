import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, X } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '@/data/types'
import { useModal } from '@/hooks/useModal'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'
import { ButtonLink } from '@/components/ui/Button'
import { TagList } from '@/components/ui/Badge'
import { GitHubIcon } from '@/components/ui/BrandIcons'
import { Placeholder, TextOrTodo } from '@/components/ui/Placeholder'
import { ArchitectureDiagram } from './ArchitectureDiagram'

interface CaseStudyDialogProps {
  project: Project | null
  index: number
  onClose: () => void
}

/** Lazy-loaded case-study dialog. Deep-linked via `#project-<id>` (see useHashDialog). */
export default function CaseStudyDialog({ project, index, onClose }: CaseStudyDialogProps) {
  return createPortal(
    <AnimatePresence>
      {project ? <DialogPanel key={project.id} project={project} index={index} onClose={onClose} /> : null}
    </AnimatePresence>,
    document.body,
  )
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="eyebrow">{title}</h3>
      {children}
    </section>
  )
}

function DialogPanel({ project, index, onClose }: { project: Project; index: number; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotionSafe()
  const titleId = `case-${project.id}-title`

  useModal(ref, true, onClose, {
    getReturnFocus: () => document.getElementById(`project-card-${project.id}`),
  })

  const hasLinks = Boolean(project.links.github || project.links.demo)

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0.15 : 0.25 }}
      />

      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative flex max-h-[94dvh] w-full max-w-3xl flex-col sm:max-h-[88dvh]"
      >
        <motion.div
          aria-hidden="true"
          layoutId={reduce ? undefined : `case-surface-${project.id}`}
          className="absolute inset-0 border border-border-strong bg-surface-1 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8),0_0_0_1px_rgb(59_130_255/0.08)]"
          style={{ borderRadius: 'var(--radius-card)' }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          {...(reduce
            ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 } }
            : {})}
        />

        <motion.div
          className="relative flex min-h-0 flex-1 flex-col"
          initial={{ opacity: 0, y: reduce ? 0 : 8 }}
          animate={{ opacity: 1, y: 0, transition: { delay: reduce ? 0 : 0.12, duration: reduce ? 0.15 : 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-border px-5 pt-5 pb-4 sm:px-8 sm:pt-7">
            <div className="min-w-0">
              <p className="eyebrow mb-2">Case study · {String(index + 1).padStart(2, '0')}</p>
              <h2 id={titleId} className="text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl">
                {project.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              data-autofocus
              aria-label="Close case study"
              className="-mt-1 -mr-2 inline-flex size-11 shrink-0 items-center justify-center rounded-control text-text-muted transition-colors hover:bg-white/5 hover:text-text"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          {/* Body */}
          <div className="min-h-0 flex-1 space-y-9 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-8">
            <p className="text-lg leading-relaxed text-text">{project.summary}</p>

            <div className="grid gap-8 md:grid-cols-2">
              <Block title="Problem">
                <p className="leading-relaxed text-text-muted">
                  <TextOrTodo value={project.problem} />
                </p>
              </Block>
              <Block title="Solution">
                <p className="leading-relaxed text-text-muted">
                  <TextOrTodo value={project.solution} />
                </p>
              </Block>
            </div>

            <Block title="Architecture / workflow">
              <ArchitectureDiagram diagram={project.architecture} id={project.id} />
            </Block>

            <Block title="Technology stack">
              <TagList items={project.stack} label={`${project.title} technology stack`} />
            </Block>

            <Block title="Key implementation details">
              <ul className="space-y-3">
                {project.implementation.map((item, i) => (
                  <li key={i} className="flex gap-3 leading-relaxed text-text-muted">
                    <Check className="mt-1.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>
                      <TextOrTodo value={item} />
                    </span>
                  </li>
                ))}
              </ul>
            </Block>

            {project.outcome?.length ? (
              <Block title="Outcome">
                <ul className="list-disc space-y-2 pl-5 text-text-muted marker:text-accent">
                  {project.outcome.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Block>
            ) : null}

            {project.pending?.length ? (
              <Placeholder label="Details pending confirmation before publishing">
                <p>{project.pending.join(' · ')}</p>
              </Placeholder>
            ) : null}

            {hasLinks ? (
              <Block title="Links">
                <div className="flex flex-wrap gap-3">
                  {project.links.github ? (
                    <ButtonLink href={project.links.github} target="_blank" rel="noopener noreferrer" variant="secondary">
                      <GitHubIcon />
                      View source
                    </ButtonLink>
                  ) : null}
                  {project.links.demo ? (
                    <ButtonLink href={project.links.demo} target="_blank" rel="noopener noreferrer">
                      Live demo
                      <ArrowUpRight aria-hidden="true" />
                    </ButtonLink>
                  ) : null}
                </div>
              </Block>
            ) : null}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
