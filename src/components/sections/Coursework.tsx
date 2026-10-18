import { coursework } from '@/data/education'
import { site } from '@/data/site'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { Placeholder } from '@/components/ui/Placeholder'
import { TechTag } from '@/components/ui/Badge'

export function Coursework() {
  return (
    <Section
      id="coursework"
      eyebrow={site.sections.coursework.eyebrow}
      title={site.sections.coursework.title}
    >
      <Reveal>
        <Card className="p-6 sm:p-8 max-w-3xl">
          {!coursework.confirmed ? (
            <div className="space-y-4">
              <Placeholder label="Coursework list pending confirmation (PRD §5.6)">
                <p className="text-text-muted text-sm mb-3">
                  The following courses are suggested placeholders from the curriculum and have not yet been confirmed for public listing:
                </p>
                <div className="flex flex-wrap gap-2">
                  {coursework.items.map((course) => (
                    <span
                      key={course}
                      className="inline-flex items-center gap-1.5 rounded-control border border-border/80 bg-surface-2/60 px-2.5 py-1 font-mono text-xs text-text-muted"
                    >
                      <span className="size-1.5 rounded-full bg-accent/60" />
                      {course}
                    </span>
                  ))}
                </div>
              </Placeholder>
            </div>
          ) : (
            <ul className="flex flex-wrap gap-2.5" aria-label="Completed coursework">
              {coursework.items.map((course) => (
                <li key={course}>
                  <TechTag>{course}</TechTag>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </Reveal>
    </Section>
  )
}
