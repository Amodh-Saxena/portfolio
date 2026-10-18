import { Award, Clock } from 'lucide-react'
import { achievements } from '@/data/achievements'
import { site, features } from '@/data/site'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'

export function Achievements() {
  if (!features.showAchievements) return null

  return (
    <Section
      id="achievements"
      eyebrow={site.sections.achievements.eyebrow}
      title={site.sections.achievements.title}
    >
      <div className="max-w-3xl">
        {achievements.length === 0 ? (
          <Reveal>
            <Card className="p-8 text-center border-dashed border-border flex flex-col items-center justify-center">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-surface-2 text-text-subtle mb-3">
                <Clock className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-base font-medium text-text mb-1">Coming Soon</h3>
              <p className="text-sm text-text-muted max-w-md">
                Certifications and verifiable competitive achievements will be documented here once verified.
              </p>
            </Card>
          </Reveal>
        ) : (
          <div className="grid gap-4">
            {achievements.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <Card interactive className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-control border border-accent/20 bg-accent/10 text-accent">
                      <Award className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-text">{item.title}</h3>
                      <p className="text-sm text-text-muted">
                        {item.issuer} · <span className="font-mono text-xs">{item.date}</span>
                      </p>
                      {item.description ? (
                        <p className="text-sm text-text-muted mt-2">{item.description}</p>
                      ) : null}
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
