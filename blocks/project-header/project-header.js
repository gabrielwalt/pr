import applyProducerLogo from '../../scripts/producer-logos.js';

export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;
  const [meta, title] = [...row.children];
  if (meta) {
    meta.classList.add('project-header-meta');
    // last ribbon line = producer → swap matching text for its logo.
    applyProducerLogo(meta.querySelector('p:last-child'));
  }
  if (title) title.classList.add('project-header-title');
}
