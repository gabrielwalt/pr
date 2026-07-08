---
name: eds-section-metadata-decoration
description: Section styles authored via Section Metadata silently don't apply — the `.section.light/.dark/...` CSS never matches. Cause: this enhanced AEM boilerplate ships a stripped `decorateSections` in scripts/aem.js that never converts Section Metadata into section classes. Use when a section-style class isn't on the `.section` element, section background/color variants do nothing, or you're auditing a fresh boilerplate before relying on section styles.
---

**Before relying on ANY section style, confirm `decorateSections` processes Section Metadata.** The enhanced boilerplate variant ships a *stripped* `decorateSections` (wraps children + adds `.section`, but **omits** the metadata→class step). Result: authored `Section Metadata / Style / Dark` never becomes `.section.dark`, and every section-style rule is dead CSS. The stock `adobe/aem-boilerplate` includes this step — the enhanced one may not.

**The Verify-Section-Decoration Rule.** Author one section with a `Style` metadata, load it, and assert the class is on the `.section` element (`document.querySelector('.section.dark')`) — do NOT assume the boilerplate does it.

## Recipe — restore the metadata step in `scripts/aem.js` `decorateSections`
After the `section.style.display = 'none';` line, before the closing of the `forEach`:
```js
const sectionMeta = section.querySelector('div.section-metadata');
if (sectionMeta) {
  const meta = readBlockConfig(sectionMeta);
  Object.keys(meta).forEach((key) => {
    if (key === 'style') {
      meta.style.split(',').filter((s) => s).map((s) => toClassName(s.trim()))
        .forEach((s) => section.classList.add(s));
    } else {
      section.dataset[toCamelCase(key)] = meta[key];
    }
  });
  sectionMeta.parentNode.remove();
}
```
`readBlockConfig`, `toClassName`, `toCamelCase` already exist in `aem.js` — no imports needed. Run `npx eslint scripts/aem.js` (clean) and verify in preview.

## Authoring form (hand-authored .plain.html served locally)
Section metadata must be the **decorated div form**, NOT a `<table>` — tables only convert during DA's markdown→HTML build; a raw `.plain.html` served by the dev server keeps them as tables:
```html
<div class="section-metadata"><div><div>Style</div><div>Dark</div></div></div>
```

## Pitfalls
- Authoring `Section Metadata` as a `<table>` in a served `.plain.html` — stays a table, never decorates. Use the `div.section-metadata` form.
- Assuming section styles work because the CSS exists — the CSS is correct but never *matched*. Check the class is on the element, not just that the rule is written.
- `parentNode.remove()` (removes the wrapper), not `sectionMeta.remove()` — the metadata sits in its own wrapper div.

See also: `vertical-spacing-system` (defines the section-style variants this enables), `eds-dom-structure` (section DOM + "metadata disappears after decoration"), `context-adaptive-blocks` (dark-section inversion that depends on this working).
