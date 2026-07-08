## Figma Source

**File:** `[INT] Prada Index Website Design (Copy)`
**File key:** `6WyrWzRXskdPTcPtQ296CQ`
**Base URL:** https://www.figma.com/design/6WyrWzRXskdPTcPtQ296CQ/-INT--Prada-Index-Website-Design--Copy-

All frames verified accessible 2026-07-08 (Figma MCP `get_metadata` + Home `get_screenshot`).
Note: this "Copy" file key supersedes the base file URL recorded in orientation (PROJECT-DESIGN.md #7 — `r3Na8h9qDALXzvTBZAbQGL`). Use the key below for all frame work.

## Component Library (design-system + author palette)

Scaffolded 2026-07-08 (`component-library`). DA project, build-fresh — the library IS the block library; there is no separate styleguide.

**Location (in-repo, authored `.plain.html`):**
- `content/library.plain.html` — index + CTA legend
- `content/library/default-content.plain.html` — all semantic elements + CTA variants (the design-system showcase; verified on-brand in preview)
- `content/library/sections.plain.html` — section-style comparison (Default / Light / Dark)
- `content/library/blocks/` — empty, grows one clean page per block as Home's blocks are built
- `block-library.json` (repo root) — DA Library-panel blocks list; currently empty (`data: []`), one row added per validated block. Row shape: `name` (author label) + `path` = absolute `https://main--pr--gabrielwalt.aem.live/library/blocks/<block>` (NO `.plain.html`).

**Local serving quirk:** the dev server maps `content/` under the **`/content` URL prefix** (`aem up --html-folder content`), so pages preview at `http://localhost:3000/content/library/default-content` (and `.plain.html` at `/content/library/....plain.html`). In DA/published they live at `/library/...` (no `/content`). Restart `aem up` after adding new content files — it scans the folder at boot.

**DA handoff status (2026-07-08): NOT yet handed off.** Library pages exist in-repo only — they must be brought into DA + published before the Library panel shows anything. `block-library.json` will serve from the code repo once committed. See the Library-Handoff checklist delivered to the user. Config row (`da.live/config#/gabrielwalt/pr/` → sheet `library`), CORS header, and EMA Library-url are all user-owned steps, still open.

## Home — in-depth analysis (frame `1:13091`)

Analyzed 2026-07-08 before import. Frame is 1440×4227.6. Four stacked top-level children:

| # | Child node | Name | Size (w×h) | Role |
|---|-----------|------|-----------|------|
| 1 | `1:13092` | Frame 1422161201 (Hero) | 1440×720 | Full-bleed hero: bg image `dt 1` (`1:13093`) + overlay content `1:13094` (1360×640, 40px inset). Metadata block (white bordered rows) top-left; two 80px display lines bottom ("Satellites II" / "Nicolas Winding Refn, Hideo Kojima"). White text on image. |
| 2 | `1:13099` | Frame 1422162454 (Index grid) | 1440×1471.6 | White bg. Header `1:13100` (98.6px) + entry grid `1:13101` (1346px). |
| 3 | `1:13138` | Frame 1422162596 (Issue banner) | 1440×511 | **Dark section** — black bg, white text, "Issue 1 / Fall 2026" + credits + inverted ABOUT button + magazine mockup image. |
| 4 | `1:13150` | Page Content | 1440×1525 | White bg. Search bar + the full data table (Metadata Stack). |

### Header `1:13100` (repeated across pages as the shared nav)
- Padding 40/40/20/40. Two-part: bold "Prada Index" wordmark (left) + nav "Calendar Projects [search icon] … About" (grey `#707070`, 37px).
- Thin rule `#8d9091` spans the top; the wordmark's rule is a separate segment from the nav's (Figma splits them with a gap over the search area). Height ≈ 98.6px.

### Index grid `1:13101`
- 4-column grid of **Entry Modules** (`1:13104`…`1:13137`), 331px wide each, 12 shown on Home. Row heights vary (392–431px) because description line-count differs.
- Each Entry Module = image (331px sq, `#eee` placeholder) + label container (gap 7px): **title** (16/19, black, bold-looking), **description** (16/19, black), **type tag** (16/19, grey `#00000040`≈25% black, e.g. "Interview"/"Essay").
- Frame padding: pr40/pb70/pl40, no top pad (sits under header). Column gap derives from 4×331 across 1360 usable.

### THE SCROLL INTERACTION (reconstructed from user description — NOT observable via Figma tools; static frames only)
A two-phase pinned-scroll effect. Cannot be read from the prototype through the MCP tools; this is the user's spec, cross-checked against the frame stack:

**Phase 1 — hero pinned, white sheet rises over it.**
- The hero (child 1, 720px) is **fixed/pinned** and does NOT scroll. The white index section (child 2 onward) scrolls **up over** the hero, progressively covering it. Effect = hero is a stationary backdrop; the white content is a sheet sliding up on top (z-above hero).

**Phase 2 — white section's top row goes sticky.**
- When the top of the white section (child 2) reaches the top of the viewport, its **header row becomes sticky** at the top; the rest of the white content (the entry grid) scrolls up *behind* that sticky header.
- **Sticky region height = from the top of the white bg to the top of the first entry image.** That's the white section's Header `1:13100` band = **≈98.6px** (header incl. its 40/20 padding), i.e. everything above `1:13101`'s first image row. Confirm the exact px at build by measuring header-bottom → first-image-top.

**Implementation notes for build (EDS):**
- Phase 1 (hero pinned + sheet-over) → hero in its own section, `position: sticky; top: 0` (or fixed) with the following white section at a higher stacking context sliding over it. Watch `overflow` on ancestors — `overflow: hidden` on `html/body` kills sticky; use `overflow-x: clip` (see `css-pitfalls-eds`).
- Phase 2 (sticky sub-header) → the white section's header (nav row) `position: sticky; top: 0` within its section; sticky height must equal header band (≈98.6px). Two independent sticky contexts stacked — verify they don't fight (the hero sticky must release before/behind the header sticky).
- This is bespoke Home behavior, likely a small JS + CSS block, not a reusable variant. Build behind reduced-motion consideration and test on touch (`responsive-adaptation`).
- **Verify against the real prototype with the user** (or a screen recording) before finalizing — the pin/release timing and whether hero is `sticky` vs `fixed` affects the DOM/CSS approach.

### Issue banner `1:13138` → maps to a **dark section** (already built in foundation)
- Black bg, white text, inverted white-fill ABOUT button (verified in `/library/sections`). 42px "Issue 1/Fall 2026", 32/38 credits, magazine mockup image right.

### Page Content `1:13150` (data table)
- Search bar (bordered `#707070`, "SEARCH"…"CLEAR", 14px uppercase +1.4px tracking) + a long **Metadata Stack** table (`1:13156`): ~55 rows, 6 columns (Project/Title/Type/Collaborator/Venue/Date/Producer), 13px uppercase grey `#707070` +1.3px tracking, 1px `#707070` cell borders, 25px row height. This is the dense index table seen at the bottom of Home.

**Known gap (RESOLVED):** section styles now render — `decorateSections` patched (PROJECT-PLAN task #7 ✅). See `eds-section-metadata-decoration`.

## Frame → Page Mapping

| Frame | Node ID | EDS page path | Status |
|-------|---------|---------------|--------|
| Home | `1:13091` | `/` (index) | 🔲 first deliverable |
| Calendar | `1:13698` | `/calendar` | 🔲 |
| Projects | `1:13593` | `/projects` | 🔲 |
| Project Detail | `14:10689` | `/projects/<slug>` | 🔲 |
| Slideshow | `1:14709` | `/slideshow` (entry viewer) | 🔲 |
| Search (state 1) | `1:13913` | `/search` | 🔲 |
| Search (state 2) | `1:13994` | `/search` (results/alt state) | 🔲 |
| About | `1:13576` | `/about` | 🔲 |
| Overlay (nav/menu) | `1:12954` | header/menu overlay component | 🔲 |
| Entry Cover Templates | `1:13733` | card-cover variant set (not a page) | 🔲 |

## Node ID Reference

| Name | Node ID | Notes |
|------|---------|-------|
| Overlay | `1:12954` | contains `1:12955` Overlay + `1:13076` Home cover |
| Home | `1:13091` | hero (`1:13092`) → index grid (`1:13099`) → Issue banner (`1:13138`) → Page Content/table (`1:13150`) |
| Calendar | `1:13698` | wraps `Page Template` instance `1:13732` |
| Projects | `1:13593` | wraps `Page Template` instance `1:13697` |
| Project Detail | `14:10689` | wraps `Page Template` instance `14:11052`; very tall (13508px) |
| Slideshow | `1:14709` | wraps `Entry Template` instance `1:14716`; very tall (17831px) |
| Search (state 1) | `1:13913` | wraps `Page Template` instance `1:13993` |
| Search (state 2) | `1:13994` | wraps `Page Template` instance `1:14037` |
| About | `1:13576` | wraps `Page Template` instance `1:13592` |

### Entry Cover Templates (section `1:13733`) — reusable card-cover variant set

| Variant | Node ID |
|---------|---------|
| Two Column / White | `1:13736` |
| Two Column / User-Selected Color 1 | `1:13749` |
| Two Column / User-Selected Color 2 | `1:13762` |
| Full Width Image / Black | `1:13776` |
| Full Width Image / User-Selected Color 1 | `1:13788` |
| Full Width Image / User-Selected Color 2 | `1:13800` |
| Full Bleed Image / Top-Aligned Text | `1:13813` |
| Full Bleed Image / Bottom-Aligned Text | `1:13822` |
