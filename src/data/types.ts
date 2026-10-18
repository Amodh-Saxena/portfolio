import type { LucideIcon } from 'lucide-react'

/**
 * A value that has not been supplied / verified yet.
 * Rendered as a visibly marked <Placeholder>. Search the codebase for `todo(` to find them all.
 */
export interface Todo {
  readonly todo: string
}

/** Either real copy, or a marked placeholder. */
export type Text = string | Todo

export const todo = (note: string): Todo => ({ todo: note })

export const isTodo = (value: unknown): value is Todo =>
  typeof value === 'object' && value !== null && 'todo' in value

/* ---------- Skills ---------- */
export interface SkillGroup {
  id: string
  title: string
  icon: LucideIcon
  items: string[]
  /** Desktop bento column span (1–3). Single column on mobile. */
  span: 1 | 2 | 3
}

/* ---------- Projects ---------- */
export interface DiagramNode {
  label: string
  detail?: string
  icon: LucideIcon
}

interface DiagramBase {
  /** Short text alternative read by assistive tech, in addition to the ordered list. */
  summary: string
  nodes: DiagramNode[]
}

export type Diagram =
  | (DiagramBase & { kind: 'pipeline' })
  | (DiagramBase & {
      kind: 'canary'
      /** Decision outcomes after the analysis gate: [pass, fail]. */
      outcomes: [DiagramNode, DiagramNode]
    })
  | (DiagramBase & { kind: 'layered' })

export interface Project {
  /** Used for deep links: `#project-<id>` */
  id: string
  title: string
  summary: string
  /** 3–5 tags shown on the card */
  tags: string[]
  /* Required case-study fields — enforced by the compiler */
  problem: Text
  solution: Text
  architecture: Diagram
  stack: string[]
  implementation: Text[]
  links: {
    github: string | null
    demo: string | null
  }
  /** Only include verified results supplied by Amodh. Omit entirely otherwise. */
  outcome?: string[]
  /** Unverified specifics still to confirm before publishing. */
  pending?: string[]
}

/* ---------- Education / achievements ---------- */
export interface EducationEntry {
  institution: string
  campus: string
  degree: string
  specialization: string
  graduation: string
  graduationLabel: string
  /** Opt-in only. `null` = hidden; a Todo = visible placeholder. */
  cgpa: string | Todo | null
}

export interface Achievement {
  title: string
  issuer: string
  date: string
  url?: string
  description?: string
}

export interface PinnedRepo {
  name: string
  description: string
  url: string
  language?: string
}
