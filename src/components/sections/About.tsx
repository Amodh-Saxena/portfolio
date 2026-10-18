import { site } from '@/data/site'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { BrainCircuit, Database, Layers, Server } from 'lucide-react'

const highlightIcons = [BrainCircuit, Database, Server, Layers]

export function About() {
  return (
    <Section id="about" eyebrow={site.about.eyebrow} title={site.about.title}>
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Main Narrative Card */}
        <Reveal className="lg:col-span-7">
          <Card interactive className="h-full p-6 sm:p-8 flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-text mb-4">
              Building on solid foundations
            </h3>
            <div className="space-y-4 text-text-muted leading-relaxed text-base sm:text-[1.0625rem]">
              {site.about.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? 'editorial-dropcap' : undefined}>
                  {p}
                </p>
              ))}
            </div>
          </Card>
        </Reveal>

        {/* Bento Grid Highlights */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {site.about.highlights.map((h, i) => {
            const Icon = highlightIcons[i % highlightIcons.length]
            return (
              <Reveal key={h.title} delay={0.05 * (i + 1)}>
                <Card interactive className="p-5 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-control border border-accent/25 bg-accent/10 text-accent">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <h4 className="text-base font-medium text-text">{h.title}</h4>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed">{h.description}</p>
                  </div>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
