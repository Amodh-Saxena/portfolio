import { ExternalLink, GitBranch, FolderGit2 } from 'lucide-react'
import { GITHUB_USERNAME, GITHUB_URL, pinnedRepos } from '@/data/links'
import { site } from '@/data/site'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { Placeholder } from '@/components/ui/Placeholder'
import { GitHubIcon } from '@/components/ui/BrandIcons'
import { ButtonLink } from '@/components/ui/Button'

export function GitHub() {
  return (
    <Section
      id="github"
      eyebrow={site.sections.github.eyebrow}
      title={site.sections.github.title}
      description={site.sections.github.description}
    >
      <div className="space-y-6 max-w-4xl">
        {/* Profile Card */}
        <Reveal>
          <Card interactive className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-control border border-border bg-surface-2 text-text">
                <GitHubIcon className="size-6" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-text">GitHub Profile</h3>
                {GITHUB_USERNAME ? (
                  <p className="font-mono text-sm text-text-muted">@{GITHUB_USERNAME}</p>
                ) : (
                  <p className="font-mono text-xs text-text-subtle">Username pending configuration</p>
                )}
              </div>
            </div>

            {GITHUB_URL ? (
              <ButtonLink href={GITHUB_URL} target="_blank" rel="noopener noreferrer" variant="secondary">
                View Profile
                <ExternalLink className="size-4" aria-hidden="true" />
              </ButtonLink>
            ) : (
              <Placeholder inline label="GitHub URL in src/data/links.ts" />
            )}
          </Card>
        </Reveal>

        {/* Pinned Repos or Placeholder */}
        {pinnedRepos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pinnedRepos.map((repo) => (
              <Reveal key={repo.name}>
                <Card interactive className="p-5 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FolderGit2 className="size-4 text-accent" aria-hidden="true" />
                        <h4 className="font-mono text-sm font-semibold text-text">{repo.name}</h4>
                      </div>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${repo.name} repository`}
                        className="text-text-muted hover:text-text"
                      >
                        <ExternalLink className="size-3.5" aria-hidden="true" />
                      </a>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">{repo.description}</p>
                  </div>
                  {repo.language ? (
                    <div className="mt-4 flex items-center gap-1.5 font-mono text-[0.6875rem] text-text-subtle">
                      <GitBranch className="size-3" aria-hidden="true" />
                      {repo.language}
                    </div>
                  ) : null}
                </Card>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={0.08}>
            <Placeholder label="Pinned Repositories & Contribution Graph (PRD §5.8)">
              <p className="text-sm text-text-muted leading-relaxed">
                Add pinned repositories in <code className="font-mono text-xs text-text">src/data/links.ts</code> once your public repos are set up. No fake commit counts or simulated heatmaps are rendered.
              </p>
            </Placeholder>
          </Reveal>
        )}
      </div>
    </Section>
  )
}
