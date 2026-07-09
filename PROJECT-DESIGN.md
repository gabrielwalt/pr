## Migration Strategy

Recorded 2026-07-08 (project orientation).

| # | Input | Decision |
|---|-------|----------|
| 1 | Authoring model | **Document Authoring (da.live)** |
| 2 | Scope | **Full site from Figma** — Home, Calendar, Projects, Project detail, Slideshow, Search (×2 states), About, plus an "Entry Cover Templates" set of card variants reused across listing pages. First deliverable: global style foundation + Home. |
| 3 | Site analysis first? | No URL discovery — source is a Figma prototype (no live site). Inventory the Figma file's frames directly; the frame list IS the scope. |
| 4 | Starting page | **Home** |
| 5 | Content source | **Figma-only** — [INT] Prada Index Website Design (no live site). |
| 6 | Design source | Same — the Figma file. |
| 7 | Reuse | Enhanced EDS boilerplate blocks (cards, columns, footer, fragment, header, hero, widget) as starting palette. |

## Design Tokens

Global foundation established 2026-07-08 (`global-style-foundation`, Faithful fidelity); type system fully tokenized 2026-07-08 after a second measurement pass across Home hero (`1:13092`), Issue banner (`1:13138`), Page Content table (`1:13150`), and About/Page-Template (`1:13592`). **Code is truth** — the live token set lives in `styles/styles.css` `:root`; the summary below records *intent*. Every recurring size/line-height/tracking is a token (Systematic-Tokenization); verified in-browser (all roles match Figma px exactly).

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

**Section styles** (via Section Metadata `Style` → class): `dark` (black surface, white text), `narrow` (reading-measure column: inner content capped to 700px + centered — the COLUMN centers, text stays left-aligned), `expandable` (long content clipped behind a fade with a JS-injected "Read more" toggle — `scripts/expandable.js`, wired in `scripts.js` loadLazy; adds `.is-collapsed`/`.is-expanded`). (`light` and `highlight` removed — not used in the designs.) Dark inverts CTAs — primary becomes white-fill/black-text, secondary white outline; links white, hover to `#eee`; focus ring white. Section-metadata decoration was added to `scripts/aem.js` `decorateSections` (the enhanced boilerplate shipped without it). Styles combine comma-separated (`Style: Narrow, Expandable`).

**Prada branding — never center text; bold via markup.** Body/heading text is always left-aligned (only the *column* may be centered, e.g. `narrow`). Multi-line titles are NOT all-bold: only the emphasized line is bold, and boldness is driven by an authored `<strong>` in the content (NOT by element type or line position) — so the heading defaults to regular weight and `<strong>` renders bold. Second/subsequent title lines (subtitles, author bylines) read regular, same size, same black.

## Typography

Single family **Univers Next Pro** (Adobe Fonts kit `lnd2jia`, family `univers-next-pro`) — see the Decisions section below for sourcing. **Regular 400** for body/nav/metadata; **Bold 700** for display headings + entry titles. **No italics, no condensed/extended widths.** Tight negative tracking on display sizes; line-height set solid (≈1.0) on large headings (Figma line-height = font-size); uppercase labels/tags open tracking to +0.1em.

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

## Color

Strictly monochrome: pure black `#000` on white `#fff`, plus a small grey scale — `#707070` (secondary/metadata text, borders), `#8d9091` (thin rule), `#eee` (image placeholders), `#f5f5f5` (light surface). Links are black, hover to grey `#707070` + underline (no brand accent color). "User-Selected Color" appears only in the Entry Cover Templates card variants (author-chosen accent), not a fixed brand hue — will be a per-card author control, not a global token.

## Spacing

Base rhythm from Figma: page padding 40px (frame edge), header pt40/pr40/pb20/pl40, content-block gaps 48px, entry-module bottom 40px, entry inner gap 12px, label-container gap 7px. Distilled to a two-token vertical system (`--section-padding` 30 / `--block-padding` 24, halved-ish on mobile) via the `* + *` sibling rule.

**Spacing scale (tokenized 2026-07-08).** The site reuses a tight, recurring set of gaps — so they're a named scale in `styles.css :root`, and every block draws from it instead of one-off px. Measured from the Figma frames:

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

Figma frames are **1440px desktop** only; no mobile frame was provided in the prototype. Single breakpoint in the foundation: `@media (width <= 900px)` scales down the display ramp and edge padding. Refine breakpoints per-block during Home styling and confirm with the user if mobile frames surface.

## Home Scroll Interaction (`homepage` template)

The Home page uses a repeating reveal/sticky scroll mechanic — the `homepage` template plus a small Home-scoped controller. It is NOT a one-off hero treatment; it's a repeating pattern of two alternating primitives (code is truth for the implementation — this records intent):

