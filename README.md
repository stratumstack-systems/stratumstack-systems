# Stratumstack Systems

Marketing site for a Rust engineering consultancy, built with SvelteKit +
TypeScript and Tailwind v4. Ported from the Google Stitch "Sapphire & Cobalt"
design (project `15408428012089292923`, screen `8534bf9a`).

## Commands

```bash
npm run dev        # dev server
npm run build      # prerender to ./build
npm run preview    # serve the production build
npm run check      # svelte-check (TypeScript + Svelte)
```

The site is fully prerendered by `@sveltejs/adapter-static`, so `build/` is a
folder of static files — deploy it to any static host.

## Layout

```
src/
  app.css                  design tokens (@theme) + spotlight/glide effects
  lib/
    types.ts               content model — every section's shape
    accents.ts             Accent role -> literal Tailwind classes
    actions/spotlight.ts   pointer-tracking highlight (use:spotlight)
    data/                  all copy, as typed consts
      site.ts              nav, hero, code tabs, stats, footer
      problems.ts services.ts pricing.ts
      case-studies.ts proof.ts process.ts trust.ts
    components/            one component per section, plus:
      CodeTerminal.svelte  tabbed hero snippets + copy-to-clipboard
      Counter.svelte       count-up numerals
  routes/
    +layout.ts             prerender = true
    +page.svelte           composes the ten sections
```

### Editing content

Copy lives in `src/lib/data/*.ts`, never in markup. To change a price, add a
case study or reword a service, edit the data file — the types in
`src/lib/types.ts` will tell you if a field is missing.

### Design tokens

`src/app.css` holds the palette and font stacks as Tailwind v4 `@theme`
variables. `--color-surface-card` becomes `bg-surface-card`, `--font-display`
becomes `font-display`, and so on, so the ported markup reads the same as the
original. Four families are in play: `font-display` (Space Grotesk) for
headings, `font-sans` (Inter) for body, `font-mono` (JetBrains Mono) for labels
and code, and `font-editorial` (Newsreader) for pull quotes.

### Accents

Tailwind only compiles class names it can see as literal strings, so
`text-{accent}` never works. `src/lib/accents.ts` maps each `Accent` role to
spelled-out classes; components look colours up there.

### Interaction

- **Spotlight cards** — `use:spotlight` writes `--mouse-x` / `--mouse-y`; the
  radial highlight itself is CSS, so cards degrade cleanly without a pointer.
  The action no-ops on coarse-pointer devices.
- **Counters** — `Counter.svelte` renders the settled value during SSR and only
  animates once scrolled into view. It respects `prefers-reduced-motion`.
- **Code terminal, case filter, booking slots** — plain Svelte 5 `$state`, so
  they work as ordinary reactive components rather than global DOM scripts.

### Icons

Icons are Material Symbols Outlined ligatures loaded from Google Fonts in
`src/app.html`. `<Icon name="memory" />` renders the glyph; any name from the
Material Symbols set works.

## Notes

- The wordmark is rendered as a gradient tile in
  `src/lib/components/Mark.svelte` rather than hotlinked from Stitch, whose
  asset URLs expire.
- The hero's ambient glows deliberately overflow their section; the section
  carries `overflow-hidden` so they never open a horizontal scrollbar. Do not
  move that clip to `body` — it propagates to the viewport and resizes the
  fixed header.
- The three "see more" links in the Proof section have no destinations yet.
  `proofLinks` in `src/lib/data/proof.ts` is empty, so `MoreLink` renders them
  as plain text; fill in a URL and they become real links.
- A mobile nav menu was added below `md`; the source design has no nav at all
  at that width.
