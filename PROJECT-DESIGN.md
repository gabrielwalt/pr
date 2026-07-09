# Design System

The design foundation for the Prada Index site — tokens, type, color, spacing, the global page frame, the block inventory, section styles, page templates, and the Home scroll interaction. **Code is truth** for the implementation; the summaries here record *intent* and non-obvious gotchas. The live token set lives in `styles/styles.css` `:root`.

## Design Tokens

Global foundation established 2026-07-08 (Faithful fidelity); type system fully tokenized after a second measurement pass across Home hero (`1:13092`), Issue banner (`1:13138`), Page Content table (`1:13150`), and About/Page-Template (`1:13592`). Every recurring size/line-height/tracking is a token; verified in-browser (all roles match Figma px exactly).

| Token | Value | For |
|-------|-------|-----|
| `--background-color` | `#fff` | page background |
| `--text-color` | `#000` | primary ink (body + headings) |
| `--metadata-color` | `#707070` | secondary text, nav labels, metadata blocks, search-bar text |
| `--rule-color` | `#8d9091` | thin header divider rule |
| `--border-color` | `#707070` | framed containers (search bar, nav border) |
| `--placeholder-color` | `#eee` | image placeholder fill |
| `--light-color` | `#f5f5f5` | light surface |
| `--link-color` / `--link-hover-color` | `#000` / `#707070` | links (monochrome; underline on hover) |
| `--body-font-family` | `univers-next-pro, univers-fallback, arial, sans-serif` | all text (single family) |
| `--content-max-width` | `1440px` | matches Figma frame width |
| `--page-padding` | `40px` (20px mobile) | page edge padding (Figma header/slot padding = 40) |
| `--section-padding` / `--block-padding` | `30 / 24px` (20/20 mobile) | vertical rhythm |
| `--nav-height` | `99px` | header height (measured Page Template header 98.6px) |
| `--line-height-display / -heading / -body / -body-l / -label` | `1.0 / 1.19 / 1.19 / 1.15 / 1.0` | per-role line-heights |
| `--tracking-display / -heading / -label` | `−0.03em / −0.01em / +0.1em` | per-role letter-spacing |

## Color

Strictly monochrome: pure black `#000` on white `#fff`, plus a small grey scale — `#707070` (secondary/metadata text, borders), `#8d9091` (thin rule), `#eee` (image placeholders), `#f5f5f5` (light surface). Links are black, hover to grey `#707070` + underline (no brand accent color). "User-Selected Color" appears only in the Entry Cover Templates card variants (author-chosen accent), not a fixed brand hue — a per-card author control, not a global token.

## Typography

Single family **Univers Next Pro** (Adobe Fonts kit `lnd2jia`, family `univers-next-pro`) — see the Decisions section for sourcing. **Regular 400** for body/nav/metadata; **Bold 700** for display headings + entry titles. **No italics, no condensed/extended widths.** Tight negative tracking on display sizes; line-height set solid (≈1.0) on large headings (Figma line-height = font-size); uppercase labels/tags open tracking to +0.1em.

Eight measured roles, each a full size/line-height/tracking triplet. Sizes are the EDS-standard `--heading-font-size-*`/`--body-font-size-*` tokens (blocks + boilerplate expect these names); line-height and tracking are separate role tokens shared across roles. Showcased live at `/library/default-content` (Type scale section).

