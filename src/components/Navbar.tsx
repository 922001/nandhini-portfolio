import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { navLinks, profile } from '../data/profile'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  // On the homepage "#about" scrolls on the same page; on a case study the
  // link must go back home first: "/#about".
  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`)

  useEffect(() => {
    // Mark a section "active" when it crosses the middle band of the screen.
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) observer.observe(el)
    })

    // Only draw the bottom rule once the page has moved, so the hero starts clean.
    // Back above the first section (in the hero): no nav item is active.
    const first = document.getElementById(navLinks[0].id)
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      if (!first || first.getBoundingClientRect().top > window.innerHeight * 0.5) setActive('')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [pathname]) // re-run when the page changes, so it watches the new page's sections

  // Lock page scroll while the mobile menu covers the screen.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-ink transition-[border-color] duration-300 ${
        scrolled || open ? 'border-b border-line' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="font-display text-xl leading-none" onClick={() => setOpen(false)}>
          N<span className="text-violet">.</span>S
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <Link
                to={sectionHref(l.id)}
                className={`relative block py-1 text-sm transition-colors ${
                  active === l.id ? 'text-paper' : 'text-muted hover:text-paper'
                }`}
              >
                {l.label}
                {/* One underline element that slides between links (shared layoutId). */}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-px h-px bg-violet"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:text-violet"
            >
              Resume ↗
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="label py-2 text-paper md:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {/* Mobile: a full-screen index with large numbered serif links */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-14 bottom-0 bg-ink px-5 md:hidden"
          >
            <ol className="mt-4">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                >
                  <Link
                    to={sectionHref(l.id)}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-4"
                  >
                    <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-3xl">{l.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ol>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="label mt-8 inline-block text-violet">
              Download resume ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
