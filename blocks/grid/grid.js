import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);

    // First cell is the cover slot; remaining cells are the label body.
    const [cover, ...rest] = [...li.children];
    if (cover) {
      if (cover.querySelector('picture')) {
        // image cover
        cover.className = 'grid-card-image';
      } else if (cover.textContent.trim()) {
        // typographic cover: author put text in the cover cell instead of an image
        cover.className = 'grid-card-image grid-card-cover';
      } else {
        // empty cover cell → drop it, entry has no cover
        cover.remove();
      }
    }
    rest.forEach((div) => { div.className = 'grid-card-body'; });

    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(ul);
}
