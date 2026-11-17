import { useEffect } from 'react'
import { useLocation } from 'react-router'
import About from '../sections/About'
import Contact from '../sections/Contact'
import Experience from '../sections/Experience'
import Hero from '../sections/Hero'
import Playground from '../sections/Playground'
import Projects from '../sections/Projects'
import Skills from '../sections/Skills'

// The one-page homepage. Keep this order in sync with navLinks in profile.ts
// (that list sets the section numbers).
export default function HomePage() {
  const { hash } = useLocation()

  // Coming back from a case study with a link like "/#experience":
  // wait one frame for the sections to exist, then scroll to that section.
  useEffect(() => {
    if (!hash) return
    requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView())
  }, [hash])

  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Playground />
      <Contact />
    </main>
  )
}
