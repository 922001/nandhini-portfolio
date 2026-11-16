import Section, { Reveal } from '../components/Section'
import { about } from '../data/profile'

// The path from full-stack to AI, shown as a numbered list in the left margin.
const journey = ['Full-stack apps', 'RAG chatbot', 'Document AI', 'Multi-agent systems']

/*
  Layout (md and up):
  ┌ 3 cols ──────────┬ 9 cols ─────────────────────────────┐
  │ Path             │ Paragraph 1 (paper, larger)          │
  │ 01 Full-stack…   │ Paragraph 2, 3 (muted)               │
  │ 02 RAG chatbot   │ ─ Focus rows ─────────────────────── │
  └──────────────────┴──────────────────────────────────────┘
*/
export default function About() {
  return (
    <Section
      id="about"
      title={
        <>
          From full-stack developer to <em className="text-violet">AI engineer</em>
        </>
      }
    >
      <div className="grid gap-12 md:grid-cols-12 md:gap-6">
        {/* Margin: the journey */}
        <Reveal className="md:col-span-3">
          <p className="label">Path</p>
          <ol className="mt-4 space-y-2 font-mono text-[13px]">
            {journey.map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="text-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className={i === journey.length - 1 ? 'text-violet' : 'text-paper'}>{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="md:col-span-9">
          {/* Prose: first paragraph reads as the lead, the rest are quieter */}
          <div className="max-w-2xl space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? 'text-lg text-paper sm:text-xl' : 'text-muted'}>{p}</p>
              </Reveal>
            ))}
          </div>

          {/* Focus areas as ruled rows */}
          <Reveal delay={0.1} className="mt-14">
            <p className="label">What I focus on</p>
            <ul className="mt-4 border-b border-line">
              {about.focus.map((f, i) => (
                <li key={f} className="flex gap-6 border-t border-line py-4">
                  <span className="font-mono text-[13px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-paper">{f}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              <span className="label mr-3">Education</span>
              {about.education}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
