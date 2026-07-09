## Current Focus

- Branch: main
- Active task: Project Detail content review; **shared nav given the two-segment top rule (Figma 1:13100) — applies to ALL pages** (user-requested)
- Last completed: nav top-rule (`.nav-menu` wrapper + border-top on brand & menu) 2026-07-09; Project Detail content re-imported.
- Next up: user re-validates the nav change on the 4 frozen pages (Home/About/Calendar/Projects — 🔓 unfrozen for this shared-header edit), then Project Detail GATE 2.
- Blocker: DA library handoff steps are user-owned (checklist delivered, still pending)

## Pages

| Page | URL | Content ✓ | Style ✓ | Notes |
|---|---|---|---|---|
| Home | `/` | ✅ GATE 1 | ✅ 🔓 | GATE 2 approved 2026-07-08. **🔓 Unfrozen 2026-07-09 for the shared nav two-segment top-rule change (Figma 1:13100) — re-validate the nav, then re-freeze.** 4 sections: hero-cover, grid (12), columns+dark Issue banner, project-table. Nav relocated into the grid sheet (native sticky choreography). |
| Calendar | `/calendar` | ✅ GATE 1 | ✅ 🔓 | Frozen 2026-07-09; **🔓 unfrozen for the shared nav top-rule change — re-validate + re-freeze.** `event-list` styled (thumbnail on the title's line; producer logos). |
| Projects | `/projects` | ✅ GATE 1 | ✅ 🔓 | Frozen 2026-07-09; **🔓 unfrozen for the shared nav top-rule change — re-validate + re-freeze.** All 7 projects + functional `projects-search`. |
| Project Detail | `/projects/<slug>` | ✅ GATE 1 | 🔲 | Wraps shared `Page Template` (`14:11052`). Full content (Figma `14:10689`) + **all default-content styled 2026-07-09** (overview 3-image row + 32px lead; entry excerpts: 42px titles, grey bylines, centered capped covers, 700px reading-measure body, centered bordered Read-more) — scoped to `body.template-project-detail`, additive. Page blocks (project-header/event-list/project-table/projects-search) already styled. Awaiting user GATE 2. |
| About | `/about` | ✅ GATE 1 | ✅ 🔓 | Frozen 2026-07-09; **🔓 unfrozen for the shared nav top-rule change — re-validate + re-freeze.** `template-about` → 3-column layout; 80px h1, 32px lead. |
