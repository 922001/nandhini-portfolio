import Section, { Reveal } from '../components/Section'
import TextLink from '../components/TextLink'
import { profile } from '../data/profile'

export default function Contact() {
  return (
    <Section id="contact" title="Let's talk">
      <div className="grid gap-8 md:grid-cols-12 md:gap-6">
        <Reveal className="md:col-span-3">
          <p className="label">Email is fastest</p>
        </Reveal>

        <div className="md:col-span-9">
          <Reveal>
            <p className="max-w-xl text-muted">
              I'm looking for AI Engineer, GenAI and full-stack AI roles in Chennai or remote, and I can join
              immediately.
            </p>
          </Reveal>

          {/* The email is the call to action: large serif, underline turns violet on hover */}
          <Reveal delay={0.1}>
            <a
              href={`mailto:${profile.email}`}
              className="mt-8 inline-block break-all font-display text-[clamp(1.6rem,4.6vw,3.4rem)] leading-tight underline decoration-line decoration-1 underline-offset-[10px] transition-colors hover:text-violet hover:decoration-violet"
            >
              {profile.email}
            </a>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-paper">
              <TextLink href={profile.linkedin}>LinkedIn</TextLink>
              {profile.github && <TextLink href={profile.github}>GitHub</TextLink>}
              <TextLink href={profile.resume}>Resume</TextLink>
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
