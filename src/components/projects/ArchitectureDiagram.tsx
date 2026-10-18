import type { Diagram, DiagramNode } from '@/data/types'
import { cn } from '@/lib/cn'

/* Architecture / workflow diagrams rendered as semantic React + SVG (not images).
   The ordered list itself is the text alternative; `summary` adds a prose description. */

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={cn('size-4 text-accent/80', className)}>
      <path
        d="M4 12h15m-5-5 5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NodeBox({
  node,
  step,
  layout = 'responsive',
  emphasis = false,
}: {
  node: DiagramNode
  step?: number
  layout?: 'responsive' | 'row'
  emphasis?: boolean
}) {
  const Icon = node.icon
  return (
    <div
      className={cn(
        'flex h-full items-start gap-3 rounded-control border bg-surface-2 p-3',
        emphasis ? 'border-accent/40' : 'border-border',
        layout === 'responsive' && '@2xl:flex-col @2xl:gap-2.5',
      )}
    >
      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-accent/30 bg-accent/10 text-accent-hover">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        {step !== undefined ? (
          <span className="block font-mono text-[0.6875rem] leading-4 text-text-subtle">
            {String(step).padStart(2, '0')}
          </span>
        ) : null}
        <span className="block text-sm leading-snug font-medium text-text">{node.label}</span>
        {node.detail ? (
          <span className="mt-0.5 block text-xs leading-snug text-text-muted">{node.detail}</span>
        ) : null}
      </span>
    </div>
  )
}

function Pipeline({ nodes, label }: { nodes: DiagramNode[]; label: string }) {
  return (
    <ol aria-label={label} className="flex flex-col @2xl:flex-row">
      {nodes.map((node, i) => (
        <li key={node.label} className="flex flex-1 flex-col items-stretch @2xl:flex-row">
          <div className="flex-1">
            <NodeBox node={node} step={i + 1} />
          </div>
          {i < nodes.length - 1 ? (
            <div className="flex items-center justify-center py-1.5 @2xl:px-1.5 @2xl:py-0">
              <Arrow className="rotate-90 @2xl:rotate-0" />
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  )
}

function Layered({ nodes, label }: { nodes: DiagramNode[]; label: string }) {
  return (
    <ol aria-label={label} className="mx-auto flex max-w-md flex-col">
      {nodes.map((node, i) => (
        <li key={node.label} className="flex flex-col items-stretch">
          <NodeBox node={node} step={i + 1} layout="row" />
          {i < nodes.length - 1 ? (
            <div className="flex items-center justify-center gap-1 py-1.5">
              <Arrow className="rotate-90" />
              <Arrow className="-rotate-90 opacity-50" />
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  )
}

export function ArchitectureDiagram({ diagram, id }: { diagram: Diagram; id: string }) {
  const descId = `${id}-diagram-desc`
  const label = diagram.kind === 'layered' ? 'Architecture layers' : 'Workflow steps'

  return (
    <figure aria-describedby={descId} className="@container rounded-card border border-border bg-bg/60 p-4 sm:p-5">
      <p id={descId} className="sr-only">
        {diagram.summary}
      </p>

      {diagram.kind === 'pipeline' ? <Pipeline nodes={diagram.nodes} label={label} /> : null}
      {diagram.kind === 'layered' ? <Layered nodes={diagram.nodes} label={label} /> : null}

      {diagram.kind === 'canary' ? (
        <>
          <Pipeline nodes={diagram.nodes} label={label} />
          {/* Decision fork */}
          <svg
            viewBox="0 0 100 28"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
            className="mx-auto mt-1 block h-7 w-1/2 text-accent/60 @2xl:ml-auto @2xl:mr-0 @2xl:w-[40%]"
          >
            <path
              d="M50 0 V10 M25 10 H75 M25 10 V28 M75 10 V28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <ul
            aria-label="Analysis gate outcomes"
            className="grid grid-cols-2 gap-3 @2xl:ml-auto @2xl:w-[60%]"
          >
            <li>
              <p className="mb-1.5 text-center font-mono text-[0.6875rem] text-text-muted">If healthy</p>
              <NodeBox node={diagram.outcomes[0]} layout="row" emphasis />
            </li>
            <li>
              <p className="mb-1.5 text-center font-mono text-[0.6875rem] text-text-muted">If degraded</p>
              <NodeBox node={diagram.outcomes[1]} layout="row" />
            </li>
          </ul>
        </>
      ) : null}
    </figure>
  )
}
