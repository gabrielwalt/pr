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

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'expandable-toggle';
    toggle.textContent = 'Read more';
    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', () => {
      const expanded = section.classList.toggle('is-expanded');
      section.classList.toggle('is-collapsed', !expanded);
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      toggle.textContent = expanded ? 'Read less' : 'Read more';
    });

    // place the toggle after the clipped content column, inside the section
    inner.after(toggle);
  });
}
