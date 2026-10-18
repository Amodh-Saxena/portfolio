import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import type { Project } from '@/data/types'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'
import { Card } from '@/components/ui/Card'
import { TagList } from '@/components/ui/Badge'
import { GitHubIcon } from '@/components/ui/BrandIcons'

interface ProjectCardProps {
  project: Project
  index: number
  onOpen: (id: string) => void
  onIntent?: () => void
}

export function ProjectCard({ project, index, onOpen, onIntent }: ProjectCardProps) {
  const reduce = useReducedMotionSafe()
  const titleId = `project-${project.id}-title`

  return (
    <article id={`project-${project.id}`} aria-labelledby={titleId} className="h-full">
      <Card interactive className="group flex h-full flex-col p-6">
        {/* Shared-layout surface that expands into the case-study dialog */}
        <motion.div
          aria-hidden="true"
          layoutId={reduce ? undefined : `case-surface-${project.id}`}
          className="absolute inset-0 -z-20 bg-surface-1"
          style={{ borderRadius: 'var(--radius-card)' }}
        />

        <div className="mb-8 flex items-center justify-between">
          <span className="font-mono text-xs text-text-subtle">{String(index + 1).padStart(2, '0')}</span>
          <div className="relative z-10 flex items-center gap-1">
            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code on GitHub`}
                className="inline-flex size-11 items-center justify-center rounded-control text-text-muted transition-colors hover:bg-white/5 hover:text-text"
              >
                <GitHubIcon className="size-[1.125rem]" />
              </a>
            ) : null}
            {project.links.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="inline-flex size-11 items-center justify-center rounded-control text-text-muted transition-colors hover:bg-white/5 hover:text-text"
              >
                <ExternalLink className="size-[1.125rem]" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>

        <h3 id={titleId} className="text-xl leading-snug font-semibold tracking-tight text-balance text-text">
          {project.title}
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-muted">{project.summary}</p>

        <TagList items={project.tags} label="Technologies" className="mt-6 mb-8" />

        <button
          id={`project-card-${project.id}`}
          type="button"
          onClick={() => onOpen(project.id)}
          onPointerEnter={onIntent}
          onFocus={onIntent}
          aria-haspopup="dialog"
          className="mt-auto inline-flex min-h-11 items-center gap-2 self-start rounded-control text-sm font-medium text-accent-hover transition-colors after:absolute after:inset-0 after:rounded-card after:content-[''] hover:text-text"
        >
          Read case study
          <span className="sr-only">: {project.title}</span>
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </Card>
    </article>
  )
}
