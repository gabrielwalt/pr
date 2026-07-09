---
name: css-pitfalls-eds
description: Common EDS CSS gotchas with fixes. Load when: fixing a stylelint no-descending-specificity error; a background image suddenly renders at native size after shorthand consolidation; `position: sticky` breaks due to an ancestor `overflow: hidden`; a `backdrop-filter` glass effect is invisible or corners bleed; one grid's columns won't line up with another grid's (unequal tracks / nav-to-content-grid alignment).
---

## Descending specificity (stylelint no-descending-specificity)

Fix by reordering or merging properties into base selectors.

### Recipe
**Problem:** base selector after compound selector
```css
.card-expanded .desc { opacity: 1; }   /* high specificity first */
.desc { opacity: 0; transition: ...; } /* lower after — ERROR */
```
**Fix:** put base first, override after
```css
.desc { opacity: 0; transition: ...; }           /* base first */
.card-expanded .desc { opacity: 1; }             /* override after — OK */
```

**Problem:** second `.cta` rule after `.cta:hover`
**Fix:** merge all base properties into the first `.cta` block — don't create a second one

**Problem:** a NEW scoped rule you just added (e.g. `body.template-A main .section.foo .default-content-wrapper`) trips the error on PRE-EXISTING, lower-specificity rules later in the file that end in the same element (`body.template-B main .x > .default-content-wrapper`). The two scopes are mutually exclusive (different templates) so they never actually collide — but the linter only sees the shared trailing element. Reordering is unnatural here (you'd scatter one feature's rules across the file).
**Fix:** LOWER your new rule's specificity so it no longer outranks the later ones. Often you can drop the trailing shared class and rely on inheritance — e.g. set `text-align: center` on `.section.foo` (inherits down to the default-content) instead of targeting `…foo .default-content-wrapper`. Same visual result, no descending-specificity conflict.

### Pitfalls
- The rule checks if a selector COULD target the same element, not if it actually does — so unrelated template scopes that share a trailing class (`.default-content-wrapper`, `.button`) still conflict
- `!important` doesn't fix it — the rule checks selector specificity, not cascade
- Moving rules into `@media` blocks doesn't help
- Prefer lowering specificity (inheritance) over a `stylelint-disable` wrap — the disable silences the rule but leaves the real cascade fragility

---

## Background shorthand resets background-size

The `background` shorthand resets every sub-property it doesn't name. Folding `background-color/image/position/size/repeat` into one `background:` line silently sets `background-size: auto` — a tile that was scaled to fit (e.g. `21px 100%`) reverts to native pixels and renders huge.

### Recipe
- Keep size in the shorthand with the `position / size` syntax: `background: <color> url(...) <pos> / <size> <repeat>;`
- Example (tile scaled to fill element height, tiled horizontally): `background: var(--token) url(...) 0 100% / 5px 100% repeat-x;`
- The size is `<width> <height>`: pick the width to control how coarse the horizontal tiling looks (NOT the tile's native px width — that's usually too coarse), and `100%` for the height to fill the element regardless of its height.
- After consolidating, verify the computed value, not the source: `getComputedStyle(el).backgroundSize` must NOT be `auto` if you intended scaling.

### Pitfalls
- Shorthand without `/ size` → `background-size: auto` → native-resolution tile, often a magnified sliver. The image looks "broken" or "too large".
- The `/` size must come immediately after position in the shorthand — `0 100% / 21px 100%`, not size before position.
- Don't add a separate `background-size:` line after the shorthand to "fix" it — fold it in, or a future shorthand edit reintroduces the bug.

---

## `overflow-x: clip` vs `overflow: hidden` with sticky elements

`overflow: hidden` on any ancestor (`<html>`, `<body>`, a section wrapper) **creates a scroll container and breaks `position: sticky`** on descendants — the sticky element scrolls with the page instead of holding its position.

**Fix:** Use `overflow-x: clip` instead. It hides horizontal overflow without creating a scroll container, so sticky positioning works.

- **Problem:** `html { overflow-x: hidden }` → an element with `position: sticky; bottom: 0` scrolls away.
- **Fix:** `html { overflow-x: clip }` → sticky holds.
- **Verify:** `getComputedStyle(document.documentElement).overflowX` must be `clip`, not `hidden`.

---

## `backdrop-filter` and glass-effect pitfalls

Three non-obvious requirements for `backdrop-filter: blur()` to render correctly:

1. **Non-opaque background required.** A fully opaque `background-color` prevents the blur from showing through — the glass effect is invisible. Use a semi-transparent color (e.g. `rgb(255 255 255 / 10%)` or `oklch(100% 0 0 / 0.1)`).
2. **Border on light backgrounds.** Without a border, a glass frame blends into a light background and the effect disappears. A subtle semi-transparent white border (e.g. `border: 1px solid rgb(255 255 255 / 60%)`) makes the frame visible.
3. **Inner border-radius must account for padding.** If the frame has `border-radius: R` and `padding: P`, the inner element needs `border-radius: calc(R - P)` — otherwise its corners bleed outside the frame's rounded edge.

---

## Aligning one grid's columns to another grid below/above it

To make element A (e.g. a header row) line up column-for-column with element B (e.g. a card grid) in the same content-width container, give A the SAME `grid-template-columns` and gutter as B, then place A's children by column line. Three traps make the tracks come out unequal — all three fixes are usually needed:

1. **Use `repeat(N, minmax(0, 1fr))`, not `repeat(N, 1fr)`.** Plain `1fr` has an `auto` (min-content) floor, so a wide/`nowrap` child inflates its track and the columns stop matching. `minmax(0, 1fr)` forces truly equal tracks. (This is why the card grid below already uses `minmax(0,1fr)` — match it.)
2. **Add `min-width: 0` to the grid items.** Grid items default to `min-width: auto` (their min-content), which re-introduces the same inflation even under `minmax(0,1fr)` — especially for a `white-space: nowrap` cluster. `min-width: 0` on the items removes the floor.
3. **Clear any inherited `grid-template-areas` / `grid-area` from a mobile rule.** If the mobile layout used named areas (`grid-template: 'brand nav' … ; .child { grid-area: brand }`), the desktop override must reset them — use the `grid-template` shorthand (`grid-template: auto / repeat(N, minmax(0,1fr))`, which clears areas) AND neutralize child `grid-area` (set explicit `grid-column`/`grid-row`). A higher-specificity state selector (e.g. `nav[aria-expanded='true']`) may re-declare `grid-template` too — override it in the same desktop scope or its areas win.

**Match-and-refuse:** if a header's items compute to unequal tracks like `0px 1072px 165px 165px` instead of four equal `351px`, you hit trap #1 or #2. Verify with `getComputedStyle(grid).gridTemplateColumns` — it must read N equal tracks — and compare the items' `getBoundingClientRect().left/right` against the reference grid's cells.

---

See also: `measure-then-implement` (measure the original's rendered tile size before picking a value), `css-specificity-eds` (when the computed value still isn't what you set)
