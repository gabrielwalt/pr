## Environment

- **Preview server:** `aem up` (Franklin/EDS local dev) on port 3000, launched by a supervisor (`/app/dist/server.js`, PID 1) with `--html-folder content --prefer-plain-html`. Serves local `content/` and proxies missing files from `https://main--pr--gabrielwalt.aem.page` (repo `github.com/gabrielwalt/pr`). `/workspace/current` symlinks to this repo (`/backups/gabrielwalt/pr/repo`). No `fstab.yaml` in the repo — the proxy origin is derived from the git remote, not fstab. If the preview shows the wrong project, the server is running from a stale/deleted cwd (happened 2026-07-08: it was still bound to the previous `semrush3` project after project switch) — restart with `aem up` from this repo dir. Verified working 2026-07-08.
- **Figma source file key: `6WyrWzRXskdPTcPtQ296CQ`** — the working `[INT] Prada Index Website Design (Copy)` file. All frame node IDs in `PROJECT-IMPORT.md` are keyed to this file. Supersedes the base-file URL (`r3Na8h9qDALXzvTBZAbQGL`) recorded in orientation (PROJECT-DESIGN.md #7); use the Copy key for all frame work. Verified accessible via Figma MCP 2026-07-08.

## Constraints

*[Agent: record constraints here as they surface.]*

## Brand

- **Prada Index** — an editorial "record of culture" site (Issue 1, Fall 2026). Monochrome editorial aesthetic: black/white with grey neutrals, **Univers** typeface throughout, large display headings, dense data tables, and image-led index card grids. Design is intentionally austere and print-like.

## Stakeholders

*[Agent: record stakeholders here as they surface.]*

## Decisions

- **Home hero pin = `position: sticky`, not `fixed`.** The Home scroll mechanic covers the hero entirely with the rising white grid sheet, so whether the hero stays pinned underneath or scrolls away is visually indistinguishable. User (gabrielwalt, 2026-07-08) left the choice to whatever is cleanest/most performant → **sticky**: hero stays in normal flow (no spacer), pins at `top:0`, covered by higher-z sheet, pure-CSS release (no scroll listener). Full four-beat scroll spec in [[PROJECT-IMPORT]] Home analysis.
- **Typeface: Univers → Univers Next Pro via Adobe Fonts (Typekit).** The Figma design uses "Univers" (a licensed Linotype face); the current digital release is **Univers Next Pro** (Monotype), treated as equivalent for this build. Sourced from the user's Adobe Fonts web project — kit `lnd2jia`, CSS `https://use.typekit.net/lnd2jia.css`, family `univers-next-pro`. Weights available: 200/300/400/400i/500/500i/600/600i/700. Design uses **400 (Regular)** for body/nav/metadata and **700 (Bold)** for display headings + entry titles; no italics, no condensed/extended widths. Decided 2026-07-08 (gabrielwalt).
