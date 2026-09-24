const storageKey = 'cab432-task-tracker-v1';
const list = document.querySelector('#tasks');
const titleInput = document.querySelector('#title');
const filter = document.querySelector('#filter');
const status = document.querySelector('#status');
let tasks = [];
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (!Array.isArray(saved) || !saved.every(task => typeof task.id === 'string' && typeof task.title === 'string' && typeof task.completed === 'boolean')) throw new Error('Invalid data');
  tasks = saved;
} catch {
  status.textContent = 'Saved tasks could not be loaded. New changes will replace the saved list.';
}
function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
    status.textContent = `${tasks.filter(task => !task.completed).length} active tasks.`;
  } catch {
    status.textContent = 'Storage is unavailable. Changes will be lost when this page closes.';
  }
  render();
}
function render() {
  list.replaceChildren();
  const visible = tasks.filter(task => filter.value === 'all' || (filter.value === 'completed') === task.completed);
  for (const task of visible) {
    const row = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', `Complete ${task.title}`);
    checkbox.addEventListener('change', () => { task.completed = checkbox.checked; save(); });
    const text = document.createElement('span');
    text.textContent = task.title;
    text.className = task.completed ? 'done' : '';
    const remove = document.createElement('button');
    remove.textContent = 'Delete';
    remove.setAttribute('aria-label', `Delete ${task.title}`);
    remove.addEventListener('click', () => { tasks = tasks.filter(item => item.id !== task.id); save(); });
    row.append(checkbox, text, remove);
    list.append(row);
  }
  if (!visible.length) {
    const empty = document.createElement('li');
    empty.textContent = 'No tasks in this view.';
    list.append(empty);
  }
}
document.querySelector('#add-form').addEventListener('submit', event => {
  event.preventDefault();
  const title = titleInput.value.trim();
  if (!title) { status.textContent = 'Enter a task title.'; return; }
  tasks.push({ id: crypto.randomUUID(), title, completed: false });
  titleInput.value = '';
  save();
  titleInput.focus();
});
filter.addEventListener('change', render);
render();
