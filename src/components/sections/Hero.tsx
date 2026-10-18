import { motion, type Variants } from 'framer-motion'
import { ArrowDown, FileText } from 'lucide-react'
import { site } from '@/data/site'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'
import { ButtonLink } from '@/components/ui/Button'
import { ContactLinks } from '@/components/ui/ContactLinks'
import { Card } from '@/components/ui/Card'

export function Hero() {
  const reduce = useReducedMotionSafe()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0.15 : 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="top" className="relative min-h-[92svh] pt-24 pb-16 md:pt-32 md:pb-24 flex flex-col justify-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="hero-glow absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="bg-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="container-page relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <motion.div
            className="lg:col-span-7 flex flex-col items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Availability Chip */}
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-1/80 px-3.5 py-1 text-xs font-mono text-text-muted backdrop-blur-sm">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse keep-round" />
                {site.hero.availability}
              </span>
            </motion.div>

            {/* Eyebrow */}
            <motion.p variants={itemVariants} className="eyebrow mb-3 flex items-center gap-2">
              <span aria-hidden="true" className="h-px w-5 bg-accent" />
              {site.hero.eyebrow}
            </motion.p>

            {/* Name & Headline */}
            <motion.h1 variants={itemVariants} className="text-hero font-bold tracking-tight text-balance text-text mb-6">
              {site.hero.headlineLead}
              <span className="text-gradient">{site.hero.headlineHighlight}</span>
              {site.hero.headlineTail}
            </motion.h1>

            {/* Intro paragraph */}
            <motion.p variants={itemVariants} className="measure text-lg md:text-xl text-text-muted leading-relaxed mb-8">
              {site.hero.intro}
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
              <ButtonLink href="#projects" size="lg" className="w-full sm:w-auto">
                View Projects
                <ArrowDown className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="#resume" variant="secondary" size="lg" className="w-full sm:w-auto">
                <FileText className="size-4" aria-hidden="true" />
                Download Resume
              </ButtonLink>
            </motion.div>

            {/* Secondary Contact Row */}
            <motion.div variants={itemVariants}>
              <ContactLinks variant="icons" />
            </motion.div>
          </motion.div>

          {/* Profile / Terminal Code Card */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0.15 : 0.6, delay: reduce ? 0 : 0.2 }}
          >
            <Card className="p-5 font-mono text-xs sm:text-sm border-border-strong bg-surface-1/90 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-border pb-3 mb-4 text-text-subtle">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-red-500/80 keep-round" />
                  <span className="size-2.5 rounded-full bg-amber-500/80 keep-round" />
                  <span className="size-2.5 rounded-full bg-emerald-500/80 keep-round" />
                  <span className="ml-2 text-text-muted">{site.heroProfile.fileName}</span>
                </div>
                <span className="text-[0.6875rem] uppercase tracking-wider text-accent-hover font-semibold">TypeScript</span>
              </div>

              <div className="space-y-1.5 leading-relaxed overflow-x-auto text-text-muted">
                <div>
                  <span className="text-purple-400">const </span>
                  <span className="text-blue-400">{site.heroProfile.variable} </span>
                  <span className="text-text">= </span>
                  <span className="text-yellow-400">{'{'}</span>
                </div>
                {site.heroProfile.fields.map((f) => {
                  const isArray = Array.isArray(f.value)
                  const arrayValues = isArray ? (f.value as readonly string[]) : []

                  return (
                    <div key={f.key} className="pl-4">
                      <span className="text-blue-300">{f.key}</span>
                      <span className="text-text">: </span>
                      {isArray ? (
                        <span>
                          <span className="text-yellow-400">[</span>
                          {arrayValues.map((v, i) => (
                            <span key={v}>
                              <span className="text-emerald-300">"{v}"</span>
                              {i < arrayValues.length - 1 ? <span className="text-text">, </span> : null}
                            </span>
                          ))}
                          <span className="text-yellow-400">]</span>
                        </span>
                      ) : typeof f.value === 'number' ? (
                        <span className="text-amber-300">{f.value}</span>
                      ) : (
                        <span className="text-emerald-300">"{f.value}"</span>
                      )}
                      <span className="text-text">,</span>
                    </div>
                  )
                })}
                <div>
                  <span className="text-yellow-400">{'}'}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
