# AlexWeb — Build Sequence
# Execute these tickets IN ORDER

---

## TICKET: AW-001
KERNEL: 95/100
STATUS: PENDING

OBJECTIVE: Initialize Next.js project with TypeScript, Tailwind, and base configuration.

SCOPE:
- Run `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"` (use current directory)
- Configure tailwind.config.ts with custom colors from design system
- Set up globals.css with CSS variables, custom scrollbar, font imports
- Configure layout.tsx with metadata, fonts (JetBrains Mono + Space Grotesk via next/font/google)
- Clean up default Next.js boilerplate (remove default page content, styles)

AFFECTED FILES:
- package.json, tailwind.config.ts, tsconfig.json, next.config.mjs
- src/app/layout.tsx, src/app/page.tsx, src/app/globals.css

CONSTRAINTS:
- Do NOT install Three.js, GSAP, or any animation library yet
- DO install framer-motion
- Use next/font/google for fonts (NOT external CDN link)
- TypeScript strict mode

ACCEPTANCE:
- [ ] `npm run build` passes
- [ ] `npm run dev` shows blank dark page (#050505 background)
- [ ] Custom fonts loaded
- [ ] Tailwind working with custom colors
- [ ] Custom scrollbar visible

DELEGATION: Builder → Tester

---

## TICKET: AW-002
KERNEL: 92/100
STATUS: PENDING

OBJECTIVE: Build the FlowField canvas component (generative art hero background).

CONTEXT: This is the signature visual element. See .aicode/skills/flow-field.md for algorithm details.

SCOPE:
- Create src/app/components/FlowField.tsx
- Implement simplex-like 2D noise (no external deps)
- Particle system with mouse/touch reactivity
- Alpha trail effect
- Responsive particle count (desktop vs mobile)

AFFECTED FILES:
- src/app/components/FlowField.tsx (CREATE)

CONSTRAINTS:
- NO external noise libraries — implement inline
- Canvas API only — no WebGL, no Three.js
- Must handle window resize
- Must clean up animation frame on unmount
- Keep under 150 lines if possible (stretch OK for this component)

ACCEPTANCE:
- [ ] Canvas fills parent container
- [ ] Particles flow with noise pattern
- [ ] Mouse movement influences particles
- [ ] Touch works on mobile
- [ ] Window resize recalculates
- [ ] No memory leaks (cleanup on unmount)
- [ ] Smooth 60fps on desktop

DELEGATION: Architect (validate approach) → Builder → Tester

---

## TICKET: AW-003
KERNEL: 90/100
STATUS: PENDING

OBJECTIVE: Build the Hero section with FlowField background.

SCOPE:
- Integrate FlowField as background in hero section
- Add centered content: label, name, tagline, CTAs
- Add scroll indicator animation
- Full viewport height (100vh)

AFFECTED FILES:
- src/app/components/Hero.tsx (CREATE)
- src/app/page.tsx (MODIFY — add Hero)

CONSTRAINTS:
- Content must be z-indexed above canvas
- Use Tailwind for layout, CSS variables for colors
- Scroll indicator: pure CSS animation (pulse)

ACCEPTANCE:
- [ ] Hero fills viewport
- [ ] Canvas visible behind text
- [ ] Text readable over particles
- [ ] CTAs have hover states
- [ ] Scroll indicator pulses
- [ ] Responsive on mobile (375px)

DELEGATION: Builder → Tester

---

## TICKET: AW-004
KERNEL: 88/100
STATUS: PENDING

OBJECTIVE: Build ScrollReveal wrapper and ServiceCard components, render Services section.

SCOPE:
- Create ScrollReveal.tsx (Framer Motion — fade up on scroll into view)
- Create ServiceCard.tsx (sharp edges, hover accent border)
- Create Services section with 3 cards
- Content hardcoded from CLAUDE.md spec

AFFECTED FILES:
- src/app/components/ScrollReveal.tsx (CREATE)
- src/app/components/ServiceCard.tsx (CREATE)
- src/app/components/Services.tsx (CREATE)
- src/app/page.tsx (MODIFY — add Services)

CONSTRAINTS:
- Framer Motion: useInView + motion.div only
- No icon library — use text characters (◉ ⬡ △)
- Responsive: 1 column mobile, 3 column desktop

ACCEPTANCE:
- [ ] 3 cards render correctly
- [ ] Hover reveals accent border
- [ ] Scroll reveal animates on first view
- [ ] Responsive layout works

DELEGATION: Builder → Tester

---

## TICKET: AW-005
KERNEL: 88/100
STATUS: PENDING

OBJECTIVE: Build Portfolio section with expandable project rows.

SCOPE:
- Create ProjectRow.tsx (hover expand with description)
- Create Portfolio section with 5 projects
- Status badges with per-project colors
- Content hardcoded from CLAUDE.md spec

AFFECTED FILES:
- src/app/components/ProjectRow.tsx (CREATE)
- src/app/components/Portfolio.tsx (CREATE)
- src/app/page.tsx (MODIFY — add Portfolio)

CONSTRAINTS:
- List layout (NOT grid)
- Framer Motion for expand animation (AnimatePresence)
- Mobile: tap to expand (not hover)
- Status badge: small pill with project color at low opacity

ACCEPTANCE:
- [ ] 5 projects listed
- [ ] Hover/tap expands description
- [ ] Project name turns accent on hover
- [ ] Status badges colored correctly
- [ ] Responsive on mobile

DELEGATION: Builder → Tester

---

## TICKET: AW-006
KERNEL: 90/100
STATUS: PENDING

OBJECTIVE: Build Terminal animation component and Methodology section.

CONTEXT: See .aicode/skills/terminal-animation.md for behavior spec.

SCOPE:
- Create Terminal.tsx (animated typing + loop)
- Create Methodology section with terminal + description
- Content hardcoded from CLAUDE.md spec

AFFECTED FILES:
- src/app/components/Terminal.tsx (CREATE)
- src/app/components/Methodology.tsx (CREATE)
- src/app/page.tsx (MODIFY — add Methodology)

CONSTRAINTS:
- No external typing libraries — pure React state
- Must loop: type all → pause 3s → clear → restart
- Cleanup intervals/timeouts on unmount

ACCEPTANCE:
- [ ] Lines appear one by one (600ms)
- [ ] Color coding works ($ = accent, ✓ = green, rest = muted)
- [ ] Cursor blinks
- [ ] Loop restarts after completion
- [ ] No memory leaks

DELEGATION: Builder → Tester

---

## TICKET: AW-007
KERNEL: 85/100
STATUS: PENDING

OBJECTIVE: Build Contact section and Footer.

SCOPE:
- Create Contact section (heading + 3 link buttons)
- Create Footer (copyright line)
- Link targets: LinkedIn, WhatsApp, Email

AFFECTED FILES:
- src/app/components/Contact.tsx (CREATE)
- src/app/components/Footer.tsx (CREATE)
- src/app/page.tsx (MODIFY — add Contact + Footer)

CONSTRAINTS:
- External links: target="_blank" rel="noopener noreferrer"
- Hover: border + text turn accent
- Footer: thin top border

ACCEPTANCE:
- [ ] 3 links render and point to correct URLs
- [ ] Hover effects work
- [ ] Footer renders
- [ ] Smooth scroll from hero CTAs to sections (#portfolio, #contact)

DELEGATION: Builder → Tester

---

## TICKET: AW-008
KERNEL: 92/100
STATUS: PENDING

OBJECTIVE: Final integration, polish, and deploy preparation.

SCOPE:
- Verify all sections render in correct order on page.tsx
- Add smooth scroll behavior (CSS scroll-behavior: smooth)
- SEO: metadata in layout.tsx (title, description, OG tags)
- Verify responsive on 375px, 768px, 1024px, 1440px
- Run final build check
- Verify Lighthouse > 90 mobile

AFFECTED FILES:
- src/app/page.tsx (FINAL REVIEW)
- src/app/layout.tsx (MODIFY — metadata)
- All component files (REVIEW)

CONSTRAINTS:
- Do NOT add new features
- Fix only — no scope expansion
- If Lighthouse < 90, optimize (lazy load, reduce particles, etc.)

ACCEPTANCE:
- [ ] `npm run build` — 0 errors
- [ ] All sections visible and functional
- [ ] Smooth scroll works between sections
- [ ] SEO metadata present
- [ ] Responsive verified at 4 breakpoints
- [ ] Ready for `vercel deploy`

DELEGATION: Tester (full sweep) → Builder (fixes if needed)
