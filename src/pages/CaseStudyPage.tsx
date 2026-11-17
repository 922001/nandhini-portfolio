import { motion } from 'framer-motion'
import { Link, Navigate, useParams } from 'react-router'
import type { ReactNode } from 'react'
import ArchitectureDiagram from '../components/ArchitectureDiagram'
import { Reveal } from '../components/Section'
import { findCaseStudy, liveCaseStudies } from '../data/caseStudies'

const ease = [0.22, 1, 0.36, 1] as const

// One layout for every case study. The URL /work/<slug> decides which
// study is shown, so adding a project never needs a new page file.
export default function CaseStudyPage() {
  const { slug } = useParams() // reads <slug> out of the URL
  const study = findCaseStudy(slug)

  // Unknown slug, or a project that has no page yet: go back home.
  if (!study || study.status !== 'live') return <Navigate to="/" replace />

  // The next live case study (wraps around to the first one at the end).
  const index = liveCaseStudies.findIndex((c) => c.slug === study.slug)
  const next = liveCaseStudies.length > 1 ? liveCaseStudies[(index + 1) % liveCaseStudies.length] : undefined

  return (
    <main className="mx-auto max-w-6xl px-5 pt-24 sm:px-8 sm:pt-32">
      <Link to="/#projects" className="label transition-colors hover:text-violet">
        ← All projects
      </Link>

      {/* Header: label in the margin, title in the main column (same grid as the homepage) */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="mt-10 grid gap-4 border-t border-line pt-6 md:grid-cols-12 md:gap-6"
      >
        <div className="md:col-span-3 md:pt-3">
          <p className="label">Case study · {study.kind === 'production' ? 'Production' : 'Independent'}</p>
          <p className="label mt-2">{study.industry}</p>
          {study.employer && <p className="label mt-2">Built at {study.employer}</p>}
        </div>
        <div className="md:col-span-9">
          <h1 className="font-display text-[clamp(2.4rem,6vw,4.75rem)] leading-[1] tracking-[-0.015em]">
            {study.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-paper/85">{study.tagline}</p>
        </div>
      </motion.header>

      {/* The problem */}
      <section className="mt-16 grid gap-4 border-t border-line pt-6 md:grid-cols-12 md:gap-6">
        <p className="label md:col-span-3">The problem</p>
        <p className="max-w-2xl text-paper md:col-span-9">{study.problem}</p>
      </section>

      {/* The centrepiece: the interactive architecture */}
      {study.diagram && (
        <section className="mt-16 border-t border-line pt-6">
          <div className="grid gap-4 md:grid-cols-12 md:gap-6">
            <p className="label md:col-span-3">Architecture</p>
            <p className="max-w-2xl text-muted md:col-span-9">
              How a request moves through the system. Turn on “Show my work” to see which parts I built.
            </p>
          </div>
          {/* Full width, so the labels inside the diagram stay readable */}
          <div className="mt-8">
            <ArchitectureDiagram diagram={study.diagram} />
          </div>
        </section>
      )}

      {/* Decisions: one ruled row each, with the reason and the trade-off side by side */}
      {study.decisions && (
        <Block label="Key decisions">
          <ol className="border-b border-line">
            {study.decisions.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.04}>
                <li className="border-t border-line py-7">
                  <h3 className="flex gap-4 font-display text-2xl leading-snug sm:text-[1.7rem]">
                    <span className="pt-1.5 font-mono text-[13px] text-violet">{String(i + 1).padStart(2, '0')}</span>
                    {d.title}
                  </h3>
                  <div className="mt-4 grid gap-5 pl-9 sm:grid-cols-2 sm:gap-8">
                    <div>
                      <p className="label">Why</p>
                      <p className="mt-2 text-[15px] text-paper/85">{d.why}</p>
                    </div>
                    <div>
                      <p className="label">Trade-off</p>
                      <p className="mt-2 text-[15px] text-muted">{d.tradeoff}</p>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Block>
      )}

      {/* Challenges: real problems from the project and how they were solved */}
      {study.challenges && (
        <Block label="Challenges">
          <div className="space-y-10">
            {study.challenges.map((c) => (
              <Reveal key={c.title}>
                <h3 className="font-display text-2xl leading-snug sm:text-[1.7rem]">{c.title}</h3>
                <p className="mt-3 max-w-2xl text-muted">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </Block>
      )}

      {/* My work vs other teams' work, side by side */}
      {study.contributions && (
        <Block label="My contribution">
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
            <Reveal>
              <p className="label text-violet">Built by me</p>
              <ul className="mt-3 border-b border-line">
                {study.contributions.mine.map((m) => (
                  <li key={m} className="border-t border-line py-3 text-[15px] text-paper">{m}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="label">Owned by others</p>
              <ul className="mt-3 border-b border-line">
                {study.contributions.others.map((o) => (
                  <li key={o} className="border-t border-dashed border-line py-3 text-[15px] text-muted">{o}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Block>
      )}

      {/* Results: confirmed outcomes only */}
      {study.results && (
        <Block label="Results">
          <ul className="space-y-3">
            {study.results.map((r) => (
              <li key={r} className="flex gap-4 text-lg text-paper">
                <span className="select-none text-violet">—</span>
                {r}
              </li>
            ))}
          </ul>
        </Block>
      )}

      <Block label="Stack">
        <p className="font-mono text-[13px] text-paper/80">{study.stack.join(' · ')}</p>
      </Block>

      {/* Next case study, so a reader can keep going */}
      {next && (
        <Link
          to={`/work/${next.slug}`}
          className="group mt-24 block border-y border-line py-10 transition-colors hover:border-violet/60"
        >
          <p className="label">Next case study</p>
          <p className="mt-3 flex items-baseline justify-between gap-4 font-display text-3xl transition-colors group-hover:text-violet sm:text-5xl">
            {next.title}
            <span className="text-2xl text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-violet">
              →
            </span>
          </p>
        </Link>
      )}
    </main>
  )
}

// One section of a case study: label in the 3-column margin, content in the 9-column body.
function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="mt-16 grid gap-6 border-t border-line pt-6 md:grid-cols-12 md:gap-6">
      <p className="label md:col-span-3">{label}</p>
      <div className="md:col-span-9">{children}</div>
    </section>
  )
}
