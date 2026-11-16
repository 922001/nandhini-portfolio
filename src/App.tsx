import Navbar from './components/Navbar'
import About from './sections/About'
import Contact from './sections/Contact'
import Experience from './sections/Experience'
import Hero from './sections/Hero'
import Playground from './sections/Playground'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import { profile } from './data/profile'

// Keep this order in sync with navLinks in profile.ts (that list sets the section numbers).
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Playground />
        <Contact />
      </main>
      <footer className="mx-auto mt-24 flex max-w-6xl flex-wrap justify-between gap-2 border-t border-line px-5 py-8 sm:px-8">
        <p className="label">© {new Date().getFullYear()} {profile.name}</p>
        <p className="label">React · TypeScript · Tailwind CSS · Framer Motion</p>
      </footer>
    </>
  )
}
