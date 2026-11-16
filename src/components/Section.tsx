import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { navLinks } from '../data/profile'

type Props = {
  id: string // must match an id in navLinks
  title: ReactNode
  lede?: string // optional one-paragraph intro under the title
  children: ReactNode
}

const ease = [0.22, 1, 0.36, 1] as const

/*
  Every section shares this header:

  ───────────────────────────────────────────────  ← rule draws in from the left
  02 — PROJECTS        Selected work                ← 3 cols label · 9 cols title
                       Optional lede paragraph…
*/
export default function Section({ id, title, lede, children }: Props) {
  const index = navLinks.findIndex((l) => l.id === id)
  const number = String(index + 1).padStart(2, '0')
  const label = navLinks[index]?.label ?? id

  return (
    <section id={id} className="mx-auto max-w-6xl px-5 pt-28 sm:px-8 sm:pt-36">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.1, ease }}
        className="h-px origin-left bg-line"
      />

      <motion.header
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, delay: 0.15, ease }}
        className="grid gap-4 pt-6 md:grid-cols-12 md:gap-6"
      >
        <p className="label md:col-span-3 md:pt-3">
          <span className="text-violet">{number}</span> — {label}
        </p>
        <div className="md:col-span-9">
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.02] tracking-[-0.015em]">{title}</h2>
          {lede && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>}
        </div>
      </motion.header>

      <div className="mt-12 sm:mt-16">{children}</div>
    </section>
  )
}

// Fades children in when they scroll into view, with an optional stagger delay.
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  )
}
