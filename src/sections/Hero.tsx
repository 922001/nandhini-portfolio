import { motion } from 'framer-motion'
import { profile, projects, stats } from '../data/profile'
import TextLink from '../components/TextLink'

// One easing curve for the whole hero: fast start, long soft landing.
const ease = [0.22, 1, 0.36, 1] as const

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
})

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pt-24 sm:px-8 sm:pt-32">
      {/* Row 1 — the masthead: who, what, where, status */}
      <motion.div
        {...rise(0)}
        className="grid grid-cols-2 gap-y-3 border-b border-line pb-4 md:grid-cols-12"
      >
        <p className="col-span-2 font-display text-2xl md:col-span-3">{profile.name}</p>
        <p className="label self-end md:col-span-3">{profile.title}</p>
        <p className="label self-end md:col-span-3">{profile.location}</p>
        <p className="label flex items-center gap-2 self-end md:col-span-3 md:justify-end">
          <span className="h-1.5 w-1.5 rounded-full bg-violet" />
          Available now
        </p>
      </motion.div>

      {/* Row 2 — the headline carries the whole hero; no illustration */}
      <motion.h1
        {...rise(0.12)}
        className="mt-10 font-display text-[clamp(2.6rem,7.2vw,6.4rem)] leading-[0.98] tracking-[-0.02em] sm:mt-14"
      >
        {profile.headline.lead}{' '}
        <em className="text-violet">{profile.headline.accent}</em>
      </motion.h1>

      {/* Row 3 — margin note · intro + links · case-study index */}
      <div className="mt-14 grid gap-10 border-t border-line pt-8 md:grid-cols-12 md:gap-6 sm:mt-20">
        <motion.div {...rise(0.3)} className="md:col-span-3">
          <p className="label">Currently</p>
          <p className="mt-2 text-sm text-muted">{profile.availability}</p>
        </motion.div>

        <motion.div {...rise(0.38)} className="md:col-span-5">
          <p className="text-lg leading-relaxed text-paper/85">{profile.intro}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <TextLink href={profile.resume}>Resume</TextLink>
            <TextLink href={profile.linkedin}>LinkedIn</TextLink>
            {profile.github && <TextLink href={profile.github}>GitHub</TextLink>}
            <TextLink href={`mailto:${profile.email}`}>Email</TextLink>
          </div>
        </motion.div>

        <motion.nav {...rise(0.46)} aria-label="Case studies" className="md:col-span-4">
          <p className="label">Index — case studies</p>
          <ol className="mt-2">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <a
                  href={`#${p.slug}`}
                  className="group flex items-baseline gap-4 border-b border-line py-3 transition-colors hover:border-violet/60"
                >
                  <span className="font-mono text-xs text-muted transition-colors group-hover:text-violet">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 text-paper/90">{p.name}</span>
                  <span className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-violet">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </motion.nav>
      </div>

      {/* Row 4 — verified numbers only. The 1px gap over a line-coloured
          background draws the hairlines between cells on any column count. */}
      <motion.dl
        {...rise(0.56)}
        className="mt-16 grid grid-cols-2 gap-px border-y border-line bg-line md:grid-cols-4"
      >
        {stats.map((s) => (
          <div key={s.label} className="bg-ink px-4 py-6 sm:px-6">

            <dt className="font-display text-4xl sm:text-5xl">{s.value}</dt>
            <dd className="mt-2 max-w-[16rem] text-sm leading-snug text-muted">{s.label}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  )
}
