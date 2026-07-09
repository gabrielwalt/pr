## Current Focus

- Branch: main
- Active task: Styling the shared-template content pages (Calendar / Projects / Project Detail / About)
- Last completed: **About GATE 2 approved 2026-07-09** (content + look validated by user) — About is now frozen; `contributors`, `projects` (grid), `about` page template are the reuse baseline. All new blocks (`project-header`, `project-table`, `contributors`, `event-list`) now styled.
- Next up: validate the remaining pages (Calendar, Projects, Project Detail) — content + style GATE checks
- Blocker: DA library handoff steps are user-owned (checklist delivered, still pending)

## Pages

| Page | URL | Content ✓ | Style ✓ | Notes |
|---|---|---|---|---|
| Home | `/` | ✅ GATE 1 | ✅ GATE 2 | 4 sections: hero-cover, grid (12), columns+dark Issue banner, project-table. Nav = header block relocated into the grid sheet (native sticky choreography, all 4 beats). Spacing tokenized (`--space-*` scale). Nav aligned to the 4-col grid. Footer removed (none yet). GATE 2 approved 2026-07-08. |
| Calendar | `/calendar` | 🔲 | 🔲 | Wraps shared `Page Template` (`1:13732`). `event-list` block authored + styled (event rows: ribbon + 42px date/title + thumbnail; producer logos). Awaiting validation. |
| Projects | `/projects` | 🔲 | 🔲 | Wraps shared `Page Template` (`1:13697`). `project-header` (per project) + `projects` scroller authored + styled. Awaiting validation. |
| Project Detail | `/projects/<slug>` | 🔲 | 🔲 | Wraps shared `Page Template` (`14:11052`, very tall long-form entry). Combines `project-header` + hero + `event-list` + long-form entries + `projects` — all styled; not yet reviewed end-to-end. |
| About | `/about` | ✅ GATE 1 | ✅ GATE 2 | Wraps shared `Page Template` (`1:13592`). `about` page template → 3-column layout for `contributors` (credits) + `projects` (4 issue covers). 80px h1, 32px lead paragraph. **Content + look validated 2026-07-09 — frozen.** |
