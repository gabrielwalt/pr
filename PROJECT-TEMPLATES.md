## Template Inventory

Discovered during the Figma frame inventory pass (2026-07-08). Node IDs in `PROJECT-IMPORT.md`.

### Shared "Page Template" (one reusable listing/content template)
Calendar, Projects, Project Detail, Search, and About are each a single frame wrapping one **`Page Template`** component instance. This is the dominant template — a header + content-region layout reused across five screens. Build it once as an EDS page template / section pattern and reuse.

- Calendar → `Page Template` `1:13732`
- Projects → `Page Template` `1:13697`
- Project Detail → `Page Template` `14:11052` (very tall, 13508px — long-form entry)
- Search → `Page Template` `1:13993`
- About → `Page Template` `1:13592`

### Distinct "Entry Template" (one-off)
- Slideshow → **`Entry Template`** `1:14716` (very tall, 17831px — full-screen entry/slideshow viewer). Separate template from Page Template.

### Standalone screens
- **Home** `1:13091` — bespoke composition: full-bleed hero → index card grid → "Issue" banner → data table. Not built on Page Template.
- **Overlay** `1:12954` — nav/menu overlay state layered over the Home cover; belongs to the header/menu component, not a routable page.

### Reusable component set (not pages)
- **Entry Cover Templates** section `1:13733` — 8 card-cover variants in 3 families (Two Column, Full Width Image, Full Bleed Image), with White / Black / User-Selected-Color background options. These are the "Entry Cover Templates" card variants reused across listing pages. Map to an EDS `cards`/`hero`-style block with variants.

### Implication for EDS build
- One primary page template (from `Page Template`) covering ~5 screens.
- One secondary template (`Entry Template`) for Slideshow.
- Home + Overlay bespoke.
- Card-cover block with a variant matrix drawn from Entry Cover Templates.

### Implemented EDS page templates (`template: <name>` metadata → `body.<name>`)
Authored via a `metadata` block at the end of the page; EDS `decorateTemplateAndTheme` maps it to a body class, and template CSS lives in `styles/styles.css`.
- **`homepage`** (`body.homepage`) — Home's bespoke scroll choreography (sticky hero, relocated nav, dark-band reveal). Fallback: `scripts.js` adds it when `main .hero-cover` is present.
- **`about`** (`body.about`) — 2026-07-09. Composes the About screen's editorial content as **3 columns** (Figma `1:13576`): `body.about main .contributors ul { columns: 3 }` and `body.about main .projects.grid > ul { grid-template-columns: repeat(3, …) }`. The column count is owned by the template, not the blocks (contributors defaults to 3 on its own, projects.grid defaults to 4). About's `projects` block carries the `grid` variant (wrapping, not the scroller).
