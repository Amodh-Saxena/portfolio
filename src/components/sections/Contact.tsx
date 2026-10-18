import { Mail, ArrowUpRight } from 'lucide-react'
import { EMAIL } from '@/data/links'
import { site } from '@/data/site'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { ContactLinks } from '@/components/ui/ContactLinks'
import { ButtonLink } from '@/components/ui/Button'
import { Placeholder } from '@/components/ui/Placeholder'

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow={site.sections.contact.eyebrow}
      title={site.sections.contact.title}
      description={site.sections.contact.description}
    >
      <div className="grid gap-8 lg:grid-cols-12 max-w-5xl">
        {/* Direct Email Callout Card */}
        <Reveal className="lg:col-span-7">
          <Card interactive className="p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              <span className="inline-flex size-11 items-center justify-center rounded-control border border-accent/30 bg-accent/10 text-accent mb-6">
                <Mail className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-text mb-3">
                Send a direct message
              </h3>
              <p className="text-text-muted leading-relaxed text-sm sm:text-base mb-8">
                Whether you have an internship opportunity, a project to collaborate on, or simply want to connect, feel free to reach out.
              </p>
            </div>

            {EMAIL ? (
              <ButtonLink href={`mailto:${EMAIL}`} size="lg" className="w-full sm:w-auto self-start">
                <Mail className="size-4" aria-hidden="true" />
                {EMAIL}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </ButtonLink>
            ) : (
              <div className="space-y-3">
                <Placeholder label="Email address not yet configured (PRD §12 - src/data/links.ts)">
                  <p className="text-xs text-text-muted">
                    Set your email in <code className="font-mono text-text">src/data/links.ts</code> to enable the primary mailto button.
                  </p>
                </Placeholder>
              </div>
            )}
          </Card>
        </Reveal>

        {/* Profiles List */}
        <Reveal delay={0.08} className="lg:col-span-5">
          <Card className="p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              <h4 className="text-base font-semibold text-text mb-2">Connect Elsewhere</h4>
              <p className="text-xs text-text-muted mb-6 leading-relaxed">
                Connect through verified networks and repositories.
              </p>
              <ContactLinks variant="list" />
            </div>

            <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-text-subtle">
              <span>Location: India</span>
              <span>IST (UTC +5:30)</span>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
