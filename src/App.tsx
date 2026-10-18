import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { NewsprintMasthead } from '@/components/layout/NewsprintMasthead'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Education } from '@/components/sections/Education'
import { Coursework } from '@/components/sections/Coursework'
import { Achievements } from '@/components/sections/Achievements'
import { GitHub } from '@/components/sections/GitHub'
import { Resume } from '@/components/sections/Resume'
import { Contact } from '@/components/sections/Contact'

export default function App() {
  return (
    <>
      {/* Skip to main content link for keyboard / screen-reader accessibility */}
      <a href="#content" className="skip-link">
        Skip to main content
      </a>

      {/* Reading scroll progress indicator */}
      <ScrollProgress />

      {/* Sticky navigation header */}
      <Header />

      {/* Main content landmark */}
      <main id="content" data-inert-root className="min-h-screen">
        <NewsprintMasthead />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Coursework />
        <Achievements />
        <GitHub />
        <Resume />
        <Contact />
      </main>

      {/* Page footer */}
      <Footer />
    </>
  )
}
