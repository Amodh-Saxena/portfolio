import { GraduationCap, Calendar, MapPin } from 'lucide-react'
import { education } from '@/data/education'
import { site } from '@/data/site'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { Placeholder } from '@/components/ui/Placeholder'
import { isTodo } from '@/data/types'

export function Education() {
  return (
    <Section
      id="education"
      eyebrow={site.sections.education.eyebrow}
      title={site.sections.education.title}
    >
      <div className="space-y-6 max-w-3xl">
        {education.map((item, index) => (
          <Reveal key={item.institution} delay={index * 0.05}>
            <Card interactive className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-control border border-accent/30 bg-accent/10 text-accent">
                    <GraduationCap className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-text">{item.institution}</h3>
                    <p className="flex items-center gap-1.5 text-sm text-text-muted mt-0.5">
                      <MapPin className="size-3.5 text-text-subtle" aria-hidden="true" />
                      {item.campus}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-xs text-text-muted self-start">
                  <Calendar className="size-3 text-text-subtle" aria-hidden="true" />
                  {item.graduationLabel}
                </span>
              </div>

              <div className="pt-2 border-t border-border mt-4">
                <p className="text-base font-medium text-text">
                  {item.degree} <span className="text-text-muted">({item.specialization})</span>
                </p>

                {item.cgpa ? (
                  <div className="mt-3">
                    {isTodo(item.cgpa) ? (
                      <Placeholder inline label={item.cgpa.todo} />
                    ) : (
                      <span className="font-mono text-sm text-text-muted">
                        CGPA: <strong className="text-text">{item.cgpa}</strong>
                      </span>
                    )}
                  </div>
                ) : null}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
