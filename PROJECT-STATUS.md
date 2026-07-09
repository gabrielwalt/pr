## Current Focus

- Branch: main
- Active task: Style validation (GATE 2) of Calendar / Projects / Project Detail — content model validated across all pages
- Last completed: **ALL pages GATE 1 (content) approved 2026-07-09** (user validated the content structure of every page). About also GATE 2 (frozen). All new blocks (`project-header`, `project-table`, `contributors`, `event-list`) styled; `project-table` refactored to a single block-table (No-Nested-Tables Rule).
- Next up: user style validation (GATE 2) for Calendar, Projects, Project Detail
- Blocker: DA library handoff steps are user-owned (checklist delivered, still pending)

## Pages

| Page | URL | Content ✓ | Style ✓ | Notes |
|---|---|---|---|---|
| Home | `/` | ✅ GATE 1 | ✅ GATE 2 | 4 sections: hero-cover, grid (12), columns+dark Issue banner, project-table. Nav = header block relocated into the grid sheet (native sticky choreography, all 4 beats). Spacing tokenized (`--space-*` scale). Nav aligned to the 4-col grid. Footer removed (none yet). GATE 2 approved 2026-07-08. |
| Calendar | `/calendar` | ✅ GATE 1 | 🔲 | Wraps shared `Page Template` (`1:13732`). `event-list` block styled (event rows: ribbon + 42px date/title + thumbnail; producer logos). 12 events. Content validated 2026-07-09; style GATE pending. |
| Projects | `/projects` | ✅ GATE 1 | 🔲 | Wraps shared `Page Template` (`1:13697`). `project-header` (per project) + `projects` scroller styled. Content validated 2026-07-09; style GATE pending. |
| Project Detail | `/projects/<slug>` | ✅ GATE 1 | 🔲 | Wraps shared `Page Template` (`14:11052`, very tall long-form entry). `project-header` + hero + `event-list` + long-form entries + `projects` — all render; every entry has a cover image. Content validated 2026-07-09; style GATE pending. |
| About | `/about` | ✅ GATE 1 | ✅ GATE 2 | Wraps shared `Page Template` (`1:13592`). `about` page template → 3-column layout for `contributors` (credits) + `projects` (4 issue covers). 80px h1, 32px lead paragraph. **Content + look validated 2026-07-09 — frozen.** |