| Role | Figma (size/lh, tracking) | Size token | lh / tracking token | Element |
|------|---------------------------|------------|---------------------|---------|
| Display | 80/80, −2.4px (−0.03em) | `--heading-font-size-xxl` 80px | `--line-height-display` 1.0 / `--tracking-display` −0.03em | `h1` |
| Banner heading | 42/42, −0.42…−1.26px | `--heading-font-size-xl` 42px | display / display | `h2` |
| Section title / nav | 37/37, −1.11px (−0.03em) | `--heading-font-size-l` 37px | display / display | `h3` |
| Lead | 32/38, −0.32px | `--heading-font-size-m` 32px | `--line-height-heading` 1.19 / `--tracking-heading` −0.01em | `h4` |
| Small heading / credits | 20/23 | `--heading-font-size-s` 20px | `--line-height-body-l` 1.15 / heading | `h5` |
| Smallest heading | 16 | `--heading-font-size-xs` 16px | `--line-height-body` 1.19 / normal | `h6` |
| Body / entry | 16/19 | `--body-font-size-m` 16px | `--line-height-body` 1.19 | `p`, entry text |
| UI label (uppercase) | 14, +1.4px (+0.1em) | `--body-font-size-s` 14px | `--line-height-label` 1.0 / `--tracking-label` +0.1em | search, buttons |
| Metadata tag (uppercase) | 13/13, +1.3px (+0.1em) | `--body-font-size-xs` 13px | label / label | entry type tags (via block) |

Mobile (`@media width <= 900px`) scales the top of the ramp down: display 80→44, xl 42→34, l 37→28, m 32→24, s 20→18; body-l 20→18. Line-height/tracking tokens are viewport-invariant.

Note: Figma's variable panel flattened all weights to 400, but rendered screenshots show clear Bold on headings/titles — Faithful match honors the *rendered* weight (700), not the panel value.

## Spacing

Base rhythm from Figma: page padding 40px (frame edge), header pt40/pr40/pb20/pl40, content-block gaps 48px, entry-module bottom 40px, entry inner gap 12px, label-container gap 7px. Distilled to a two-token vertical system (`--section-padding` 30 / `--block-padding` 24, halved-ish on mobile) via the `* + *` sibling rule.

**Spacing scale.** The site reuses a tight, recurring set of gaps — so they're a named scale in `styles.css :root`, and every block draws from it instead of one-off px. Measured from the Figma frames:

| Token | Value | Role (source) |
|-------|-------|---------------|
| `--space-2xs` | 8px | metadata-ribbon cell pad; entry-label line gap |
| `--space-xs` | 10px | grid label right-inset; search-bar pad |
| `--space-s` | 12px | **all grid & column gutters**; entry image→label |
| `--space-m` | 20px | stacked-heading gap; CTA pad; nav + hero content gaps; rule-break gap |
| `--space-l` | 36px | banner description→CTA |
| `--space-xl` | 48px | banner heading-group→body |
| `--space-2xl` | 80px | dark-banner bottom breathing (2× base module) |
| `--page-padding` | 40px | base module: horizontal content gutter **and** section top inset |
| `--block-padding` | 24px | generic sibling spacing (`* + *`) |

**Symmetric-inset rule (the flagship fix):** where a block sits inside a padded section, insets that read as "the same gap" in Figma must BE the same token. The dark Issue banner (node 1:13138) is `pt-40 / pr-40 / pb-80`: the magazine image's top gap = its right gap = `--page-padding` (40), bottom = `--space-2xl` (80). Achieved by giving the dark section symmetric padding (`--page-padding 0 --space-2xl`) rather than zeroing it and faking edge-to-edge — the image then reaches the section's *padded* box top/right/bottom, so top inset == right inset by construction. Leave only true component geometry (icon dims, 1px hairlines, the 18px display-line gap, table cell `6px 8px`) as raw px.

## Breakpoints

Figma frames are **1440px desktop** only; no mobile frame was provided in the prototype. Single breakpoint in the foundation: `@media (width <= 900px)` scales down the display ramp and edge padding. Breakpoints are refined per-block where needed.

## Brand Principles

**Never center text; bold via markup.** Body/heading text is always left-aligned (only the *column* may be centered, e.g. the `narrow` section style). Multi-line titles are NOT all-bold: only the emphasized line is bold, and boldness is driven by an authored `<strong>` in the content (NOT by element type or line position) — so the heading defaults to regular weight and `<strong>` renders bold. Second/subsequent title lines (subtitles, author bylines) read regular, same size, same black.

## Global Page Frame

