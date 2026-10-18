import { skillGroups } from '@/data/skills'
import { site } from '@/data/site'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { TechTag } from '@/components/ui/Badge'
import { cn } from '@/lib/cn'

export function Skills() {
  const spanClasses: Record<number, string> = {
    1: 'lg:col-span-1',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
  }

  return (
    <Section
      id="skills"
      eyebrow={site.sections.skills.eyebrow}
      title={site.sections.skills.title}
      description={site.sections.skills.description}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillGroups.map((group, index) => {
          const Icon = group.icon
          return (
            <Reveal
              key={group.id}
              delay={index * 0.05}
              className={cn('h-full', spanClasses[group.span])}
            >
              <Card interactive className="p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-control border border-border bg-surface-2 text-accent">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-medium text-text">{group.title}</h3>
                  </div>

                  <ul className="flex flex-wrap gap-2" aria-label={`${group.title} skills`}>
                    {group.items.map((item) => (
                      <li key={item}>
                        <TechTag>{item}</TechTag>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
