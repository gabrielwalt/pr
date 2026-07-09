export default function decorate(block) {
  const rows = [...block.querySelectorAll('tr')];
  const list = document.createElement('ul');

  rows.forEach((tr) => {
    const [role, name] = [...tr.children].map((td) => td.textContent.trim());
    const li = document.createElement('li');
    const roleEl = document.createElement('p');
    roleEl.className = 'contributors-role';
    roleEl.textContent = role;
    const nameEl = document.createElement('p');
    nameEl.className = 'contributors-name';
    nameEl.textContent = name;
    li.append(roleEl, nameEl);
    list.append(li);
  });

  block.replaceChildren(list);
}
