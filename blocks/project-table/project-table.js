import applyProducerLogo from '../../scripts/producer-logos.js';

export default function decorate(block) {
  // Authored as a SINGLE block-table (no nested HTML <table>): each direct child
  // <div> of the block is a row, each grandchild <div> a cell. The FIRST row is
  // the column header, the rest are data. Build a semantic <table> from it here
  // (th for the header row, td for data) so authors never hand-write table markup.
  const rows = [...block.children];
  const table = document.createElement('table');

  rows.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');
    [...row.children].forEach((cell) => {
      const el = document.createElement(rowIndex === 0 ? 'th' : 'td');
      el.innerHTML = cell.innerHTML;
      tr.append(el);
    });
    table.append(tr);
  });

  block.replaceChildren(table);

  // Build the functional search bar (injected, not authored — see PROJECT-IMPORT Home model)
  const bar = document.createElement('div');
  bar.className = 'project-table-search';
  // Anchor target: the nav's search icon links to `/#search`, so the homepage
  // scrolls here and focuses the input (see the hash handler at the end).
  bar.id = 'search';

  const input = document.createElement('input');
  input.type = 'search';
  input.className = 'project-table-input';
  input.setAttribute('aria-label', 'Search the index');
  input.placeholder = 'Search';

  const clear = document.createElement('button');
  clear.type = 'button';
  clear.className = 'project-table-clear';
  clear.textContent = 'Clear';

  bar.append(input, clear);
  block.prepend(bar);

  const dataRows = [...table.querySelectorAll('tr')].filter((tr) => !tr.querySelector('th'));

  // Producer column (last cell) → swap matching text for its logo.
  dataRows.forEach((tr) => applyProducerLogo(tr.lastElementChild));

  const applyFilter = () => {
    const q = input.value.trim().toLowerCase();
    dataRows.forEach((tr) => {
      const match = !q || tr.textContent.toLowerCase().includes(q);
      tr.hidden = !match;
    });
    block.classList.toggle('is-filtered', q.length > 0);
  };

  input.addEventListener('input', applyFilter);
  clear.addEventListener('click', () => {
    input.value = '';
    applyFilter();
    input.focus();
  });

  // Deep-link from the nav search icon (`/#search`): scroll the search bar into
  // view and focus the input so the visitor can start typing immediately. Fires
  // on initial load (arriving from another page) and on hashchange (already here).
  const revealSearch = () => {
    if (window.location.hash !== '#search') return;
    bar.scrollIntoView({ behavior: 'smooth', block: 'start' });
    input.focus({ preventScroll: true });
  };
  // hashchange (already on the page): reveal immediately.
  window.addEventListener('hashchange', revealSearch);
  // Initial arrival from another page: the focus must run AFTER the rest of the
  // page settles (section loading + the homepage scroll choreography) or it gets
  // stolen back to <body>. `load` + a deferred tick wins reliably.
  if (window.location.hash === '#search') {
    if (document.readyState === 'complete') {
      setTimeout(revealSearch, 100);
    } else {
      window.addEventListener('load', () => setTimeout(revealSearch, 100), { once: true });
    }
  }
}
