import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment — auto-resolved, no per-page metadata needed.
  // `<contentPrefix>/footer`: `/content` on the local `aem up` server, empty in
  // production. An authored `footer` metadata value still overrides.
  const contentPrefix = window.location.pathname.startsWith('/content/') ? '/content' : '';
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : `${contentPrefix}/footer`;
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
