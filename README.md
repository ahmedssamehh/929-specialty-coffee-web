# 929 Specialty Coffee — Digital Flagship

Premium brand-experience website for **929 Specialty Coffee**, built from `929_MASTER_PROMPT.md`.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger (scroll-driven espresso hero)
- Lenis smooth scrolling
- React Hook Form + Zod (subscription & contact forms)
- Lucide icons

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Highlights

- **Hero** — pinned, scrubbed GSAP timeline: espresso drops → stream → the cup fills (liquid lives between the back and front cup walls via SVG clipPath; the stream endpoint always terminates on the liquid surface) → crema → ripples → steam → machine stops.
- **Pages** — Home, Menu (filterable catalog), Origins (interactive encyclopedia + map), Locations (interactive map + branch cards), About (timeline), Experiences, Journal, Contact.
- **Motion** — opacity / translateY / blur-reduction reveals, stagger, gentle hover lift, 3% image zoom. No bounce. `prefers-reduced-motion` respected everywhere.
