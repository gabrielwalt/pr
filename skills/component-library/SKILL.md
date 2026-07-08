---
name: component-library
description: Build and maintain ONE consolidated component library — a set of real EDS content pages under content/library/ that (1) showcase default-content typography/spacing, (2) hold one clean demo instance per block × real variant, and (3) wire that same content into the author-facing insertion palette (DA Library panel / UE component definition). This single artifact is the GATE-2 diff target, the reuse census, and the design-system reference — there is no separate "styleguide" system. Use when the foundation is set and you want a living reference, after validating a new block/variant/section-style, or when wiring up the author's block-insertion palette.
---

**There is one library, not two systems.** Earlier project generations kept a developer-facing "styleguide" and an author-facing "block library" as separate trees maintained in lockstep. That split is retired here: `content/library/` is the single, consolidated artifact that does all three jobs — design-system showcase, GATE-2 diff target, and the author's insertable palette. One skill, one tree, one PROJECT-file record.

**Why it isn't literally one page per block with every edge case crammed in.** DA's Library panel auto-derives an author-facing "variant" from **every block instance on the page it's pointed at** (named by the preceding heading, else the CSS class). If a block's library page carried multiple edge-case instances (no-image, long-copy, 0/1/2-CTA), each would surface to the author as a bogus insertable variant. So the one rule that survives the consolidation: **a block's library page holds exactly one clean instance per *real* variant — nothing else.** Edge-case/overflow verification still happens (it's how you know a block is robust) but it happens **ephemerally** during `block-visual-iteration` — a temporary render, not a permanent page — never as extra instances on the library page. This is a technical constraint of the authoring tool, not a stylistic choice; don't reintroduce a second exhaustive tree to work around it.

**The Library-Mirrors-Inventory Rule.** The library must always match `PROJECT-BLOCKS.md`. Update it in the **same step** a block/variant/section-style is validated (spot-and-act; re-checked at `session-close`). A library missing the newest variant gives false confidence to both the author panel and GATE-2.

**The Library-Never-Freezes Rule.** The library is the project's **cumulative, ever-growing collection** — so it is **NEVER frozen and NEVER locked**, even when every page that uses its blocks is frozen. The Frozen-Tools Rule and `unfreeze-page` govern *migration/build pages*; the library's own content is exempt because its job is to keep accreting. Adding a page or a variant instance to the library is always allowed without an unfreeze step. Editing a *block's shared CSS/JS* is still governed by the Frozen-Tools Rule (a shared tool can shift a frozen page) — only the library's own pages are freeze-exempt.

Opt-in per project: `migration-orientation` asks whether to maintain the library and records it in `PROJECT-DESIGN.md`. Default **yes** — low cost, high payoff for verification, reuse, and author onboarding; skip only for a one-page throwaway. Scaffold it right after `global-style-foundation` (before the first page/frame is built) with default-content + the blocks the first page needs; grow it as blocks are built. **With no pre-existing blocks, the author-facing wiring (DA config row / UE component definition) is set up in the same pass.**

## What the library contains

Author under `content/library/` — net-new authored pages (not derived from the source), the one content this project writes directly. Keep it **out of site nav/sitemap** (internal reference). Use representative sample copy, never `lorem`.

| Page | Renders | Feeds the author panel? |
|------|---------|--------------------------|
| `/library` (index) | Overview + links to every page; a legend of all CTA/button forms | No |
| `/library/default-content` | Every semantic element: `h1`–`h6`, paragraph, lead, `ul`/`ol`, blockquote, inline (link/bold/italic/code), table, image, eyebrow, button/CTA variants — the design-system showcase of global type + spacing | No |
| `/library/sections` | Each section style applied to the same sample content, so styles compare side by side | No |
| `/library/blocks/<block>` | **One page per block, ONE clean instance per real variant** — no story headings, no edge cases | **Yes — this exact page is what `block-library.json` / the component definition points at** |

