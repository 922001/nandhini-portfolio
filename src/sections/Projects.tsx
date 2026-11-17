import { Link } from 'react-router'
import Section, { Reveal } from '../components/Section'
import { caseStudies } from '../data/caseStudies'

/*
  One ruled row per project. Live case studies are links; an in-progress
  project is shown quieter and is not clickable yet.

  ─────────────────────────────────────────────────────────
  01  PRODUCTION          Enterprise Multi-Agent RAG Assistant  →
      Construction ·…     tagline…
                          PYTHON · LANGGRAPH · …
*/
export default function Projects() {
  return (
    <Section
      id="projects"
      title="Selected work"
      lede="Two production systems from my client work, each with its architecture, the decisions behind it and exactly which parts I built. A third, independent project is in progress."
    >
      <ol className="border-b border-line">
        {caseStudies.map((c, i) => {
          const live = c.status === 'live'

          const row = (
            <div className="grid gap-3 py-8 md:grid-cols-12 md:gap-6">
              <div className="md:col-span-3">
                <p className="font-mono text-[13px] text-muted">{String(i + 1).padStart(2, '0')}</p>
                <p className={`label mt-2 ${live ? 'text-violet' : ''}`}>
                  {c.kind === 'production' ? 'Production' : 'Independent'}
                  {!live && ' · in progress'}
                </p>
                <p className="label mt-1">{c.industry}</p>
              </div>

              <div className="md:col-span-9">
                <h3
                  className={`flex items-baseline justify-between gap-4 font-display text-3xl leading-tight sm:text-4xl ${
                    live ? 'transition-colors group-hover:text-violet' : 'text-paper/60'
                  }`}
                >
                  {c.title}
                  {live && (
                    <span className="shrink-0 text-2xl text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-violet">
                      →
                    </span>
                  )}
                </h3>
                <p className={`mt-3 max-w-2xl ${live ? 'text-muted' : 'text-muted/70'}`}>{c.tagline}</p>
                <p className="mt-4 font-mono text-[12px] tracking-wide text-paper/60">{c.stack.join(' · ')}</p>
                {live && <p className="label mt-5 text-paper">Read the case study</p>}
              </div>
            </div>
          )

          return (
            <Reveal key={c.slug} delay={i * 0.06}>
              <li id={c.slug} className="border-t border-line">
                {live ? (
                  <Link to={`/work/${c.slug}`} className="group block">
                    {row}
                  </Link>
                ) : (
                  row
                )}
              </li>
            </Reveal>
          )
        })}
      </ol>
    </Section>
  )
}
