import Section, { Reveal } from '../components/Section'
import { skills } from '../data/profile'

/*
  A table: area · skills · where I used it.
  On phones each row stacks: area → skills → where used.
*/
export default function Skills() {
  return (
    <Section
      id="skills"
      title="The stack I work with"
      lede="Grouped by area, with the projects where I used them most."
    >
      {/* Column headings (desktop only) */}
      <div className="hidden gap-6 pb-3 md:grid md:grid-cols-12">
        <p className="label md:col-span-3">Area</p>
        <p className="label md:col-span-5">Skills</p>
        <p className="label md:col-span-4">Where I used it</p>
      </div>

      <div className="border-b border-line">
        {skills.map((g, i) => (
          <Reveal
            key={g.group}
            delay={i * 0.04}
            className="grid gap-2 border-t border-line py-6 transition-colors hover:bg-panel md:grid-cols-12 md:gap-6"
          >
            <h3 className="font-display text-2xl leading-tight md:col-span-3">{g.group}</h3>
            <p className="text-[15px] text-paper md:col-span-5">{g.items.join(' · ')}</p>
            <p className="text-sm text-muted md:col-span-4">{g.usedIn}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