- **Generate from the inventory:** read `PROJECT-BLOCKS.md` (blocks, variants, section styles) + `blocks/` + page templates. One page per block keeps it scannable and lets a critique/diff target a single block.
- **Build from real blocks/content**, not hand-written classes — the pipeline strips authored classes, and only real decoration is a faithful reference.
- **Use it:** GATE-2 diffs a block's library page against the source; orientation/foundation stages point the user at it ("nothing renders yet, but review `/library/default-content`"); `block-visual-iteration` verifies a look-change against it; teammate/author onboarding.

## Verifying edge cases without polluting the library (ephemeral testing)
A block isn't done until it survives its meaningful content edge cases — but those renders are **temporary**, not committed to `/library/blocks/<block>`:
- **Optional content present vs absent** — with / without image, eyebrow, description.
- **Media type** — image vs video, where the block accepts media.
- **Count that shifts layout** — 0 / 1 / 2 / many of a repeating element; cover the boundaries that re-flow.
- **Content extremes** — long heading / long copy (wrap + overflow) and the short case.
- **Each variant**, and **each section-style context** the block sits in (especially dark/inverse).

Render these in a scratch page or the dev server directly (see `block-visual-iteration`), confirm, then discard — the library page keeps only the one clean canonical instance per real variant.

## DA (da.live) — wiring the library into the Library panel

DA's editor has a built-in **Library panel** with four OOTB categories: `blocks`, `templates`, `icons`, `placeholders` (+ `aem-assets` if configured). Two surfaces, with **different owners**:

**A. The `library` config sheet — USER-OWNED, agent can't write it.** The user edits it in the **DA config editor UI at `https://da.live/config#/{org}/{site}/`** (NOT `admin.da.live/config/...` — that's the API the agent gets 401 on; the `#` editor URL is what the user opens). The config is a **workbook of named sheets**; the panel reads the sheet **named `library`** via `getSheetByName(config, 'library')`. **A fresh config has only a `data` sheet (key/value config entries) — that is the WRONG sheet.** The user must **Add sheet → name it `library`**. In that sheet, **row 1 = column headers, row 2+ = entries.** Verified column schema (from da-live source, `da-library/helpers/helpers.js`):

| Column | Meaning |
|--------|---------|
| `title` | Display name AND plugin identity — lowercased+hyphenated to match an OOTB name. For the blocks plugin it MUST be `Blocks`. Any other title = a custom plugin. |
| `path` | Comma-separated source path(s). Relative `/…` resolves to `https://{ref}--{repo}--{org}.aem.live{path}` (or `http://localhost:3000{path}` when `ref=local`). |
| `ref` | Branch gate — `main` (always shown), `local`, or a branch name. Default `main`. |
| `experience` | OOTB plugins ignore it; custom plugins default `inline`. |
| `format` | Optional, icons/placeholders only. |
| `icon` | Custom plugins only. |

There is **no `name` column**. The minimum row is `title` + `path` (+ `ref`). Don't put the row in the `data` sheet.

