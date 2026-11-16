import { FileText, LineChart, MessageSquare, Route } from 'lucide-react'
import Section, { Reveal } from '../components/Section'

const features = [
  { icon: FileText, title: 'Upload documents', text: 'PDF / TXT parsed, chunked and embedded with Amazon Titan into pgvector.' },
  { icon: Route, title: 'LangGraph routing', text: 'A router sends each question to the document agent or the finance agent.' },
  { icon: MessageSquare, title: 'Cited answers', text: 'Claude on Amazon Bedrock answers from retrieved chunks, with sources.' },
  { icon: LineChart, title: 'Finance agent', text: 'Read-only tools over synthetic business data; numbers computed in SQL.' },
]

export default function Playground() {
  return (
    <Section
      id="demo"
      title={
        <>
          Enterprise AI <span className="italic text-violet">Knowledge Hub</span>
        </>
      }
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-panel p-6 sm:p-10">
          <div className="relative">
            <span className="inline-block rounded-full border border-violet/40 bg-violet/10 px-3 py-1 font-mono text-xs text-violet">
              Independent portfolio project · synthetic data · live demo launching 21 Nov 2026
            </span>
            <p className="mt-5 max-w-2xl text-muted sm:text-lg">
              A working agentic RAG application I am building on my own to show the full stack in one place:
              React + TypeScript, FastAPI, LangGraph, Claude and Titan Embeddings on Amazon Bedrock, and PostgreSQL
              with pgvector.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="flex gap-4 rounded-xl border border-line bg-ink/40 p-4">
                  <f.icon size={20} className="mt-0.5 shrink-0 text-violet" />
                  <div>
                    <h3 className="font-medium text-paper">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
