import { ArrowUpRight } from 'lucide-react'
import Section, { Reveal } from '../components/Section'
import { projects } from '../data/profile'


export default function Projects() {
  return (
    <Section
      id="projects"
      title="Selected work"
      lede="Four production systems, each with its architecture, the decisions behind it and exactly which parts I built."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <article
              id={p.slug}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel/60 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="h-px w-full bg-violet" />
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-xs text-muted">
                  {p.client}
                </p>
                <h3 className="mt-2 flex items-start justify-between gap-3 font-display text-xl font-semibold text-paper">
                  {p.name}
                  <ArrowUpRight
                    size={20}
                    className="shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet"
                  />
                </h3>
                <p className="mt-2 text-sm text-paper/80">{p.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  <span className="text-muted">Problem: </span>
                  {p.problem}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-paper/80">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted">Full case studies with architecture diagrams are coming next.</p>
    </Section>
  )
}