- **REVEAL** — a section on a higher `z-index` rises and *progressively covers* the layer beneath it. An explicit overlay cover-up, NOT a passive release: the covered layer stays put while the rising sheet climbs the viewport, and the rising edge can even cover a currently-pinned sticky header.
- **STICKY** — a section's top row pins (`position: sticky; top: 0`) while the rest of that section scrolls beneath it, staying pinned until the next section's reveal edge rises up and covers it off.

Four beats down the page: (1) the white index-grid section rises over the hero; (2) the grid's nav row pins; (3) the dark Issue section rises and evicts the pinned nav; (4) the data-table header (search bar + column-header row) pins for the remainder of the page.

Key decisions & guardrails:
- **Hero pin = `position: sticky; top: 0` (NOT `fixed`).** The rising white sheet covers the hero entirely, so stay-vs-scroll-away is visually indistinguishable — sticky is cleanest: hero stays in normal flow (no spacer), pins at `top:0`, is covered by the higher-`z` sheet, and releases with pure CSS (no scroll listener). Decided 2026-07-08.
- **Build the sticky primitives INTO the reusable blocks** (nav header, `project-table`) so other pages inherit a normal sticky header/table; keep the reveal choreography (hero→grid→dark z-layer eviction) as a **Home-only** treatment.
- `overflow: hidden` on `html`/`body`/ancestors kills sticky — use `overflow-x: clip` instead.
- Respect `prefers-reduced-motion`; verify on touch.

## Page Templates

Page-wide looks applied via a `metadata` block (`template: <name>`) at the end of a page; EDS's `decorateTemplateAndTheme` maps it to `body.<name>`, and template CSS lives in `styles/styles.css` scoped to that body class. **Code is truth** — read the CSS for exact selectors; the summary below records intent. All content pages carry a template; only `homepage` keeps a grandfathered bare name (the rest follow `template-<page-type>`).

- **`homepage`** (`body.homepage`) — Home's bespoke scroll choreography (sticky hero, relocated nav, dark-band reveal — see Home Scroll Interaction above). Fallback: `scripts.js` adds it when `main .hero-cover` is present.
- **`template-content`** (`body.template-content`) — the About screen. Composes editorial content as **3 columns**: contributors (`main .contributors ul { columns: 3 }`) and the issue archive (`main .projects.grid > ul { grid-template-columns: repeat(3, …) }`). The column count is owned by the template, not the blocks. About's `projects` block carries the `grid` variant (wrapping, not the scroller).
- **`template-calendar`** (`body.template-calendar`) — the Calendar screen: a full-page `event-list`. Template class is just a scoping hook; no bespoke overrides (the `event-list` block owns its styling).
- **`template-projects`** (`body.template-projects`) — the Projects listing: repeated `project-header` + `projects` scroller pairs. Override: **zeroes top/bottom padding on `.project-header-wrapper` + `.projects-wrapper`** (keeps 40px left/right) so the pairs sit tighter. Scoped to this body class (NOT the shared `main > .section > div` rule) so Home/About — which also use `projects` — keep their 40px vertical insets.
- **`template-project-detail`** (`body.template-project-detail`) — the Project Detail long-form entry: `project-header` + 3-image overview + `event-list` + a `project-table` (base variant, no search) table-of-contents + long-form entries + `projects-search`. Same wrapper padding-zeroing as `template-projects`. **Owns the default-content styling:** (1) overview — the first section's leading image `p` becomes a horizontal scroller (480px-tall images, bleeds both column edges, hidden scrollbar); the following `p` is a 20px full-width lead. (2) entry titles — two `h2` lines at 42px; `h2` defaults REGULAR and `h2 strong` is bold (bold-via-markup), so the first line reads bold and the byline regular. (3) cover image(s) via `p:has(img)` → flex full width; `p.image-pair` removes the gutter. (4) body `p` → 20px left-aligned. (5) the "View all events" CTA → centered bordered button. Long-form entries also carry the `Narrow` + `Expandable` section styles (see Section styles under Design Tokens). All scoped to the template body class → additive.

## Decisions

- **Home hero pin = `position: sticky`, not `fixed`.** See the Home Scroll Interaction section above — the rising white sheet covers the hero entirely, so sticky (normal flow, no spacer, pure-CSS release) was chosen over fixed. Decided 2026-07-08.
- **Typeface: Univers → Univers Next Pro via Adobe Fonts (Typekit).** The design specifies "Univers" (a licensed Linotype face); the current digital release **Univers Next Pro** (Monotype) is treated as equivalent for this build. Sourced from the Adobe Fonts web project — kit `lnd2jia`, CSS `https://use.typekit.net/lnd2jia.css`, family `univers-next-pro`. Weights available 200–700; the build uses **400 (Regular)** for body/nav/metadata and **700 (Bold)** for display headings + entry titles — no italics, no condensed/extended widths. Decided 2026-07-08.

## Block Inventory

*[See `PROJECT-BLOCKS.md` for the detailed block/variant/section-style registry.]*
