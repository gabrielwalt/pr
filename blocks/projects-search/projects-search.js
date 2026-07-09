// Injected search bar for the Projects page. The block itself is authored empty;
// its search input + Clear button are built here (like project-table's search).
// Typing live-filters the project entry cards across the page: a card whose text
// doesn't match is hidden, and a whole project group (its project-header + the
// projects scroller) is hidden when NONE of its entries match.
export default function decorate(block) {
  block.textContent = '';

  const input = document.createElement('input');
  input.type = 'search';
  input.className = 'projects-search-input';
  input.setAttribute('aria-label', 'Search projects');
  input.placeholder = 'Search';

  const clear = document.createElement('button');
  clear.type = 'button';
  clear.className = 'projects-search-clear';
  clear.textContent = 'Clear';

  block.append(input, clear);

  const main = block.closest('main');

  // Each project = a section holding a project-header + a projects block. Group
  // them by section so a whole group can be hidden when it has no matches.
  const groups = [...main.querySelectorAll('.projects:not(.grid)')].map((projects) => ({
    section: projects.closest('.section'),
    cards: [...projects.querySelectorAll(':scope > ul > li')],
  }));

  const applyFilter = () => {
    const q = input.value.trim().toLowerCase();
    groups.forEach(({ section, cards }) => {
      let anyMatch = false;
      cards.forEach((card) => {
        const match = !q || card.textContent.toLowerCase().includes(q);
        card.hidden = !match;
        if (match) anyMatch = true;
      });
      // hide the whole project group (header + scroller) when it has no matches
      if (section) section.hidden = !!q && !anyMatch;
    });
  };

  input.addEventListener('input', applyFilter);
  clear.addEventListener('click', () => {
    input.value = '';
    applyFilter();
    input.focus();
  });
}