**B. The blocks-list source + library pages — AGENT-OWNED, in the code repo.** The `path` points at a JSON list of blocks the agent maintains in-repo (e.g. `/block-library.json`, served at the site root). Shape: a sheet whose rows are **`name` (author-facing label) + `path` (the block's `/library/blocks/<block>` page)**.

- **⚠ The `path` MUST be an ABSOLUTE aem URL, not root-relative** — `https://main--<site>--<owner>.aem.live/library/blocks/<block>` (NO `.plain.html` — DA appends it). A relative path makes DA's `isAemHosted()` throw (no origin) → it resolves against `da.live` instead → 404. **Symptom: the blocks list populates but every block unfolds EMPTY.**
- **Variants are auto-derived by parsing the page's `.plain.html`: EVERY block instance becomes one author variant** — this is exactly why the library page must hold only the real, clean set (see the constraint at the top).
- **⚠ THE BLOCKER (verified the hard way): `content/**.plain.html` is NOT served from the code repo — it lives in DA.** `fstab.yaml` mounts `/` → `content.da.live/{org}/{site}/`, so code-repo files serve (`/block-library.json`, `/tools/sidekick/library.json`, `/scripts/*` → 200) but `content/library/blocks/*.plain.html` **404 until pushed into DA and published** — committing them to git alone does nothing. A locally-created page exists only in the working copy.

## UE / CrossWalk — the component-definition JSON trio

There is **no demo-doc library**; the author's palette IS three JSON files (a fixed contract, no custom markup):

| File | Role | Key shape |
|------|------|-----------|
| `component-definition.json` | **Palette** — which blocks an author can add | entry: `title`, `id`, `plugins.xwalk.page` (`resourceType: core/franklin/components/block/v1/block`, `template.name`, `template.model`) |
| `component-models.json` | **Editable fields** per block | `id` + `fields[]` (each `component` e.g. `text`/`richtext`/`reference`/`select`, with `name`/`label`/`valueType`) |
| `component-filters.json` | **Containment** — which components allowed in which container/section | `filterId` → allowed children |

- **Variants** are usually `classes_*` options on the model (`classes_background`, `classes_fullwidth`), NOT new palette components.
- **Field conventions:** *field collapse* (`image` + `imageAlt` → one picture via suffix), *element grouping* (`teaserText_title` concatenates semantic elements into one cell).
- These root files are commonly assembled from per-block partials via the xwalk build tooling — load `excat-xwalk-expert` for the JCR/JSON mechanics and the exact build command.

## Recipe
1. Detect the authoring model (`PROJECT-DESIGN.md` #1 — DA vs UE).
2. **First time:** scaffold `/library` (index) + `/library/default-content` + `/library/blocks/<block>` for whatever blocks the first page needs. **DA:** also create the in-repo blocks-list JSON at the site root (`name` + absolute `path` per block). **UE:** create the three JSON files.
3. **New block validated** → add its `/library/blocks/<block>` page (one clean instance) + (DA) a JSON row / (UE) an entry across all three JSON files.
4. **New variant validated** → add ONE clean instance of it to that block's library page, named by CSS class (`teaser` + `teaser-dark`); (UE) add a `classes_*` option to the model, not a new component.
5. **New section style validated** → add it to `/library/sections`.
6. Keep the set CLEAN — never push default content, section-style comparisons, or edge-case stories into a block's library page.
7. Record the library location/config + the user handoff step in `PROJECT-IMPORT.md` so the next session finds it.
8. **On first creation, hand the user clear step-by-step instructions** (the Library-Handoff Rule below). Don't leave the last mile to a non-expert.

## The Library-Handoff Rule — guide the user through the parts the agent can't do

**When the library is freshly created, end by giving the user explicit, ordered, copy-pasteable instructions for the steps only they can perform.** The agent owns the in-repo artifacts (library pages + blocks-list JSON / the UE JSON trio); the user owns publishing and the two pieces of configuration below.

For a **DA** project, give all four parts, in order — **parts 1–3 are REQUIRED for the author panel to show anything; part 4 is the separate EMA reuse setup:**

1. **Get the library pages INTO DA, then publish.** `/block-library.json` serves from the code repo once committed, but `content/library/blocks/*` pages do NOT (they live in DA). The user must bring those pages into DA (the EMA console **Upload** button, or author/paste in da.live at `/library/blocks/*`, or the DA source API) and then **Preview + Publish** both the JSON and every page. Until then every block shows zero variants and the Blocks list renders empty.
2. **⚠ Add a CORS response header — the non-obvious blocker that makes the panel work.** da.live (origin `https://da.live`) fetches the manifest + library pages **cross-origin** from the published site. EDS sends no `Access-Control-Allow-Origin` by default, so the browser blocks the read → the Blocks plugin appears but its list is empty (console: `blocked by CORS policy`). **Fix (user-only, auth-gated):** `https://tools.aem.live/tools/headers-edit/` → enter Organization + Site → Fetch (a 404 here is expected) → keep Path `/**` → Add Header: name `access-control-allow-origin`, value `*` → Save. Verify: `curl -I https://main--<site>--<owner>.aem.live/block-library.json | grep -i access-control`.
3. **Add the DA config row** (the agent can't — config write is auth-gated). Walk the user through: open `https://da.live/config#/{org}/{site}/` → **Add sheet**, name it `library` → row 1 headers, row 2 entry: `title`=`Blocks`, `path`=`/block-library.json`, `ref`=`main` → Save. Spell out exact cells (A1=`title`, B1=`path`, C1=`ref`; A2=`Blocks`, B2=`/block-library.json`, C2=`main`). If it doesn't update after reload, the manifest is cached (`max-age=7200`) — open the manifest URL directly and Shift+Reload it, then reload the editor.
4. **Set the EMA "Library url" in Settings — a SEPARATE mechanism, read by the agent, not the DA panel.** Console **Settings → Project → "Library url"**. The excatops MCP fetches it for block discovery (`get_library_catalog`, `search_blocks`, `get_block_details`) and reuse (`get_vanilla_block_code`). Format: a **published** `https://<ref>--<repo>--<owner>.aem.page/tools/sidekick/library.json`, top-level `{ "data": [ … ] }`, each entry `name`+`path`. It usually points at a shared boilerplate library by default — only build this project's own `tools/sidekick/library.json` if the user wants THIS project's blocks as the reuse source (reuse the same `content/library/blocks/*` pages, adding a `library-metadata` div per real variant so `parseLibraryMetadata` names each one).

For a **UE/CrossWalk** project: commit + deploy the JSON trio, and (if applicable) set the same EMA Library url; defer JCR/build specifics to `excat-xwalk-expert`.

Present the handoff as a short numbered checklist and confirm what success looks like (blocks appearing in the editor's Library panel).

## Pitfalls
- **Reviving the old split** — building a separate exhaustive "styleguide" tree alongside the library. There is one tree now; edge-case verification is ephemeral (see above), not a second permanent page set.
- **DA: pointing the blocks-list JSON at a page with more than one instance per variant** — every instance becomes an author-facing variant; an edge case rendered on the canonical page leaks as a bogus insertable option.
- **DA: trying to create/write the `library` config row yourself** — auth-gated, user-owned. Hand them the exact row.
- **DA: giving the user `admin.da.live/config/...`** — that's the API (401s). The editor is `https://da.live/config#/{org}/{site}/`.
- **DA: telling the user to add the row to the `data` sheet** — must be a dedicated sheet named `library`.
- **DA: using a `name` column** — doesn't exist; columns are `title`/`path`/`ref`/`experience`/`format`/`icon`.
- DA: a relative `path` in the blocks-list JSON — must be absolute; relative → wrong host → empty unfolds.
- DA: claiming the library works without **publishing** the content first — the panel fetches the published source.
- **DA: assuming `content/library/**` pages serve because they're committed to git — they don't.** They live in DA; verify with `curl https://main--<repo>--<owner>.aem.live/library/blocks/<x>.plain.html` → must be 200.
- **DA empty-panel triage:** list empty (no names at all) = manifest didn't load (CORS, or URL/schema wrong). List populates but unfolds empty = variant fetch failed (relative path, or unpublished page) — these are separate fetches with separate causes.
- **Cache after a fix:** a plain editor reload is often not enough (`max-age=7200`) — hard-reload the manifest URL directly first, then reload the editor.
- UE: adding a palette entry in `component-definition.json` but forgetting `component-models.json` fields or `component-filters.json` placement.
- UE: minting a new component for what is really a variant — use `classes_*` on the existing model.
- **Building the library and stopping** without handing the user the publish + DA-config + EMA Settings steps (the Library-Handoff Rule).
- **Conflating the EMA "Library url" with the DA Library panel** — two mechanisms, different path + schema. Don't paste the DA blocks-list URL into the EMA field.
- Drift from `PROJECT-BLOCKS.md` → false confidence at GATE-2 and in the author panel. Update in lockstep, not "later".
- `lorem`/`TODO` placeholder → trips `detect.mjs` `craft-cruft-placeholder`; use realistic sample copy.

See also: `migration-orientation` (asks the library opt-in + the existing-blocks/reuse bar), `global-style-foundation` (the foundation it showcases; scaffold the library right after), `eds-content-modeling` (the block/variant/section-style taxonomy it enumerates), `block-visual-iteration` (ephemeral edge-case verification; confirm a look-change across every real variant), `validation-gates` (GATE-2 diffs against it), `eds-migration-process` (template composition = library as block census), `excat-xwalk-expert` (UE component definition mechanics), `session-close` (the sync check that catches library drift), `excat-ui-tour` (where the EMA Settings → Project → Library url field lives).
