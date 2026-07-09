// Section style `Expandable` (Section Metadata `Style: Expandable`): clip long
// content to a preview height behind a fade and inject a "Read more" toggle that
// expands it. The Read-more button is NOT authored content — it's inserted here,
// so authors only tag the section with the style. Idempotent per section.
export default function decorateExpandableSections(main) {
  main.querySelectorAll(':scope > .section.expandable').forEach((section) => {
    if (section.dataset.expandableReady) return;
    section.dataset.expandableReady = 'true';

    const inner = section.querySelector(':scope > div');
    if (!inner) return;

    section.classList.add('is-collapsed');

    // Only the TEXT folds — the leading title + image(s) stay fully visible above
    // the fold (the crop never cuts through an image). Find the first text block
    // (a paragraph with no image, not a heading); wrap it and everything after it
    // in the clip container, leaving the title/images as direct children of the
    // sheet (unclipped). The collapsed preview height then measures the text alone.
    const isLeading = (el) => /^H[1-6]$/.test(el.tagName)
      || el.tagName === 'PICTURE'
      || el.tagName === 'IMG'
      || !!el.querySelector('img');
    const clipStart = [...inner.children].find((el) => !isLeading(el));

    const content = document.createElement('div');
    content.className = 'expandable-content';
    if (clipStart) {
      // move clipStart and every following sibling into the wrapper
      let node = clipStart;
      while (node) {
        const next = node.nextSibling;
        content.append(node);
        node = next;
      }
    } else {
      // no trailing text — nothing image-safe to isolate, so wrap everything
      content.append(...inner.childNodes);
    }
    inner.append(content);

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'expandable-toggle';
    toggle.textContent = 'Read more';
    toggle.setAttribute('aria-expanded', 'false');

    // Animate the fold/unfold by driving max-height between the collapsed preview
    // height and the content's real height in pixels (a CSS transition can't
    // animate to/from `none` or a `vh` cap cleanly, so we resolve explicit px
    // values here). CSS owns the transition timing on `.expandable-content`.
    toggle.addEventListener('click', () => {
      const expanding = section.classList.contains('is-collapsed');
      // pin the current rendered height as the transition's `from`, then force a
      // reflow so the browser commits it before we set the `to` (otherwise both
      // values land in the same frame and no transition fires).
      content.style.maxHeight = `${content.clientHeight}px`;
      void content.offsetHeight;

      if (expanding) {
        section.classList.remove('is-collapsed');
        section.classList.add('is-expanded');
        // grow to the content's real height
        content.style.maxHeight = `${content.scrollHeight}px`;
        // once fully open, drop the inline cap so later reflow isn't clamped
        content.addEventListener('transitionend', function done(e) {
          if (e.propertyName !== 'max-height') return;
          content.style.maxHeight = 'none';
          content.removeEventListener('transitionend', done);
        });
      } else {
        section.classList.add('is-collapsed');
        section.classList.remove('is-expanded');
        // clear the inline height so it animates down to the CSS collapsed cap (60vh)
        content.style.maxHeight = '';
      }

      toggle.setAttribute('aria-expanded', expanding ? 'true' : 'false');
      toggle.textContent = expanding ? 'Show less' : 'Read more';
    });

    // place the toggle inside the white sheet, after the clipped content
    content.after(toggle);
  });
}
