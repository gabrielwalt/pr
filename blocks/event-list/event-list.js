import { createOptimizedPicture } from '../../scripts/aem.js';
import applyProducerLogo from '../../scripts/producer-logos.js';

export default function decorate(block) {
  [...block.children].forEach((event) => {
    event.classList.add('event');
    const [meta, preview, media] = [...event.children];

    if (meta) {
      meta.classList.add('event-meta');
      // last ribbon line = producer → swap matching text for its logo.
      applyProducerLogo(meta.querySelector('p:last-child'));
    }

    if (preview) {
      preview.classList.add('event-preview');
      const [date, title] = [...preview.children];
      if (date) date.classList.add('event-date');
      if (title) title.classList.add('event-title');
    }

    if (media) media.classList.add('event-media');
  });

  block.querySelectorAll('picture > img').forEach((img) => img
    .closest('picture')
    .replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '420' }])));
}
