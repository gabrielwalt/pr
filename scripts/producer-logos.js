// Producer → logo map. Keys are the normalized producer name (lowercased,
// collapsed whitespace); values point at the code-hosted logo in content/media.
// Add a row here when a new producer logo is introduced.
const LOGOS = {
  'fondazione prada': { file: 'fondazione-prada.png', alt: 'Fondazione Prada' },
  prada: { file: 'prada.png', alt: 'Prada' },
  'luna rossa': { file: 'luna-rossa.png', alt: 'Luna Rossa' },
};

const normalize = (text) => text.trim().toLowerCase().replace(/\s+/g, ' ');

// `/content` on the local `aem up` server (pages served under /content/…),
// empty in production where content is served from the root.
const contentPrefix = window.location.pathname.startsWith('/content/') ? '/content' : '';

/**
 * If `el`'s text matches a known producer, replace its contents with that
 * producer's logo image. Returns true when a logo was applied.
 */
export default function applyProducerLogo(el) {
  if (!el) return false;
  const logo = LOGOS[normalize(el.textContent)];
  if (!logo) return false;

  const img = document.createElement('img');
  img.src = `${contentPrefix}/media/producers/${logo.file}`;
  img.alt = logo.alt;
  img.className = 'producer-logo';
  img.loading = 'lazy';
  el.replaceChildren(img);
  return true;
}
