## Migration Strategy

Recorded 2026-07-08 (orientation with gabrielwalt, project lead).

| # | Input | Decision |
|---|-------|----------|
| 1 | Authoring model | **Document Authoring (da.live)** |
| 2 | Scope | **Full site from Figma** — Home, Calendar, Projects, Project detail, Slideshow, Search (×2 states), About, plus an "Entry Cover Templates" set of card variants reused across listing pages. First deliverable: global style foundation + Home. |
| 3 | Site analysis first? | No URL discovery — source is a Figma prototype (no live site). Inventory the Figma file's frames directly; the frame list IS the scope. |
| 4 | Starting page | **Home** |
| 5 | Content source | **Figma-only** — [INT] Prada Index Website Design (no live site). |
| 6 | Design source | Same — the Figma file. |
| 7 | Additional resources | Figma file: https://www.figma.com/design/r3Na8h9qDALXzvTBZAbQGL/-INT--Prada-Index-Website-Design?node-id=0-1 |
| 8 | Fidelity | **Faithful** — match the Figma design closely. Still start by establishing a base global style baseline (colors, fonts, default-content styling, CTA) before styling blocks. |
| 9 | Templates/content to improve | None — faithful migration. "Entry Cover Templates" is a reusable card-variant set across listing pages. |
| 10 | Reuse | Enhanced EDS boilerplate blocks (cards, columns, footer, fragment, header, hero, widget) as starting palette. |
| 11 | Per-page fidelity overrides | None. |
| 12 | Constraints | No Git, no AEM pushes (agent never commits/publishes). |

## Design Tokens

Global foundation established 2026-07-08 (`global-style-foundation`, Faithful fidelity). Measured across 3 representative frames: Home `1:13091`, Projects `1:13593`, About `1:13576`. **Code is truth** — the live token set lives in `styles/styles.css` `:root`; the summary below records *intent*.

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

## Typography

Single family **Univers Next Pro** (Adobe Fonts kit `lnd2jia`, family `univers-next-pro`) — see [[PROJECT-CONTEXT]] Decisions for sourcing. **Regular 400** for body/nav/metadata; **Bold 700** for display headings + entry titles. **No italics, no condensed/extended widths.** Tight negative tracking on display sizes; line-height ≈ 1 on large headings (Figma line-height = font-size).

Measured type ramp (desktop, from Figma 1440 frames), mapped to EDS tokens:

| Role | Figma size/lh | Token | EDS element |
|------|---------------|-------|-------------|
| Display | 80/80, tracking −2.4px (−0.03em) | `--heading-font-size-xxl` 80px | `h1` |
| Section head / nav | 37/37, tracking −1.11px (−0.03em) | `--heading-font-size-l` 37px | `h3` |
| Sub-head | 42/42 | `--heading-font-size-xl` 42px | `h2` |
| Body-large / credits | 32/37 (About intro); 20/23 (credits) | `--heading-font-size-m` 32 / `--body-font-size-l` 20 | `h4` / large text |
| Body | 16/19 | `--body-font-size-m` 16px | `p`, entry text |
| Label (uppercase, tracked) | 14, tracking +1.4px | `--body-font-size-s` 14px | search/labels |
| Dense table | 13/13 | `--body-font-size-xs` 13px | data tables |

Note: Figma's variable panel flattened all weights to 400, but rendered screenshots show clear Bold on headings/titles — Faithful match honors the *rendered* weight (700), not the panel value.

## Color

Strictly monochrome: pure black `#000` on white `#fff`, plus a small grey scale — `#707070` (secondary/metadata text, borders), `#8d9091` (thin rule), `#eee` (image placeholders), `#f5f5f5` (light surface). Links are black, hover to grey `#707070` + underline (no brand accent color). "User-Selected Color" appears only in the Entry Cover Templates card variants (author-chosen accent), not a fixed brand hue — will be a per-card author control, not a global token.

## Spacing

Base rhythm from Figma: page padding 40px (frame edge), header pt40/pr40/pb20/pl40, content-block gaps 48px, entry-module bottom 40px, entry inner gap 12px, label-container gap 7px. Distilled to a two-token vertical system (`--section-padding` 30 / `--block-padding` 24, halved-ish on mobile) via the `* + *` sibling rule; per-block specifics (e.g. 48px credit gaps) handled additively in block CSS later.

## Breakpoints

Figma frames are **1440px desktop** only; no mobile frame was provided in the prototype. Single breakpoint in the foundation: `@media (width <= 900px)` scales down the display ramp and edge padding. Refine breakpoints per-block during Home styling and confirm with the user if mobile frames surface.

## Block Inventory

*[Agent: fill as blocks are built — see also `PROJECT-BLOCKS.md` for the detailed registry.]*
