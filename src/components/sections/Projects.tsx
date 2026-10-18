import { lazy, Suspense, useCallback } from 'react'
import { projects } from '@/data/projects'
import { site } from '@/data/site'
import { useHashDialog } from '@/hooks/useHashDialog'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'

// Lazy load the case study dialog for initial JS budget
const CaseStudyDialog = lazy(() => import('@/components/projects/CaseStudyDialog'))

export function Projects() {
  const { openId, open, close } = useHashDialog('project-', 'projects')

  const activeProject = projects.find((p) => p.id === openId) ?? null
  const activeIndex = activeProject ? projects.indexOf(activeProject) : -1

  const preloadDialog = useCallback(() => {
    import('@/components/projects/CaseStudyDialog')
  }, [])

  return (
    <Section
      id="projects"
      eyebrow={site.sections.projects.eyebrow}
      title={site.sections.projects.title}
      description={site.sections.projects.description}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.08} className="h-full">
            <ProjectCard
              project={project}
              index={index}
              onOpen={open}
              onIntent={preloadDialog}
            />
          </Reveal>
        ))}
      </div>

      <Suspense fallback={null}>
        {openId ? (
          <CaseStudyDialog
            project={activeProject}
            index={activeIndex}
            onClose={close}
          />
        ) : null}
      </Suspense>
    </Section>
  )
}
