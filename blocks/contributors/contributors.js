export default function decorate(block) {
  const rows = [...block.children];
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  rows.forEach((row) => {
    const [key, value] = [...row.children].map((cell) => cell.textContent.trim());
    const tr = document.createElement('tr');
    const keyCell = document.createElement('th');
    keyCell.scope = 'row';
    keyCell.className = 'contributors-key';
    keyCell.textContent = key;
    const valueCell = document.createElement('td');
    valueCell.className = 'contributors-value';
    valueCell.textContent = value;
    tr.append(keyCell, valueCell);
    tbody.append(tr);
  });

  table.append(tbody);
  block.replaceChildren(table);
}
