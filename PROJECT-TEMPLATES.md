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
- **`template-about`** (`body.template-about`) — 2026-07-09 (renamed from bare `about` 2026-07-09). Composes the About screen's editorial content as **3 columns** (Figma `1:13576`): `body.template-about main .contributors ul { columns: 3 }` and `body.template-about main .projects.grid > ul { grid-template-columns: repeat(3, …) }`. The column count is owned by the template, not the blocks (contributors defaults to 3 on its own, projects.grid defaults to 4). About's `projects` block carries the `grid` variant (wrapping, not the scroller).
- **`template-calendar`** (`body.template-calendar`) — 2026-07-09. The Calendar screen (Figma `1:13698`, wraps `Page Template` `1:13732`): a full-page `event-list`. Template class added so calendar-specific page rules have a scoping hook; no bespoke overrides yet (the `event-list` block owns its own styling).
- **`template-projects`** (`body.template-projects`) — 2026-07-09. The Projects listing (Figma `1:13593`, wraps `Page Template` `1:13697`): repeated `project-header` + `projects` scroller pairs. Template override: **zeroes top/bottom padding on `.project-header-wrapper` + `.projects-wrapper`** (keeps 40px left/right) so the header/scroller pairs sit tighter. Scoped to this body class (NOT the shared `main > .section > div` rule) so frozen Home/About — which also use `projects` — keep their 40px vertical insets.
- **`template-project-detail`** (`body.template-project-detail`) — 2026-07-09 (reworked). The Project Detail long-form entry (Figma `14:10689`, wraps `Page Template` `14:11052`): `project-header` + 3-image overview + `event-list` + TOC (`project-table` base variant, no search) + long-form entries + `projects-search`. Same wrapper top/bottom-padding zeroing as `template-projects`. **Owns the DEFAULT-CONTENT styling** (page blocks styled by their own CSS): (1) **overview** — first section's leading `p` of images → **horizontal scroller** (480px-tall images, bleeds to both column edges, `overflow-x:auto`, hidden scrollbar); the following `p` → 20px lead, full width, left-aligned. (2) **entry titles** — two `h2` lines, both 42px black; `h2` defaults REGULAR, `h2 strong` bold (bold-via-markup, per Prada) — so the first (author-`<strong>`-wrapped) line is bold and the byline line reads regular. (3) **cover image(s)** via `p:has(img)` → flex, full width; `p.image-pair` removes the gutter (the Wind interview pair). (4) **body** `p:not(:has(img))` → 20px left-aligned. (5) **View all events** CTA (default content in `.event-list-container`) → centered bordered button. Long-form entries additionally carry section styles `Narrow` (700px centered reading column) + `Expandable` (fade-clip + JS Read-more). All scoped to the template body class → additive.

*Naming note:* all templates except `homepage` use the documented `template-<page-type>` convention (user decision 2026-07-09; `about` renamed to `template-about` 2026-07-09). Only `homepage` remains a grandfathered bare name. All five content pages carry a template.
