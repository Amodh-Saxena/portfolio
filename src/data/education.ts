import type { EducationEntry } from './types'
import { todo } from './types'

export const education: EducationEntry[] = [
  {
    institution: 'SRM Institute of Science and Technology',
    campus: 'Kattankulathur',
    degree: 'B.Tech in Computer Science and Engineering',
    specialization: 'Data Science',
    graduation: '2027',
    graduationLabel: 'Expected graduation 2027',
    // Opt-in only. Replace with e.g. '9.1 / 10', or set to null to hide entirely.
    cgpa: todo('CGPA — shown only if you opt in'),
  },
]

/**
 * PRD §5.6 — NOT CONFIRMED. These are suggested categories only and render as
 * placeholders until `confirmed` is set to true with the real course list.
 */
export const coursework = {
  confirmed: false,
  items: ['Data Structures & Algorithms', 'Database Management Systems', 'Operating Systems', 'Machine Learning'],
}
