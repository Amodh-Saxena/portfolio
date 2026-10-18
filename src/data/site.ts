/**
 * Site-wide copy. Keep free of React/DOM imports — also read by vite.config.ts.
 * All copy here comes from the PRD brief; do not add unverified facts.
 */
export const site = {
  name: 'Amodh Saxena',
  initials: 'AS',
  role: 'Computer Science & Engineering Student',

  hero: {
    eyebrow: 'Computer Science & Engineering · Data Science',
    headlineLead: 'Building ',
    headlineHighlight: 'Intelligent Systems.',
    headlineTail: ' Solving Real-World Problems.',
    intro:
      "I'm a Computer Science and Engineering student specializing in Data Science, passionate about machine learning, software development, and designing scalable technology solutions.",
    availability: 'Open to internships & entry-level roles · Graduating 2027',
  },

  about: {
    eyebrow: 'About',
    title: 'Engineer first, curious always.',
    paragraphs: [
      "I'm a Computer Science and Engineering student at SRM Institute of Science and Technology, specializing in Data Science. My work builds on a computer science foundation and extends into machine learning, data science, full-stack development, and system design.",
      "What draws me in is practical application: taking a complex problem, understanding it properly, and building something that works reliably for the people who depend on it. I'm continuously working to improve my engineering skills — one project, and one hard problem, at a time.",
    ],
    highlights: [
      {
        title: 'Machine Learning',
        description: 'Training, evaluating, and deploying models — from image classification to safe production rollouts.',
      },
      {
        title: 'Data Science',
        description: 'Working with data in Python using Pandas and NumPy, with a focus on sound model evaluation.',
      },
      {
        title: 'Full-Stack Development',
        description: 'React on the front end, Spring Boot and REST APIs on the back end, relational and document databases underneath.',
      },
      {
        title: 'System Design',
        description: 'Thinking in components, interfaces, and failure modes — including progressive delivery on Kubernetes.',
      },
    ],
  },

  footer: {
    builtWith: 'Built with React, TypeScript, Tailwind CSS & Framer Motion.',
    year: 2026,
  },

  /** Decorative "profile.ts" card in the hero — facts from the brief only. */
  heroProfile: {
    fileName: 'profile.ts',
    variable: 'amodh',
    fields: [
      { key: 'degree', value: 'B.Tech CSE · Data Science' },
      { key: 'university', value: 'SRM IST, Kattankulathur' },
      { key: 'graduating', value: 2027 },
      { key: 'focus', value: ['Machine Learning', 'Data Science', 'Full-Stack', 'System Design'] },
      { key: 'openTo', value: ['Internships', 'Entry-level roles'] },
    ],
  },

  sections: {
    skills: {
      eyebrow: 'Skills',
      title: 'Technical toolkit',
      description: 'The languages, frameworks and infrastructure I build with, grouped by where they sit in the stack.',
    },
    projects: {
      eyebrow: 'Featured projects',
      title: 'Selected work',
      description: 'Each project is written up as a short case study: the problem, the approach, the architecture and the implementation.',
    },
    education: {
      eyebrow: 'Education',
      title: 'Academic background',
    },
    coursework: {
      eyebrow: 'Coursework',
      title: 'Relevant coursework',
    },
    achievements: {
      eyebrow: 'Achievements',
      title: 'Achievements & certifications',
    },
    github: {
      eyebrow: 'GitHub',
      title: 'Code in the open',
      description: 'Repositories and ongoing work.',
    },
    resume: {
      eyebrow: 'Resume',
      title: 'Résumé',
      description: 'A PDF copy of my résumé for applications and offline reading.',
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's build something.",
      description:
        'Open to internships and entry-level roles across software engineering, AI/ML and data science. Reach out by email or connect on LinkedIn.',
    },
  },
} as const

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
] as const

/** Section feature flags */
export const features = {
  /** Show Achievements section (renders a "Coming soon" card while empty). */
  showAchievements: true,
} as const

export const resume = {
  /** TODO: set to true once public/resume/Amodh_Saxena_Resume.pdf is added. */
  available: false,
  href: '/resume/Amodh_Saxena_Resume.pdf',
  fileName: 'Amodh_Saxena_Resume.pdf',
} as const
