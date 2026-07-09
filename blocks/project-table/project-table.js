import applyProducerLogo from '../../scripts/producer-logos.js';

export default function decorate(block) {
  const table = block.querySelector('table');

  // Build the functional search bar (injected, not authored — see PROJECT-IMPORT Home model)
  const bar = document.createElement('div');
  bar.className = 'project-table-search';

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

  const dataRows = table
    ? [...table.querySelectorAll('tr')].filter((tr) => !tr.querySelector('th'))
    : [];

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
}
