import { Boxes, BrainCircuit, Code, Database, LayoutTemplate, Server } from 'lucide-react'
import type { SkillGroup } from './types'

/** PRD §5.3 — categories only, no proficiency ratings. */
export const skillGroups: SkillGroup[] = [
  {
    id: 'ai-ml',
    title: 'AI / ML',
    icon: BrainCircuit,
    items: ['TensorFlow', 'MobileNet', 'Pandas', 'NumPy', 'Model Evaluation'],
    span: 2,
  },
  {
    id: 'programming',
    title: 'Programming',
    icon: Code,
    items: ['Java', 'Python', 'JavaScript', 'SQL'],
    span: 1,
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: LayoutTemplate,
    items: ['React', 'HTML', 'CSS'],
    span: 1,
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: Server,
    items: ['Spring Boot', 'REST APIs'],
    span: 1,
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: Database,
    items: ['MySQL', 'MongoDB', 'PostgreSQL'],
    span: 1,
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    icon: Boxes,
    items: ['Kubernetes', 'Helm', 'Argo Rollouts', 'Prometheus', 'Git'],
    span: 3,
  },
]
