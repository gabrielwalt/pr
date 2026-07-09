## Figma Source

**File:** `[INT] Prada Index Website Design (Copy)`
**File key:** `6WyrWzRXskdPTcPtQ296CQ`
**Base URL:** https://www.figma.com/design/6WyrWzRXskdPTcPtQ296CQ/-INT--Prada-Index-Website-Design--Copy-

All frames verified accessible 2026-07-08 (Figma MCP `get_metadata` + Home `get_screenshot`).
Note: this "Copy" file key supersedes the base file URL recorded in orientation (PROJECT-DESIGN.md #7 — `r3Na8h9qDALXzvTBZAbQGL`). Use the key below for all frame work.

## Component Library (design-system + author palette)

Scaffolded 2026-07-08 (`component-library`). DA project, build-fresh — the library IS the block library; there is no separate styleguide.

**Location (in-repo, authored `.plain.html`):**
- `content/library/index.plain.html` — index (overview + Pages list + Design identity); serves at `/library/` via EDS folder-index. Whole library self-contained under `content/library/`.
- `content/library/default-content.plain.html` — all semantic elements + CTA variants (the design-system showcase; verified on-brand in preview)
- `content/library/sections.plain.html` — section-style comparison (Default / Dark)
- `content/library/blocks/` — one clean page per author-insertable block (updated 2026-07-09 to the full set): `hero`, `projects` (grid + scroller variants), `project-table`, `project-header`, `event-list`, `contributors`, `columns` (shown in its dark-section context). Structural blocks (`header`/`footer`/`fragment`) are not author-insertable → no library page. All entry images reference local `/media/*` (re-pointed 2026-07-09 from the dead `content.da.live` blob URLs that made images break on reload).
- `block-library.json` (repo root) — DA Library-panel blocks list; 7 rows (one per insertable block). Row shape: `name` (author label) + `path` = absolute `https://main--pr--gabrielwalt.aem.live/library/blocks/<block>` (NO `.plain.html`).

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

### THE SCROLL INTERACTION — four-beat repeating reveal/sticky pattern
Confirmed 2026-07-08 against a user screen recording (8 frames). This is NOT a one-off hero treatment — it's a **repeating mechanic**: full-height sections rise over the preceding layer (reveal) and sub-header rows pin (sticky), alternating. All Y values below are frame-relative (Home frame top = 0), measured from the node tree.

**The mechanic = two primitives, alternating:**
- **REVEAL** — a section on a higher stacking layer (`z-index` above the previous) scrolls up and *progressively covers* what's beneath it. It's an **explicit cover-up (overlay), NOT a passive release** — the covered layer stays put while the rising sheet's top edge climbs the viewport. The rising edge even evicts a currently-pinned sticky header by overlapping it.
- **STICKY** — a section's top row (`position: sticky; top: 0`) pins at the viewport top while the rest of that section scrolls beneath it. It stays pinned until the NEXT section's reveal edge rises up and covers it off.

**Beat 1 — Reveal #1: white grid section evicts the fixed hero.**
- Hero (`1:13092`, 0→720) is **fixed** (locked to viewport, `z` below). White grid section (`1:13099`, top=720) rises over it on a higher layer, covering the hero completely. Reveal boundary = **720px** scrolled.

**Beat 2 — Sticky #1: grid nav row pins.**
- Once the grid section's top reaches viewport top, its header row (`1:13100`) becomes `position: sticky; top: 0`. Sticky band = header only = **98.6px** (720→818.6). Grid entries (`1:13101`, first image at **845.6**) scroll beneath it.
- (Earlier note said "top of white bg → first image" ≈98.6 — correct: header band 98.6px, then a ~27px gap before the first image at 845.6.)

**Beat 3 — Reveal #2: dark Issue section evicts the pinned nav (SAME overlay technique as Beat 1).**
- Dark Issue section (`1:13138`, top=**2191.6**, 511px tall) rises on a higher layer and covers up the Beat-2 sticky nav — explicit overlap, not the nav's container passively ending. The nav sits pinned while the dark section scrolls up underneath, then is pushed off once the dark section's rising edge reaches the top.
- The dark section carries **NO sticky header of its own** — after it fully evicts the nav, it scrolls away normally like ordinary content.
- **Reveal-#2 boundary** = where the dark section's top edge (frame Y **2191.6**) reaches the viewport top = **2191.6px** scrolled. Equivalent: the dark edge meets the pinned nav's bottom (98.6px from top) when scroll = 2191.6 − 98.6 = **2093.0px** (the moment eviction begins); nav fully gone at 2191.6.

**Beat 4 — Sticky #2: table header row pins for the rest of the page.**
- Table section = Page Content `1:13150` (top=**2702.6**). Its header row = the **search-bar toolbar** (`1:13151`, 70px, "SEARCH … CLEAR") **+ the column-header row** (`1:13157`, "PROJECT / TITLE / TYPE / COLLABORATOR / VENUE / DATE / PRODUCER", 25px). Together they become one `position: sticky; top: 0` context and stay pinned for the remainder of the page.
- Sticky band = search bar 70px + 40px table pad + column header 25px. Measured: search 2702.6→2772.6; table frame pad +40; column-header `1:13157` 2772.6+40=2812.6→2837.6; **first data row** `1:13158` at **2837.6**. So sticky band ≈ **135px** (2702.6→2837.6, toolbar + pad + header row), pinning until page end. Confirm exact px at build (toolbar-top → first-data-row-top).

**Implementation notes (EDS):**
- REVEAL primitive → the rising section gets a higher `z-index` and `position: relative`; the covered layer is `position: sticky|fixed; top:0` at a lower `z`. Build ONE reusable reveal mechanism, apply it at both boundaries (hero→grid, nav→dark). Reveal #2 must cover a *sticky* element, so the dark section's stacking context must beat the nav's.
- STICKY primitive → sub-header `position: sticky; top:0`; each sticky release happens because the next reveal covers it (z-order), not because its container runs out — so don't rely on container end. Two sticky bands: grid nav (98.6px) and table header (~135px).
- `overflow:hidden` on `html/body`/ancestors kills sticky — use `overflow-x: clip` (`css-pitfalls-eds`).
- Likely a small Home-scoped JS+CSS controller coordinating z-layers. Respect `prefers-reduced-motion`; test on touch (`responsive-adaptation`).
- **Hero pin technique = `position: sticky; top: 0` (NOT `fixed`).** Decided 2026-07-08 (gabrielwalt): whether the hero stays pinned or scrolls away under the fully-covering white sheet is visually indistinguishable (the sheet covers it entirely), so use whichever is cleanest/most performant → **sticky**. Sticky keeps the hero in normal flow (occupies its own 720px, so NO spacer needed), pins at `top:0`, and is covered by the higher-z white section with zero JS for the release — pure CSS, no scroll listeners for this beat. This sidesteps the stay-vs-disappear question entirely (the browser handles it via the containing block).

### Issue banner `1:13138` → maps to a **dark section** (already built in foundation)
- Black bg, white text, inverted white-fill ABOUT button (verified in `/library/sections`). 42px "Issue 1/Fall 2026", 32/38 credits, magazine mockup image right.

### Page Content `1:13150` (data table)
- Search bar (`1:13151`, 70px, bordered `#707070`, "SEARCH"…"CLEAR", 14px uppercase +1.4px tracking) + a long **Metadata Stack** table (`1:13156`, 1375px): **55 rows** (`1:13157`…`1:13211`) × 25px each, 7 columns (Project/Title/Type/Collaborator/Venue/Date/Producer), 13px uppercase grey `#707070` +1.3px tracking, 1px `#707070` cell borders. Row 1 (`1:13157`) is the **column-header row**; rows 2+ are data. This is the dense index table at the bottom of Home; it's the SAME table that IS the whole Search page (`/search`).
- **All 54 data rows authored** into `content/index.plain.html` (2026-07-08). Figma's code export dedups the repeated row instances, so rows were read from the table screenshot: a 9-title cycle (Wind in the Trees / On the Edge / Question Chain / Starting from Sensation / Metabolic Rift / Harmonic Overtones / Dash / Space Fold / Technique) repeated 6×, with Venue (3 placeholder heads "Ca' Corner della Regina"/"Lorem Ipsum"/"Dolor sit Amet" then a 4-cycle), Date (4-cycle), Producer (Fondazione Prada/Prada/Luna Rossa) cycled — matching the Figma's generated-filler pattern. Search filters across all 54 (verified 54→6 on "Space Fold", Clear restores).
- The search-toolbar + column-header row together form the Beat-4 sticky band (see scroll interaction above).

### Home content model (Phase 1 — authored `content/index.plain.html`, GATE 1 pending)
Authored 2026-07-08. Structure verified in preview (4 sections, all blocks decorate). Styling NOT started.

| Section | Block | Reuse | Content model |
|---------|-------|-------|---------------|
| 1 Hero | `hero` (`hero-cover` variant) | boilerplate `hero`, new variant | 2 cells: [picture] + [metadata `<p>` list (6 lines) → 2× `<h1>` display title]. Full-bleed cover. |
| 2 Index grid | `projects` | boilerplate `cards` **renamed → `grid` → `projects`** as-is | 12 rows, each [cover cell] + [title `<p>`, description `<p>`, type-tag `<p>`]. Cover cell = a picture OR author-typed text (→ typographic cover: black card, white display text). Decorates to `<ul>`/`<li>` (classes `projects-card-image`/`projects-card-body`; text cover adds `projects-card-cover`). |
| 3 Issue banner | `columns` + **dark section** | boilerplate `columns` + `Style: Dark` section metadata | 1 row, 2 cells: [2× `<h2>`, credits `<p>`, About CTA `<strong><a>`] + [picture]. Inverted CTA via dark-section rule. |
| 4 Search table | `project-table` (**NEW block**) | new — shared with Search page | Content = the 7 columns authored as a **single block-table** (each block row = a data row, cells = columns; first row = header labels) — **NOT** a nested HTML `<table>` (No-Nested-Tables Rule). JS builds the semantic `<table>`/`th`/`td`. The **search input + Clear button are injected by the block JS** (not authored) — see below. |

Notes:
- **Site nav is NOT page content** — the "Prada Index / Calendar / Projects / About" bar is the `header` block (from `/nav`), built in the later nav step, not authored into `index.plain.html`.
- **`projects`** = the boilerplate `cards` block, renamed 2026-07-08 to `grid`, then renamed 2026-07-09 to `projects` (dir/files/classes → `projects`, `projects-card-image`, `projects-card-body`). Entry/type-tag styling (grey tag, bold title) belongs to `projects` block styling in Phase 2.
- **`project-table`** = the boilerplate had no such block; created 2026-07-08 (was briefly `index-table`, renamed to `project-table`). **Search UI is functional + injected, not authored content:** `project-table.js` prepends a `.project-table-search` bar (an `<input type="search">` with placeholder "Search" + a "Clear" `<button>`) above the table, then live-filters data rows (`tr.hidden`) on input; Clear resets. Only the `<table>` is authored. Search bar styled to Figma (`1:13151`): bordered box `1px #707070`, 10px pad, uppercase 14px +1.4px tracking placeholder/clear, grey `#707070`. Verified functional in preview (10→1 rows on "Kojima", Clear restores). **Shared with the Search page** — reusable block, not Home-bespoke. Full editorial table styling comes in Phase 2.
- **Images extracted from Figma** into `content/media/` (PNG). Extracted per-node via `get_design_context` (image-fill URLs from the S3 export): 9 grid entry images (marie, metabolic, harmonic, technique, wind, sensation, jokes, monster, dontlooknow) + the Issue cover. All decode + render (verified ~662px, zero broken).
  - **Referenced site-root-absolute as `/media/<name>.<ext>`** (no hash suffix, no `content.da.live` host) — resolves in local preview and in production. Re-imported 2026-07-09 after the DA-hosted `content.da.live/gabrielwalt/pr/...` URLs went dead on reload (the `.plain.html` files had absolute DA blob URLs that no longer resolved → all images broke). The local `content/media/` files are the source of truth; keep image `src` as `/media/...`.
  - **3 grid entries have NO image — they are typographic covers** (black card, white 105px text): "The American Vernacular" (`1:13119`), "Cognitive Estrangement" (`1:13125`), "Two Poems" (`1:13137`). Modeled as image-less cards (empty image cell); the text-cover look is a Phase-2 `projects` variant drawn from the Entry Cover Templates set — do NOT fabricate images for these.
  - **Hero background** — `dt 1` (`1:13093`) is an image *fill* Figma's export won't surface. Supplied by the user via Dropbox URL → `content/media/hero-satellites.jpg` (2880×1440 JPEG). Renders full-bleed under the hero; verified loaded + legible.
  - **About issue cover** — also a Figma image fill not surfaced by export; supplied by the user via Dropbox URL → `content/media/issue.jpg` (871×871 JPEG). Used for all 4 issue cards on `/about`.
- Hero metadata rows + display title split follows the Figma frame (`1:13094` / `1:13096`).

### Shared-vs-bespoke determination (reuse across Page Template)
The scroll mechanic spans components that recur on the shared **Page Template** (Calendar/Projects/Search/About all wrap it), so decide per-primitive:
- **The shared site header/nav** (`1:1300`-style) is on every Page-Template screen → its `sticky; top:0` behavior is **shared** (belongs to the header block/nav, not Home). But the **reveal/eviction** of that nav (Beats 1 & 3) is driven by Home's specific hero→grid→dark stack; other screens likely just have a normal sticky nav with no hero-reveal. Confirm each screen against Figma before assuming.
- **The table header sticky** (Beat 4) recurs wherever the data table appears — Home bottom AND the Search page are the same `project-table` block. So `project-table` should carry its own `sticky` header (search bar + column-header row) **built into the block** (shared), not hardcoded in Home.
- **The hero-reveal + dark-eviction z-layer choreography** (Beats 1–3) is **bespoke to Home** — no other frame has the fixed-hero → rising-grid → rising-dark sequence. Keep it a Home-scoped controller.
- **NET:** build the sticky primitives INTO the reusable blocks (nav header, table) so Calendar/Projects/Search/About inherit them; keep the Home reveal choreography (fixed hero + z-layer eviction) as a Home-only treatment. **Verify the other frames' scroll behavior in Figma when those pages are built** — don't assume they replicate Home's reveals.

**Known gap (RESOLVED):** section styles now render — `decorateSections` patched (PROJECT-PLAN task #7 ✅). See `eds-section-metadata-decoration`.

## Frame → Page Mapping

| Frame | Node ID | EDS page path | Status |
|-------|---------|---------------|--------|
| Home | `1:13091` | `/` (index) | ✅ GATE 1 + GATE 2 (2026-07-08) |
| Calendar | `1:13698` | `/calendar` | ✅ content authored (`event-list`), GATE 1 pending |
| Projects | `1:13593` | `/projects` | ✅ content authored — **all 7 Project List Items** (Helter Skelter, Satellites II, The Island, 38th America's Cup, Cinema Godard, Dash, Chawan Cabinet), each = `project-header` + `projects` scroller. Full content re-extracted from Figma 2026-07-09 (was only the first 3). New entry images in `content/media/` (`island-filmstills`, `americascup-*`, `godard-*`, `dash-*`, `chawan-*`). Figma also has a decorative Search Bar at the page foot — NOT added (no data table to filter on this page; the functional search lives in `project-table` on Home/Search). GATE 1 pending |
| Project Detail | `14:10689` | `/projects/helter-skelter` | ✅ **full content re-imported 2026-07-09** from `14:11052` (was a simplified stub). Five sections per Figma: (1) `project-header` + **3-image overview row** + intro; (2) `event-list` (3 upcoming) + "View all events"; (3) **TOC index table** = `project-table` block, 7 rows (Project/Title/Type/Collaborator/Venue/Date/Producer) — the entry index; (4) **7 entry excerpts** (Wind in the Trees [2 portraits], The American Vernacular, Don't Look Now, Jokes, Monster/Mythic/Mystery, Artwork Images and Film Clips, Exhibition Images) — each a heading + byline + cover + real opening text + Read more (the Figma's per-entry "Continue Reading" fade → excerpt model); (5) `projects-search`. Entry text/images verbatim from Figma. New images `content/media/hs-*`. GATE 2 pending. |
| Slideshow | `1:14709` | `/slideshow` (entry viewer) | 🔲 |
| Search (state 1) | `1:13913` | `/search` | 🔲 |
| Search (state 2) | `1:13994` | `/search` (results/alt state) | 🔲 |
| About | `1:13576` | `/about` | ✅ content authored (title + intro + `contributors` + `projects`), GATE 1 pending |
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
