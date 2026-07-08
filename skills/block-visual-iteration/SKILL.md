---
name: block-visual-iteration
description: Block is content-validated (GATE 1 passed) and the task is precise pixel-match delta closure against the original site — not for ad-hoc styling, iteration, or critique
---

When asked to visually improve a block, follow this recipe instead of ad-hoc screenshot comparisons.

## Step 0 — Run `excat-visual-critique` FIRST (don't eyeball the deltas)
**Before measuring anything by hand, launch the native `excat-visual-critique` skill** — it's the project's primary delta-discovery engine and you should reach for it aggressively, on *every* block/section/page/site styling task, not just when the user says "critique". It does deterministic, extraction-based comparison (exact CSS/structural/content/interaction diffs + a weighted similarity %) far more thoroughly than a hand-built diff, and in **site mode it parallelizes sub-agents per template**. Trigger it by mode:

| You're styling… | Invoke critique in | 
|------|------|
| one block | **Block mode** (`blockName`, optional `page`) |
| a section the user selected | **Section mode** (`element_context`) |
| a whole page | **Page mode** (`originalUrl` + `migratedPath`) |
| the whole site / many pages | **Site mode** (parallel per-template sub-agents) |

Critique **detects and reports** (it never writes CSS itself) — its similarity % and categorized diff list become the worklist this measure-first loop then closes precisely. Let critique own *discovery*; this skill owns *the fix*. Prerequisite: import + `brand.css` exist (critique will tell you if not). Skip Step 0 only for a brand-new block that has no original to compare against.

## Recipe (close each delta critique surfaced)

### 1. Measure original (programmatic, not screenshot)
Follow `measure-then-implement` for all values before implementing any fix — never guess a px value or color. Use `evaluate` to extract computed styles from every element in the original block:
```js
// For each element: fontSize, fontWeight, lineHeight, letterSpacing, textTransform,
// color, backgroundColor, padding, margin, gap, borderRadius, width, height, position
```
Record the **section header** (eyebrow + heading) AND the **block content** separately.

### 2. Measure ours the same way
Same evaluate script on `localhost:3000`. Use `setTimeout` (3s) to wait for block JS decoration.

### 3. Produce a comparison table
Create a property-by-property diff table. Flag any value that differs. This is more reliable than visual comparison for catching letter-spacing, line-height, and margin differences that screenshots don't reveal.

### 4. Fix all differences in one batch
Apply CSS changes for ALL flagged properties at once, not one at a time.

### 5. Re-measure and verify
Run step 2 again. Confirm all values match. Only THEN take a screenshot for final visual confirmation. Screenshots are expensive (20-50k tokens) and imprecise; computed-style extraction is cheap (~2k) and exact — use screenshots for final confirmation only, never discovery.

### 6. Verify across every real variant, and the edge cases (ephemeral)
A look-improvement on one instance isn't done until it holds everywhere: re-render **every real variant** on the block's `component-library` page (if the library exists) and confirm the fix holds across all of them — a fix for one variant must not break another. Then spot-check the meaningful content edge cases (no-image, long-copy, 0/1/2-CTA where applicable) in a **scratch render, not a committed page** — the library only ever keeps the one clean instance per real variant (`component-library`).

## Pitfalls
- Don't compare active/hover states unless you trigger them first on both sites
- Section header styles come from the section's `.default-content-wrapper`, not the block itself — measure both
- Body-level inherited properties (font-weight, letter-spacing) affect all blocks — check global styles too
- When fixing one element, verify you didn't regress adjacent elements (load `regression-guard`)
- Improving a block's look on ONE instance and stopping — re-render every real variant on its library page; a fix for one must not break another

See also: `excat-visual-critique` (**run it first, Step 0** — the extraction-based v2 critique is the delta-discovery engine; block/section/page/site modes, site mode runs parallel per-template sub-agents, reports a weighted similarity % + categorized diffs but never writes CSS), `measure-then-implement` (how to extract values + responsive verification), `regression-guard` (full regression protocol), `component-library` (verify across every real variant, not one instance; edge-case testing is ephemeral, never committed to the library), `executing-plan-tasks` (Gap vs Enhancement verification). Division of labor: **critique discovers + scores the gaps; this loop closes them precisely.** Native `excat-visual-critique` covers the same ground at a generic level — this skill adds the `evaluate`-based measure-then-diff-table loop and the Step 0 / Step 1–5 fix discipline that closes each gap critique surfaces.
