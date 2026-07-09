export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;
  const [meta, title] = [...row.children];
  if (meta) meta.classList.add('project-header-meta');
  if (title) title.classList.add('project-header-title');
}
