---
name: edge-bleed-scroller
description: Make a horizontal scroller/carousel fill its containing section's FULL inner width — cancel the section's content padding with negative margins so the row bleeds to both column edges, then rebuild that padding as first/last item margin so end items sit inset at rest but scroll off UNDER the edges. Use when a scrolling row or carousel should run edge-to-edge within a padded section, when the first/last card should disappear under the section border instead of pinning to the content edge, or when items must still align to a grid/header at rest. Generic; not tied to scroll-snap.
---

**The Bleed-Then-Rebuild Rule.** A scroller inside a padded section should occupy the section's *full* inner width, not the padded content box — so cancel the section padding with equal negative margins on the scroller, then re-add that same padding as `margin` on the FIRST and LAST items. At rest the row looks padded (starts/ends at the content edge); on scroll, end items slide *off under* the section's edges instead of pinning to the content edge — a wordless "more to scroll" cue.

Works with any horizontal scroller (`overflow-x: auto`) — with or without scroll-snap. It differs from escaping to the viewport (`carousel-pattern-eds`): here the scroller stays *inside* the section's already-capped/centered content column and only cancels that column's own padding, so no viewport math or `max()` formula is needed.

## Recipe
Let `P` = the section's inner content padding token (this project: `--page-padding`; see `PROJECT-DESIGN.md`). The scroller is the block whose box == the section's padded `> div`.

1. **Bleed both sides** — cancel the section padding so the scroller reaches both column edges:
   ```css
   .scroller { margin-left: calc(-1 * P); margin-right: calc(-1 * P); }
   ```
2. **Rebuild padding as end-item margin** — first item insets from the left edge, last from the right:
   ```css
   .scroller > ul > li:first-child { margin-left: P; }
   .scroller > ul > li:last-child  { margin-right: P; }
   ```
3. **Correct the item-width formula** — the scroller is now `2·P` wider than the content box, so subtract both bleeds before dividing into N columns, or cards inflate and stop aligning to the grid/header:
   ```css
   li { flex: 0 0 calc((100% - 2 * P - (N - 1) * gap) / N); }
   ```
   (Right-only bleed → subtract `1·P`. Symmetric bleed → subtract `2·P`.)
4. **Track**: `display: flex; flex-wrap: nowrap; overflow-x: auto; gap: <gap>; scrollbar-width: none` (+ `::-webkit-scrollbar { display: none }`) — the clipped end items replace the visible scrollbar as the affordance.
5. **Touch**: `overscroll-behavior-x: contain` so a horizontal swipe doesn't trigger browser back/forward.

## Verify (don't eyeball)
At rest, the first item's left and the Nth item's right must equal the section header's left/right (grid-aligned). Scrolled to each end, the end item's far edge must pass *beyond* the track's edge (off-screen under the section border):
```js
ul.scrollLeft = 0;            // first.left === header.left; nthCard.right === header.right
ul.scrollLeft = ul.scrollWidth;  // first.right < ul.left  → slid off under the left border
```

## Pitfalls
- **Bleeding without correcting the width formula** → cards inflate by `2·P/N` each and the first N no longer line up with the grid/header. Always subtract the bleed you added.
- **Using `padding` on the scroll track for the end insets instead of item `margin`** → with `scroll-snap-type` the first item snaps to scroll position 0 and overlaps the padding. Item margins scroll correctly; track padding does not. (See `carousel-pattern-eds`.)
- **Applying the bleed to a wrapping grid variant** → only the non-wrapping scroller wants it. Scope to the scroller (e.g. `:not(.grid)`), or the grid's rows bleed too.
- **Forgetting the section/ancestor doesn't clip** → if items must be *hidden* under the edge (not just scroll under a transparent gutter), ensure the section paints an opaque ground to the column edge or clips overflow; otherwise the off-edge item shows in the gutter.

See also: `carousel-pattern-eds` (the alternative: escape to the viewport with a `max()` left-margin + scroll-snap peek — use that when the row should bleed past the *viewport* edge rather than sit within the section column), `full-width-escape-hatch` (escaping the global max-width container), `vertical-spacing-system` (the section padding token this cancels).
