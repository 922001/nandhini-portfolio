# Nandhini S — portfolio

Personal portfolio site for an AI engineer: case studies, experience, skills and a live
agentic AI demo.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Where things live

| Path | What |
|---|---|
| `src/data/profile.ts` | All site text: profile, experience, projects, skills, nav order |
| `src/components/Section.tsx` | Shared numbered section header and the `Reveal` animation |
| `src/sections/` | One file per page section |
| `src/index.css` | Colour, font tokens and base styles |

Section numbers and nav links are generated from `navLinks` in `profile.ts`.

## Note

Professional experience describes client work with client names withheld. The live
"Enterprise AI Knowledge Hub" demo is an independent project built on synthetic data.
