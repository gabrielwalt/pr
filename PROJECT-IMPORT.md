## Figma Source

**File:** `[INT] Prada Index Website Design (Copy)`
**File key:** `6WyrWzRXskdPTcPtQ296CQ`
**Base URL:** https://www.figma.com/design/6WyrWzRXskdPTcPtQ296CQ/-INT--Prada-Index-Website-Design--Copy-

All frames verified accessible 2026-07-08 (Figma MCP `get_metadata` + Home `get_screenshot`).
Note: this "Copy" file key supersedes the base file URL recorded in orientation (PROJECT-DESIGN.md #7 — `r3Na8h9qDALXzvTBZAbQGL`). Use the key below for all frame work.

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
