import { Download, FileText, CheckCircle2 } from 'lucide-react'
import { resume, site } from '@/data/site'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { ButtonLink } from '@/components/ui/Button'
import { Placeholder } from '@/components/ui/Placeholder'

export function Resume() {
  return (
    <Section
      id="resume"
      eyebrow={site.sections.resume.eyebrow}
      title={site.sections.resume.title}
      description={site.sections.resume.description}
    >
      <div className="max-w-3xl">
        <Reveal>
          <Card interactive className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-border">
              <div className="flex items-start gap-4">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-control border border-accent/30 bg-accent/10 text-accent">
                  <FileText className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-text">{site.name} — Résumé</h3>
                  <p className="font-mono text-xs text-text-muted mt-1">{resume.fileName}</p>
                </div>
              </div>

              {resume.available ? (
                <ButtonLink
                  href={resume.href}
                  download={resume.fileName}
                  variant="primary"
                  size="md"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Download PDF
                </ButtonLink>
              ) : (
                <div className="flex flex-col gap-2 sm:items-end">
                  <ButtonLink
                    href={resume.href}
                    download={resume.fileName}
                    variant="secondary"
                    size="md"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    Download (Sample Template)
                  </ButtonLink>
                  <span className="font-mono text-[0.6875rem] text-accent-hover uppercase tracking-wider">
                    Official PDF Pending Upload
                  </span>
                </div>
              )}
            </div>

            <div className="pt-6">
              {!resume.available ? (
                <Placeholder label="Resume PDF (PRD §12 - public/resume/Amodh_Saxena_Resume.pdf)">
                  <p className="text-sm text-text-muted leading-relaxed">
                    Place your final compiled resume in <code className="font-mono text-xs text-text">public/resume/{resume.fileName}</code> and set <code className="font-mono text-xs text-text">resume.available = true</code> in <code className="font-mono text-xs text-text">src/data/site.ts</code>.
                  </p>
                </Placeholder>
              ) : (
                <div className="flex items-center gap-2 text-sm text-emerald-400 font-mono">
                  <CheckCircle2 className="size-4" />
                  <span>Resume verified and available for download.</span>
                </div>
              )}
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
