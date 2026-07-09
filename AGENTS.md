# AGENTS.md

## Rules

**Simplicity is the ultimate sophistication.** Every line of code and every visual effect must earn its place. No unnecessary abstractions, no gratuitous animations, no layers of indirection. When in doubt, do less.

**Keep the PROJECT files current.** Any meaningful change — block, variant, token, page — updates the relevant file immediately. Don't defer. Project details live in the `PROJECT-*.md` files.

**Be conversational — draw out context and ask questions.** Don't work in silence or guess at intent. Actively invite the user to share the *why* behind a request — the goal, the constraint, the brand or editorial reasoning — since that context usually changes the best answer. When a request is ambiguous, has more than one reasonable interpretation, or touches a design decision, ask before acting rather than assuming. Offer options and trade-offs, think out loud, and end replies with a concrete follow-up question so the collaboration keeps moving. A short clarifying exchange up front beats a confident wrong turn.

---

## The Augmented-Styles Model

Every styling decision on this site lands in one of four places. Choosing the right one — and preferring the lightest that works — is how the site stays author-friendly and regression-proof. Ordered from lightest to heaviest; reach for the heaviest only when the lighter ones genuinely can't express the need.

1. **Block** — a reusable component with its own folder `blocks/<name>/<name>.js` + `<name>.css`. The author inserts it by naming it in the first cell of a block table; EDS decorates `<div class="<name>">` inside `…-wrapper` inside `.section`. A block *is* a table: each row is a record, each cell a field. Create a new block only for a genuinely new component.
2. **Variant** — a modifier class on an existing block, authored as extra words in the block name (e.g. `project-table (search)` → `<div class="project-table search">`). The block's JS/CSS branch on `block.classList.contains('…')`. Use a variant when a block needs a second look/behavior but the same content model — e.g. the `project-table` `search` variant adds a filter bar; the base variant is a plain table of contents.
3. **Section style** — a look applied to a whole section via **Section Metadata** `Style: <Name>` (comma-separate to combine, e.g. `Narrow, Expandable`). EDS's `decorateSections` maps each to a `.section.<toClassName(name)>` class; combined styles stack. Section CSS lives in `styles/styles.css` (generic, reusable across pages) and JS enhancements in `scripts/` (e.g. `scripts/expandable.js` injects the Read-more toggle for `.section.expandable`). Use a section style when the treatment spans the section's content rather than one block — e.g. `Dark`, `Narrow` (reading-measure column), `Expandable` (fold-with-toggle).
4. **Page template** — a page-wide look, authored via a `metadata` block with `template: <name>` at the end of the page. EDS's `decorateTemplateAndTheme` maps it to `body.<name>`; template CSS lives in `styles/styles.css` scoped to that body class. Use a template when the page composes default content and blocks in a bespoke way — e.g. `template-project-detail` owns the long-form entry styling. Be conservative: a template is the heaviest tool.

Authoring→CSS wiring at a glance: block name → `.<block>`; extra name words → variant classes; `Style:` metadata → `.section.<style>`; `template:` metadata → `body.<template>`. **Read the code for the exact selectors and token values — never copy them into the PROJECT-* docs.** `PROJECT-DESIGN.md` holds the full inventory — blocks, variants, section styles, and page templates.

**Never nest tables.** An EDS block IS a table — the author builds it as rows × cells. So **never author an HTML `<table>` (or nest another block/grid) inside a block cell** — a table-in-a-table is miserable to author and is prohibited. For tabular data, make the block itself the table: each block row = one data row, each cell = one column, header labels as the first row; the block JS builds the semantic `<table>`/`<th>`/`<td>`. The only exception is a deliberate container block.

**Style additively.** Blocks, variants, section styles, and `styles.css` tokens are shared across every page. Editing an existing shared tool shifts pages that were already signed off. So: to change how something looks on a *new* page, prefer adding a new variant or section style over modifying a shared one. If you genuinely must change a shared tool, first find every page that uses it and confirm the change is safe on all of them — then re-check those pages in the preview after the change.

---

## Verify Against the Render

Type-checking and a green build prove code *correctness*, not visual *correctness*. Before you claim a styling or layout task is done, look at the actual rendered page — not just the source you wrote.

- **Inspect the live render, not the markup.** Use the preview to confirm the change landed: check the DOM structure and read *computed* styles (widths, colors, spacing, positions) on the real elements. A selector that looks right can silently fail to match (wrong nesting, specificity, a `-wrapper` you forgot) — the computed style is the truth.
- **Measure, don't guess.** When matching a dimension, color, or spacing, read the real value off the rendered element or the Figma frame rather than writing a number from memory. Prefer existing design tokens over hard-coded values.
- **Check the whole picture, not just the happy path.** Confirm the change across the states and breakpoints it touches (collapsed/expanded, hover/focus, mobile/desktop) and glance at neighboring pages that share the same tool to catch regressions.
- **Prefer lightweight inspection.** Reading the DOM and computed styles is cheap and precise; reserve full screenshots for when pixel-level visual confirmation is genuinely needed.
- Only after the rendered result meets each success criterion do you write "done".

---

## Project Files

**`PROJECT-DESIGN.md`** is the project's shared memory — the design system: tokens, type, color, spacing, the page frame, the block/variant/section-style inventory, page templates, the component library, and the Home scroll interaction. Read it at the start of a session and update it whenever any of that changes. It records *intent* and non-obvious gotchas; **code is truth** for the exact implementation.
