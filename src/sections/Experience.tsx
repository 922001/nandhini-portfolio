import Section, { Reveal } from '../components/Section'
import { experience } from '../data/profile'

/*
  A ledger: one block per company, one ruled row per project.

  ──────────────────────────────────────────────────────────
  Feb 2026 – Aug 2026   AI Engineer, zeb
  Chennai
  ──────────────────────────────────────────────────────────
  FOR A CONSTRUCTION…   Multi-Agent AI Assistant
                        — point
                        LangGraph · MCP · Neo4j
*/
export default function Experience() {
  return (
    <Section id="experience" title="Where I have worked">
      <div className="space-y-20">
        {experience.map((role) => (
          <div key={role.company}>
            {/* Company header row: a brighter rule marks the start of a company */}
            <Reveal className="grid gap-2 border-t border-paper/40 pt-5 md:grid-cols-12 md:gap-6">
              <div className="md:col-span-3">
                <p className="font-mono text-[13px] text-paper">{role.period}</p>
                <p className="font-mono text-[13px] text-muted">{role.place}</p>
              </div>
              <h3 className="font-display text-3xl leading-tight sm:text-4xl md:col-span-9">
                {role.title}, <em className="text-violet">{role.company}</em>
              </h3>
            </Reveal>

            {/* Project rows */}
            <div className="mt-8">
              {role.projects.map((p, i) => (
                <Reveal
                  key={p.name}
                  delay={i * 0.05}
                  className="grid gap-3 border-t border-line py-7 md:grid-cols-12 md:gap-6"
                >
                  <p className="label md:col-span-3 md:pt-1">for {p.client}</p>
                  <div className="md:col-span-9">
                    <h4 className="text-lg font-medium text-paper">{p.name}</h4>
                    <ul className="mt-3 max-w-3xl space-y-2 text-[15px] text-muted">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex gap-3">
                          <span className="select-none text-line">—</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 font-mono text-[12px] tracking-wide text-paper/70">{p.stack.join(' · ')}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
