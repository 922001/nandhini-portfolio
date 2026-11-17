import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import type { Diagram, DiagramNode, Owner } from '../data/diagrams'
import { NODE_HEIGHT as H } from '../data/diagrams'

const ease = [0.22, 1, 0.36, 1] as const

const ownerText: Record<Owner, string> = {
  me: 'Built by me',
  team: 'Owned by another team',
  external: 'Source system',
}

// Draw an arrow between two boxes.
// Box below → leave from the bottom centre, bend once, enter the top centre.
// Box on the same row → straight line between the facing sides.
function edgePath(a: DiagramNode, b: DiagramNode) {
  const sameRow = Math.abs(a.y - b.y) < H
  if (sameRow) {
    const y = a.y + H / 2
    return b.x > a.x ? `M ${a.x + a.w} ${y} H ${b.x}` : `M ${a.x} ${y} H ${b.x + b.w}`
  }
  const sx = a.x + a.w / 2
  const sy = a.y + H
  const tx = b.x + b.w / 2
  const mid = (sy + b.y) / 2
  return `M ${sx} ${sy} V ${mid} H ${tx} V ${b.y}`
}

/*
  An interactive architecture diagram.
  - Click (or Tab + Enter) a box to read what it does.
  - "Show my work" fades every box another team owned, so my parts stand out.
*/
export default function ArchitectureDiagram({ diagram }: { diagram: Diagram }) {
  // useState = memory inside a component. When the value changes, React redraws.
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showMine, setShowMine] = useState(false)

  const byId = new Map(diagram.nodes.map((n) => [n.id, n]))
  const selected = selectedId ? byId.get(selectedId) : undefined
  const mineCount = diagram.nodes.filter((n) => n.owner === 'me').length

  return (
    <div>
      {/* Controls: hint on the left, the toggle on the right */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <p className="label">Click any box to see what it does</p>
        <button
          type="button"
          onClick={() => setShowMine(!showMine)}
          aria-pressed={showMine}
          className="group flex items-center gap-3"
        >
          <span className={`label transition-colors ${showMine ? 'text-paper' : 'group-hover:text-paper'}`}>
            Show my work
          </span>
          {/* The switch: a track with a knob that slides right when on */}
          <span className={`relative h-4 w-8 border transition-colors ${showMine ? 'border-violet' : 'border-line'}`}>
            <motion.span
              className={`absolute top-[3px] h-2 w-2 ${showMine ? 'bg-violet' : 'bg-muted'}`}
              animate={{ left: showMine ? 18 : 3 }}
              transition={{ duration: 0.25, ease }}
            />
          </span>
        </button>
      </div>

      {/* On phones the diagram keeps its size and scrolls sideways, so the text stays readable */}
      <p className="label mt-4 md:hidden">Scroll sideways →</p>
      <div className="mt-4 overflow-x-auto md:mt-8">
        <svg
          viewBox={`-2 -2 1004 ${diagram.height + 4}`}
          className="block w-full min-w-[720px]"
          role="group"
          aria-label="Architecture diagram"
        >
          <defs>
            <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill="var(--color-muted)" />
            </marker>
            <marker id="arrow-on" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill="var(--color-violet)" />
            </marker>
          </defs>

          {/* Arrows first, so boxes sit on top of them */}
          {diagram.edges.map((e, i) => {
            const a = byId.get(e.from)
            const b = byId.get(e.to)
            if (!a || !b) return null
            const on = selectedId === e.from || selectedId === e.to // touches the selected box
            return (
              <motion.path
                key={`${e.from}-${e.to}`}
                d={edgePath(a, b)}
                fill="none"
                stroke={on ? 'var(--color-violet)' : 'var(--color-line)'}
                strokeWidth={on ? 1.5 : 1.2}
                markerEnd={on ? 'url(#arrow-on)' : 'url(#arrow)'}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.03, ease }}
              />
            )
          })}

          {/* Boxes */}
          {diagram.nodes.map((n) => {
            const isSelected = n.id === selectedId
            const faded = showMine && n.owner !== 'me'
            const highlight = isSelected || (showMine && n.owner === 'me')
            const select = () => setSelectedId(isSelected ? null : n.id)
            return (
              <motion.g
                key={n.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`${n.label}: ${ownerText[n.owner]}`}
                onClick={select}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    select()
                  }
                }}
                className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-violet"
                animate={{ opacity: faded ? 0.22 : 1 }}
                transition={{ duration: 0.35 }}
              >
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={H}
                  fill={isSelected ? 'var(--color-panel)' : 'var(--color-ink)'}
                  stroke={highlight ? 'var(--color-violet)' : 'var(--color-line)'}
                  strokeWidth={isSelected ? 1.6 : 1.2}
                  strokeDasharray={n.owner === 'me' ? undefined : '4 3'}
                  className="transition-[stroke] duration-300 hover:stroke-paper/50"
                />
                <text
                  x={n.x + n.w / 2}
                  y={n.y + (n.sub ? 24 : 34)}
                  textAnchor="middle"
                  className="fill-paper font-sans text-[15px]"
                >
                  {n.label}
                </text>
                {n.sub && (
                  <text
                    x={n.x + n.w / 2}
                    y={n.y + 43}
                    textAnchor="middle"
                    className="fill-muted font-mono text-[11px]"
                  >
                    {n.sub}
                  </text>
                )}
              </motion.g>
            )
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
        <p className="label flex items-center gap-2">
          <span className="inline-block h-3 w-5 border border-paper/60" /> Built by me ({mineCount} of {diagram.nodes.length})
        </p>
        <p className="label flex items-center gap-2">
          <span className="inline-block h-3 w-5 border border-dashed border-paper/60" /> Another team or source system
        </p>
      </div>

      {/* The note for the selected box. aria-live makes screen readers read it out when it changes. */}
      <div className="mt-6 min-h-[8rem] border-t border-line pt-5" aria-live="polite">
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease }}
            >
              <p className={`label ${selected.owner === 'me' ? 'text-violet' : ''}`}>{ownerText[selected.owner]}</p>
              <p className="mt-2 font-display text-2xl">{selected.label}</p>
              <p className="mt-2 max-w-2xl text-muted">{selected.note}</p>
            </motion.div>
          ) : (
            <motion.p key="empty" className="text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Select a box in the diagram to see what it does and who built it.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
