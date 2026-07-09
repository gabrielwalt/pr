// Producer → logo map. Keys are the normalized producer name (lowercased,
// collapsed whitespace); values are logo files in the code repo's /icons folder.
// /icons is served at the site root in BOTH the local dev server and production
// (unlike content/media, which is only addressable via hashed asset refs), so a
// JS-injected <img> must point here — not at content/media — to resolve live.
// Add a row here (and drop the PNG in /icons) when a new producer is introduced.
const LOGOS = {
  'fondazione prada': { file: 'producer-fondazione-prada.png', alt: 'Fondazione Prada' },
  prada: { file: 'producer-prada.png', alt: 'Prada' },
  'luna rossa': { file: 'producer-luna-rossa.png', alt: 'Luna Rossa' },
};

const normalize = (text) => text.trim().toLowerCase().replace(/\s+/g, ' ');

/**
 * If `el`'s text matches a known producer, replace its contents with that
 * producer's logo image. Returns true when a logo was applied.
 */
export default function applyProducerLogo(el) {
  if (!el) return false;
  const logo = LOGOS[normalize(el.textContent)];
  if (!logo) return false;

  const img = document.createElement('img');
  img.src = `/icons/${logo.file}`;
  img.alt = logo.alt;
  img.className = 'producer-logo';
  img.loading = 'lazy';
  el.replaceChildren(img);
  return true;
}
