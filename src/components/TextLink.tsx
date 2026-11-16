import type { ReactNode } from 'react'

// Underlined text link used across the site. External links and the PDF open
// in a new tab and get a small ↗ after them.
export default function TextLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith('http') || href.endsWith('.pdf')
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="underline decoration-line decoration-1 underline-offset-[6px] transition-colors hover:text-violet hover:decoration-violet"
    >
      {children}
      {external && <span className="ml-0.5 text-muted">↗</span>}
    </a>
  )
}
