import { getMetadata, decorateIcons } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    if (!navSections) return;
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    if (!navSections) return;
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  if (!sections) return;
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  if (navSections) {
    const navDrops = navSections.querySelectorAll('.nav-drop');
    if (isDesktop.matches) {
      navDrops.forEach((drop) => {
        if (!drop.hasAttribute('tabindex')) {
          drop.setAttribute('tabindex', 0);
          drop.addEventListener('focus', focusNavSection);
        }
      });
    } else {
      navDrops.forEach((drop) => {
        drop.removeAttribute('tabindex');
        drop.removeEventListener('focus', focusNavSection);
      });
    }
  }

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
    // collapse menu on focus lost
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment — auto-resolved, no per-page metadata needed.
  // The nav lives at `<contentPrefix>/nav`, where contentPrefix is `/content`
  // on the local `aem up` server (pages served under /content/…) and empty in
  // production (root serving). An authored `nav` metadata value still overrides.
  const contentPrefix = window.location.pathname.startsWith('/content/') ? '/content' : '';
  const navMeta = getMetadata('nav');
  const navPath = navMeta
    ? new URL(navMeta, window.location).pathname
    : `${contentPrefix}/nav`;
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  // Wrap the sections + tools regions in a single `.nav-menu` div so the two
  // top rules (Figma 1:13100) can be drawn as one segment over the wordmark
  // (.nav-brand) and one over the menu group (.nav-menu) — the brand rule and
  // the menu rule, with the gap between them falling over the search area.
  const navSectionsEl = nav.querySelector('.nav-sections');
  const navToolsEl = nav.querySelector('.nav-tools');
  if (navSectionsEl && navToolsEl) {
    const navMenu = document.createElement('div');
    navMenu.className = 'nav-menu';
    navSectionsEl.before(navMenu);
    navMenu.append(navSectionsEl, navToolsEl);
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
      navSection.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    });
  }

  // Search item: render the code-hosted icon (icons/search.svg) in place of the
  // link text, keeping the word "Search" only as the accessible label.
  // Identify it by its `/search` href, NOT by an authored `.nav-search` class:
  // EDS's production pipeline strips hand-authored class attributes from nav
  // content (they survive on the local `aem up` proxy but not in prod), so the
  // class isn't reliable. We (re)apply `.nav-search` to the <li> ourselves so
  // header.css keys off it consistently in both environments.
  const searchLink = [...nav.querySelectorAll('.nav-sections a')]
    .find((a) => new URL(a.href, window.location).pathname.replace(/\/$/, '').endsWith('/search'));
  if (searchLink) {
    searchLink.closest('li')?.classList.add('nav-search');
    const label = searchLink.textContent.trim() || 'Search';
    searchLink.setAttribute('aria-label', label);
    searchLink.textContent = '';
    const icon = document.createElement('span');
    icon.className = 'icon icon-search';
    searchLink.append(icon);
    decorateIcons(searchLink);
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  // Home scroll choreography (Beats 1–3), pure CSS: relocate the WHOLE header
  // into the top of the white grid sheet (the grid section's content column) so
  // it scrolls NATIVELY with the sheet as the sheet rises over the hero (Beat 1)
  // and inherits the sheet's capped width — no per-frame JS transform, no
  // viewport-wide fixed bar. header.css then pins it with `position: sticky`
  // (Beat 2); the dark Issue section (higher stacking layer, styles.css z:5)
  // covers the whole grid section as it rises (Beat 3). Non-Home pages keep the
  // header in its normal <header> landmark position at the top.
  //
  // Gated on the `homepage` page template (body.homepage, set from the page's
  // `template` metadata) — NOT on sniffing for `.hero-cover` — so the bespoke
  // relocation runs ONLY on the homepage. The grid sheet is the second section.
  const main = document.querySelector('main');
  const gridSection = document.body.classList.contains('homepage')
    ? main && main.querySelector(':scope > .section:first-child + .section')
    : null;
  const gridInner = gridSection && gridSection.querySelector(':scope > div');
  const headerEl = block.closest('header');
  if (gridInner && headerEl) {
    gridInner.prepend(headerEl);
    headerEl.classList.add('nav-placed');
  }
}
