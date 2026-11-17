import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import Navbar from './components/Navbar'
import { profile } from './data/profile'
import CaseStudyPage from './pages/CaseStudyPage'
import HomePage from './pages/HomePage'

// App decides WHICH page to show from the URL; each page decides what is on it.
//   /             → HomePage (all the sections)
//   /work/<slug>  → CaseStudyPage for that project
//   anything else → HomePage
export default function App() {
  const { pathname, hash } = useLocation()

  // A new page should start at the top (unless the link points at a #section).
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' }) // instant: skip the smooth-scroll animation
  }, [pathname, hash])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/:slug" element={<CaseStudyPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <footer className="mx-auto mt-24 flex max-w-6xl flex-wrap justify-between gap-2 border-t border-line px-5 py-8 sm:px-8">
        <p className="label">© {new Date().getFullYear()} {profile.name}</p>
        <p className="label">React · TypeScript · Tailwind CSS · Framer Motion</p>
      </footer>
    </>
  )
}