**White sheet on black (ALL pages).** The page ground is **black** on `html` + `body`; the readable content sits on a centered **white "sheet"** with black filling the side gutters at wide viewports (per Figma). Mechanism (`styles.css`): each non-`dark` section paints white ONLY on its inner `> div` (the `--content-max-width`-capped, centered content column), so the section itself is transparent and the black ground shows in the gutters. Consecutive white sections stack flush (the section element's own padding is 0), so the columns read as one continuous sheet. **Uniform section inset:** every `main > .section > div` carries `padding: var(--page-padding)` (40 on ALL four sides — same value as the left/right gutter), so top/bottom breathing room matches the horizontal gutter on every page and section. The **header** completes the sheet's top edge: `header .nav-wrapper` is transparent and the white band lives on the capped `nav` (`header.css`), capped to the same outer footprint (`--content-max-width` + 2×`--page-padding`) and centered — so the header's white band aligns column-for-column with the content and butts it flush (verified About @1728: header band + first section both 104→1624 px, meeting at y=104).

**Nav + footer are auto-included (no per-page metadata).** `header.js`/`footer.js` resolve the fragment path themselves: `<contentPrefix>/nav` and `<contentPrefix>/footer`, where `contentPrefix` = `/content` when `window.location.pathname` starts with `/content/` (the local `aem up` server) and empty in production (root serving). An authored `nav`/`footer` metadata value still overrides if ever needed. So content `.plain.html` files carry **no** nav/footer metadata rows.

## Blocks

Every author-insertable block has a live, clean example in the Component Library at **`/library/blocks/<block>`** (see the Component Library section) — that page is the canonical visual reference and the author-insertion source. Structural blocks (`header`, `footer`, `fragment`, `widget`) are not author-insertable and have no library page.

| Block | Variant | Origin | Content model | Used on | Library |
|-------|---------|--------|---------------|---------|---------|
| `projects` | `grid` (+ typographic cover) | boilerplate `cards` → renamed `grid` → **renamed `projects`** | rows of [cover cell] + [title/desc/tag `<p>`s] → `<ul>`/`<li>`; classes `projects-card-image`/`projects-card-body`. **Cover cell (first cell) accepts a picture OR text** — author-typed text becomes a typographic cover (`.projects-card-cover`: black card, white Univers-bold display text). Empty first cell → no cover. **TWO layouts, same card, identical 351px column width:** (a) **base = horizontal scroller** (Projects page) — the `<ul>` is `display:flex; flex-wrap:nowrap; overflow-x:auto` with the **scrollbar hidden** (`scrollbar-width:none` + `::-webkit-scrollbar{display:none}`). The block **bleeds BOTH left and right past the section padding** to the white column's own edges (`.projects:not(.grid) { margin-left: -(--page-padding); margin-right: -(--page-padding) }`), so the row runs under both edges and cards are clipped by them — a wordless "more to scroll" cue that replaces the scrollbar. The **first card gets `margin-left: --page-padding`** and the **last card `margin-right: --page-padding`** so at rest the row still starts/ends at the content edge, but on scroll each end card slides off *under* the column border. Card width stays based on the *padded* content width so the first four align to the grid columns / header: `flex: 0 0 calc((100% − 2·--page-padding − 3·--space-s)/4)`. 4 in view, rest overflow under the bleed edges; (b) **`.grid` variant** (Home index) — `<ul>` is `display:grid; repeat(4, minmax(0,1fr))` and **wraps** onto new rows. Mobile: grid → 2 cols; scroller → `flex-basis:66%` (~1.5 cards peek). | Home (index grid, `.grid`), Projects (scroller), Project Detail, About | `/library/blocks/projects` (grid + scroller) |
| `project-table` | `search` / base | **new** (was `index-table` → `search-table` → `project-table`) | **authored as a SINGLE block-table (never a nested HTML `<table>`).** Each block row = one data row, each cell = one of 7 columns; the FIRST block row holds the column labels. JS builds the semantic `<table>` (first row → `th`, rest → `td`). **`search` variant** (`.project-table.search` — Home, Search page): injects `.project-table-search` (input+Clear), live-filters rows, sticky search-bar + column-header on scroll (Home Beat 4), `#search` deep-link. **Base variant** (plain `.project-table` — e.g. Project Detail table-of-contents): renders the table alone, no search bar, no sticky, no top gap. **Producer column (last cell) → logo** via the shared `scripts/producer-logos.js` helper. **Search deep-link:** the search bar carries `id="search"`; the nav's search icon links to `/#search` — on arriving with that hash the block scrolls the bar into view and focuses the input. | Home (bottom), Search page (shared) | `/library/blocks/project-table` (search + base) |
| `hero` | `hero-cover` | boilerplate `hero` + new variant | [picture] + [metadata ribbon `<p>` list, 2× `<h1>`] full-bleed cover; sticky reveal (Home Beat 1). | Home | `/library/blocks/hero` |
| `event-list` | — | **new** (Calendar) | each event = 3 cells → `.event`: [metadata ribbon `<p>` list `.event-meta`] + [date `<p>` + title `<p>` `.event-preview`] + [thumbnail picture `.event-media`]. Event = **CSS grid** `grid-template-columns: 1fr 210px`, `--space-xl` between events. The ribbon (`.event-meta`) spans the full top row (`grid-column: 1/-1`); the preview sits in col 1 / row 2 and the thumbnail in col 2 / row 2 (`align-items: start`), so the **title's top line aligns with the image's top line**. **Ribbon** = grey `--border-color` bordered cells, shared −1px dividers, 13px `--metadata-color` +0.1em tracking; last cell → **producer logo**. **Preview** = flex row: 42px date (fixed 280px lead col, regular, −0.03em) + 42px title. **Thumbnail** = landscape (210px track, 210/123 aspect, `object-fit:cover`). Mobile (≤900px): grid → single column, thumbnail full-width below. | Calendar (`/calendar`), Project Detail ("upcoming events") | `/library/blocks/event-list` |
| `project-header` | — | **new** (Projects) | 2 cells: [metadata ribbon `<p>` list] + [title `<h2>`/`<h1>` + author `<p>`]. Section intro header preceding a `projects` block. Flex column, pad `--page-padding` 0 `--space-m` (40/0/20), `--space-m` gap. JS labels the two cells `.project-header-meta` / `.project-header-title`. **Ribbon** = grey `--border-color` bordered cells, shared −1px dividers, 13px `--metadata-color` +0.1em tracking, ellipsis-clipped. **Title** = two 42px display lines: project name bold (−0.42px tracking), collaborators regular (−1.26px). **Producer → logo** on the last ribbon line. Mobile: ribbon stacks vertically. | Projects (`/projects`, repeated per project), Project Detail (top, as `<h1>`) | `/library/blocks/project-header` |
| `contributors` | — | **new** (About; was `masthead`) | authored as a **2-col key/value `<table>`** (role \| name, one `<tr>` per entry). JS rebuilds each row as a stacked `<li>` (`.contributors-role` bold over `.contributors-name` regular). Entries flow into a **3-column** `columns:3` multicol (top-to-bottom then across), `--space-xl` column gap, `--space-l` between entries, 20px/`--line-height-body-l` text; `break-inside:avoid` keeps a role+name together. Mobile → 2 cols. | About (`/about`) | `/library/blocks/contributors` |
| `columns` | — (works in a regular or `dark` section) | boilerplate `columns` | 2-col [text+CTA] + [picture]; renders in a default section OR a dark section (the Home Issue banner uses `Style: Dark`, which inverts the colours + CTA). 42px heads w/ per-line tracking −0.42/−1.26px, 32px credits. **In a dark section the height is driven by the TEXT column** — the image col is `position:relative;overflow:hidden` with the img `position:absolute;inset:0;object-fit:cover;object-position:top`, so the tall mockup crops from the top rather than inflating the row. **Asymmetric top/bottom by direction:** the image's TOP keeps the 40 inset (symmetric with its right inset), its BOTTOM runs past the section's 80px bottom padding to the section's bottom EDGE via `margin-bottom: calc(-1 * var(--space-2xl))`. **Symmetric top/right insets:** the dark section carries `--page-padding 0 --space-2xl` (40/0/80), so the image's top gap == its right gap (both 40). **Headings:** "Issue 1" bold, "Fall 2026" regular. Column gap `--space-s`, heading→body `--space-xl`, desc→CTA `--space-l`, stacked-heading gap `--space-m`. | Home (Issue banner, dark) | `/library/blocks/columns` (regular + dark) |
| `projects-search` | — | **new** (Projects) | Authored as an **empty** `<div class="projects-search">`; JS injects an `<input type="search">` + "Clear" `<button>` (same bordered/uppercase look as `project-table`'s search). Live-filters the page's `projects` entry cards on input: a non-matching card is `hidden`, and a whole project group (its `project-header` section) is hidden when NONE of its entries match; Clear restores all. Sits at the foot of the Projects page. | Projects (`/projects`) | `/library/blocks/projects-search` |
| `header` | Prada editorial nav | boilerplate `header` restyled | **All nav text is grey `#707070` at 37px.** Three groups spread across the bar: brand "Prada Index" (bold, left) — **Calendar / Projects / search-icon** cluster (mid) — **About** (flush right). The search icon is a `<li class="nav-search">` inside the Calendar/Projects `<ul>`; About is its own trailing `<ul>`. **Aligned to the grid block's 4-column grid:** the desktop nav is a `grid-template: auto / repeat(4, minmax(0,1fr))` with the same `--space-s` gutter as the `grid` block, so its columns land at the identical 351px tracks. **Universal — identical on every page**, capped to the content column on ALL pages (`max-width: calc(--content-max-width + 2*--page-padding)`, `margin:auto`); the only Home difference is *placement* (see Home Scroll Interaction). **Sticky on every page (desktop):** the `<header>` element itself is `position: sticky; top: 0; z-index: 2` (@≥900px) — pinning the `<header>` (not `.nav-wrapper`) is required because sticky sticks within its containing block. Brand spans cols 1–2 (`grid-column: 1/3`); the cluster + About both span cols 3–4 (`grid-column: 3/5`) with `justify-self: start`/`end`. **Gotchas (all needed or tracks skew):** (1) `minmax(0,1fr)` not `1fr`; (2) `min-width:0` on `header nav > *`; (3) the mobile `grid-template` named areas must be cleared in BOTH `header nav` AND `header nav[aria-expanded='true']` desktop rules. **Top hairline is SPLIT into two segments** (Prada editorial signature): a segment over the wordmark (cols 1–2), a gap over the search area, then a segment over the nav cluster (cols 3–4) — `header.js` wraps `.nav-sections` + `.nav-tools` in a `.nav-menu` div; desktop CSS draws `border-top: 1px var(--border-color)` on **both `.nav-brand` and `.nav-menu`**, and the natural `--space-s` gap leaves the search area un-ruled. `.nav-menu` is `display:flex` (space-between) desktop, `display:contents` mobile. Search icon via `mask` on `/icons/search.svg`, 30px. | all pages | — (structural, not author-insertable) |

**Projects scroller — uniform cover size (gotcha):** in the flex scroller (`:not(.grid)`), a flex item defaults to `min-width: auto`, so an unbreakable long word in a typographic cover (e.g. "Estrangement") overrides the fixed `flex-basis` and grows the card wider — and because `.projects-card-cover` is `aspect-ratio: 1/1`, wider = taller. Fix (scroller-scoped only): `li { min-width: 0 }` so the item honors flex-basis, plus `.projects-card-cover { overflow: hidden; overflow-wrap: anywhere }` to break/clip long words. The `.grid` variant is immune (`minmax(0,1fr)` already caps the track), so the fix is scoped `:not(.grid)`.

**Site table-border rule (Figma):** the **top row of any table-style element shows no top border** — only its left/right/bottom edges. Applies to the `project-table` search bar (`border-top: 0`) and its data table (`tr:first-child > * { border-top: 0 }`), and the `project-header` / `event-list` metadata ribbons (single horizontal row → `border-top: 0` on every ribbon cell). Each block implements it in its own CSS.

**Producer logos (shared helper `scripts/producer-logos.js`):** any block can swap a producer name for its wordmark by calling `applyProducerLogo(el)` — it normalizes the element's text against a `LOGOS` map and, on a match, replaces the contents with an `<img class="producer-logo">` pointing at `content/media/producers/<file>.png`. Logos: **Fondazione Prada**, **Prada**, **Luna Rossa**. Used by `project-table` (Producer column) and `project-header` / `event-list` (last ribbon line); each block sizes `.producer-logo` to its own text height (13px). Add a producer by dropping its PNG in `content/media/producers/` and adding a `LOGOS` row.

## Section Styles

Applied by authors via **Section Metadata** `Style: <Name>` → EDS's `decorateSections` maps each to a `.section.<toClassName(name)>` class; combined styles stack (`Style: Narrow, Expandable`). Section-metadata decoration was added to `scripts/aem.js` `decorateSections` (the enhanced boilerplate shipped without it). Section CSS lives in `styles/styles.css`; JS enhancements in `scripts/`. (`light` and `highlight` were removed — not used in the designs.) All styles are shown side by side in the library at **`/library/sections`**.

- **`dark`** — black surface, white text (the Issue banner and other high-contrast moments). Inverts CTAs: primary becomes white-fill/black-text, secondary white outline; links white, hover to `#eee`; focus ring white.
- **`narrow`** — a reading-measure column: inner content capped to 700px + centered — the COLUMN centers, text stays left-aligned (per Brand Principles). Used for long-form reading passages (interview/essay entries).
- **`expandable`** — long content clipped behind a fade with a JS-injected "Read more" toggle (`scripts/expandable.js`, wired in `scripts.js` loadLazy; adds `.is-collapsed`/`.is-expanded`). Only the trailing text folds — a leading title/image stays above the fold.

## Page Templates

Page-wide looks applied via a `metadata` block (`template: <name>`) at the end of a page; EDS's `decorateTemplateAndTheme` maps it to `body.<name>`, and template CSS lives in `styles/styles.css` scoped to that body class. All content pages carry a template; only `homepage` keeps a grandfathered bare name (the rest follow `template-<page-type>`).

- **`homepage`** (`body.homepage`) — Home's bespoke scroll choreography (sticky hero, relocated nav, dark-band reveal — see Home Scroll Interaction below). Fallback: `scripts.js` adds it when `main .hero-cover` is present.
- **`template-content`** (`body.template-content`) — the About screen. Composes editorial content as **3 columns**: contributors (`main .contributors ul { columns: 3 }`) and the issue archive (`main .projects.grid > ul { grid-template-columns: repeat(3, …) }`). The column count is owned by the template, not the blocks. About's `projects` block carries the `grid` variant (wrapping, not the scroller).
- **`template-calendar`** (`body.template-calendar`) — the Calendar screen: a full-page `event-list`. Template class is just a scoping hook; no bespoke overrides (the `event-list` block owns its styling).
- **`template-projects`** (`body.template-projects`) — the Projects listing: repeated `project-header` + `projects` scroller pairs. Override: **zeroes top/bottom padding on `.project-header-wrapper` + `.projects-wrapper`** (keeps 40px left/right) so the pairs sit tighter. Scoped to this body class (NOT the shared `main > .section > div` rule) so Home/About — which also use `projects` — keep their 40px vertical insets.
- **`template-project-detail`** (`body.template-project-detail`) — the Project Detail long-form entry: `project-header` + 3-image overview + `event-list` + a `project-table` (base variant, no search) table-of-contents + long-form entries + `projects-search`. Same wrapper padding-zeroing as `template-projects`. **Owns the default-content styling:** (1) overview — the first section's leading image `p` becomes a horizontal scroller (480px-tall images, bleeds both column edges, hidden scrollbar); the following `p` is a 20px full-width lead. (2) entry titles — two `h2` lines at 42px; `h2` defaults REGULAR and `h2 strong` is bold (bold-via-markup), so the first line reads bold and the byline regular. (3) cover image(s) via `p:has(img)` → flex full width; `p.image-pair` removes the gutter. (4) body `p` → 20px left-aligned. (5) the "View all events" CTA → centered bordered button. Long-form entries also carry the `Narrow` + `Expandable` section styles. All scoped to the template body class → additive.

## Component Library

A living design-system reference and author-insertion palette — the library IS the block library (there is no separate styleguide). Authored `.plain.html` under `content/library/`, self-contained:

- `content/library/index.plain.html` — index (overview + Pages list + design identity); serves at `/library/` via EDS folder-index.
- `content/library/default-content.plain.html` — all semantic elements + CTA variants (the design-system showcase).
- `content/library/sections.plain.html` — section-style comparison (Default / Dark / Narrow / Expandable).
- `content/library/blocks/` — one clean page per author-insertable block: `hero`, `projects` (grid + scroller), `project-table` (search + base), `project-header`, `event-list`, `contributors`, `columns` (regular + dark section), `projects-search`. Structural blocks (`header`/`footer`/`fragment`/`widget`) are not author-insertable → no library page. Entry images reference local `/media/*`.
- `block-library.json` (repo root) — the DA Library-panel blocks list; one row per insertable block, each `name` (author label) + `path` = absolute `https://main--<repo>--<owner>.aem.live/library/blocks/<block>` (no `.plain.html`).

**Local serving quirk:** the dev server maps `content/` under the **`/content` URL prefix** (`aem up --html-folder content`), so pages preview at `http://localhost:3000/content/library/…`; in DA/published they live at `/library/…` (no `/content`). Restart `aem up` after adding new content files — it scans the folder at boot.

**DA handoff (user-owned, still open):** library pages exist in-repo only — they must be brought into DA + published before the Library panel shows anything. The DA config row (`da.live/config#/<owner>/<repo>/` → sheet `library`), the CORS header, and the EMA Library-url are all user steps.

## Home Scroll Interaction

The Home page uses a repeating reveal/sticky scroll mechanic — the `homepage` template plus a small Home-scoped controller. It is NOT a one-off hero treatment; it's a repeating pattern of two alternating primitives:

- **REVEAL** — a section on a higher `z-index` rises and *progressively covers* the layer beneath it. An explicit overlay cover-up, NOT a passive release: the covered layer stays put while the rising sheet climbs the viewport, and the rising edge can even cover a currently-pinned sticky header.
- **STICKY** — a section's top row pins (`position: sticky; top: 0`) while the rest of that section scrolls beneath it, staying pinned until the next section's reveal edge rises up and covers it off.

Four beats down the page: (1) the white index-grid section rises over the hero; (2) the grid's nav row pins; (3) the dark Issue section rises and evicts the pinned nav; (4) the data-table header (search bar + column-header row) pins for the remainder of the page.

**Home is the animated case of the global white-sheet frame.** On Home the sheet *slides over the hero* rather than sitting statically: the page ground is black (`body.homepage`, `main`), the hero is a full-bleed sticky cover at `z:0`, and the grid sheet rises over it. The choreography is scoped to `body.homepage` and owns Home's sheet (the generic `body:not(.homepage)` sheet rules are excluded there). The rising white sheet must cover the hero *exactly*: the sheet's `> div` is content-box (`--content-max-width` + 2×`--page-padding` = 1520px outer), so the hero column (`.hero-wrapper`) is capped to the same outer footprint via `max-width: calc(var(--content-max-width) + 2 * var(--page-padding))` — otherwise the hero is 80px narrower than the sheet and isn't covered. Verified at 1728: hero-wrapper and grid sheet both 1520px, 104px black margins each side.

**Home hero touches the top edge:** the empty `header` block reserves `--nav-height` (99px) above `main`, and sections carry top padding. On Home the hero must sit flush at the viewport top (nav overlays it). Fixed by pulling the first section up under the header: `main:has(.hero-cover) > .section:first-child { margin-top: calc(-1 * var(--nav-height)); padding-top: 0 }`. Verified hero top = 0px.

**Choreography — all four beats (verified in preview):**
- **Beat 1** (hero `sticky` reveal): `body.homepage` hero pins, white grid rises over it.
- **Beat 2** (nav rides up + pins) — **pure native scroll, NO JS transform.** `header.js` relocates the whole `<header>` into the top of the grid sheet (`gridSection > div` — the capped content column) via `prepend`, and adds `.nav-placed`. Because the header is now real DOM content *inside* the sheet, it (a) scrolls **smoothly** with the sheet as it rises, and (b) is **exactly as wide as the sheet**. `header.css .nav-placed { position: sticky; top: 0; z:4 }` pins it natively; a white `background-color` covers the cards scrolling beneath. Its inner `nav` drops its own horizontal page-padding (the sheet's `> div` already supplies the 40px gutter). *Why relocate rather than fixed-position:* a `position:fixed` + JS-`translateY` nav can't scroll as smoothly and spans the whole viewport (wider than the sheet); moving it into the DOM fixes both.
- **Beat 3** (dark COVERS nav — a REVEAL): the dark Issue section rises on a **higher stacking layer than the pinned nav** (`z:5 > nav z:4 > grid z:1 > hero z:0`; the z:5 rule is `main:has(.hero-cover) > .section:first-child ~ .section.dark` — the `:first-child ~` shape is required so it out-specifies the generic `~ .section { z:1 }` rule). With the nav now native-sticky inside the grid section, the dark section simply covers the entire grid section (nav included) as it rises — no eviction class needed; when the grid section scrolls off, its sticky nav goes with it.
- **Beat 4** (table header pin): built into `project-table.css` (the `search` variant's sticky search-bar + column-header).
- **No black gap at the hero/sheet seam** — two section paddings had to go: (1) the grid sheet's `padding-top` (its white ground lives on the inner `> div`, so the section's own top pad showed the black ground above the nav) → `main:has(.hero-cover) > .section:first-child + .section { padding-top: 0 }`; (2) the **hero's own `padding-bottom`** → zeroed via `main:has(.hero-cover) > .section:first-child { padding-block: 0 }`. Verified hero image bottom == sheet top, gap 0.
- **Opaque-cover gotcha:** every post-hero section must paint an **opaque** ground across its FULL width, because the sticky hero sits at `z:0` *above* `main`'s own black background — a `transparent` section would reveal the hero through its side gutters. Fix: `main:has(.hero-cover) > .section:first-child ~ .section { background-color: var(--text-color) }` (black sides for ALL covering sections incl. dark), then `…:not(.dark) > div { background-color: var(--background-color) }` paints white only inside the capped content column of light sections.
- `prefers-reduced-motion`: no JS motion controller is involved (relocation is a one-time DOM move, not scroll-driven); the nav pins via plain CSS `sticky`, acceptable under reduced-motion. On Home the empty `<header>` landmark reserves no flow space (`min-height:0`).

## Decisions

- **Home hero pin = `position: sticky`, not `fixed`.** The rising white sheet covers the hero entirely, so stay-vs-scroll-away is visually indistinguishable — sticky (normal flow, no spacer, pure-CSS release) was chosen over fixed. Decided 2026-07-08.
- **Typeface: Univers → Univers Next Pro via Adobe Fonts (Typekit).** The design specifies "Univers" (a licensed Linotype face); the current digital release **Univers Next Pro** (Monotype) is treated as equivalent for this build. Sourced from the Adobe Fonts web project — kit `lnd2jia`, CSS `https://use.typekit.net/lnd2jia.css`, family `univers-next-pro`. Weights available 200–700; the build uses **400 (Regular)** for body/nav/metadata and **700 (Bold)** for display headings + entry titles — no italics, no condensed/extended widths. Decided 2026-07-08.
