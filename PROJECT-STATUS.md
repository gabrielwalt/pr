## Current Focus

- Branch: main
- Active task: Importing the 4 shared-template content pages (Calendar / Projects / Project Detail / About) — Phase 1 content, stopping at GATE 1
- Last completed: **Home GATE 2 approved 2026-07-08** (design validated by user) — Home is now frozen; blocks/variants/section-styles/tokens are the reuse baseline
- Next up: model + author each of the 4 pages' `.plain.html` from their Figma frames (all wrap the shared `Page Template`), then GATE 1
- Blocker: DA library handoff steps are user-owned (checklist delivered, still pending)

## Pages

| Page | URL | Content ✓ | Style ✓ | Notes |
|---|---|---|---|---|
| Home | `/` | ✅ GATE 1 | ✅ GATE 2 | 4 sections: hero-cover, grid (12), columns+dark Issue banner, project-table. Nav = header block relocated into the grid sheet (native sticky choreography, all 4 beats). Spacing tokenized (`--space-*` scale). Nav aligned to the 4-col grid. Footer removed (none yet). GATE 2 approved 2026-07-08. |
| Calendar | `/calendar` | 🔲 | 🔲 | Wraps shared `Page Template` (`1:13732`). Phase 1 pending. |
| Projects | `/projects` | 🔲 | 🔲 | Wraps shared `Page Template` (`1:13697`). Phase 1 pending. |
| Project Detail | `/projects/<slug>` | 🔲 | 🔲 | Wraps shared `Page Template` (`14:11052`, very tall long-form entry). Phase 1 pending. |
| About | `/about` | 🔲 | 🔲 | Wraps shared `Page Template` (`1:13592`). Phase 1 pending. |
