(() => {
  const STORAGE_KEY = 'todo.list.items.v1';

  /** @type {{ id: string; text: string; completed: boolean }[]} */
  let items = [];

  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');
  const clearCompletedBtn = document.getElementById('clear-completed');

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      items = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(items)) items = [];
    } catch { items = []; }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function createItem(text) {
    return { id: String(Date.now()) + Math.random().toString(36).slice(2), text, completed: false };
  }

  function render() {
    list.innerHTML = '';
    for (const item of items) {
      const li = document.createElement('li');
      li.className = 'todo-item';
      li.dataset.id = item.id;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'todo-check';
      checkbox.checked = item.completed;

      const p = document.createElement('p');
      p.className = 'todo-text' + (item.completed ? ' completed' : '');
      p.textContent = item.text;

      const del = document.createElement('button');
      del.className = 'delete-btn';
      del.type = 'button';
      del.textContent = 'Delete';

      li.appendChild(checkbox);
      li.appendChild(p);
      li.appendChild(del);
      list.appendChild(li);
    }
  }

  function addItem(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    items.unshift(createItem(trimmed));
    save();
    render();
  }

  function deleteItem(id) {
    items = items.filter(i => i.id !== id);
    save();
    render();
  }

  function toggleItem(id, completed) {
    const item = items.find(i => i.id === id);
    if (!item) return;
    item.completed = completed;
    save();
    render();
  }

  function clearCompleted() {
    items = items.filter(i => !i.completed);
    save();
    render();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addItem(input.value);
    input.value = '';
    input.focus();
  });

  list.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const li = target.closest('.todo-item');
    if (!li) return;
    const id = li.dataset.id;
    if (!id) return;
    if (target.classList.contains('delete-btn')) {
      deleteItem(id);
    }
  });

  list.addEventListener('change', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (!target.classList.contains('todo-check')) return;
    const li = target.closest('.todo-item');
    if (!li) return;
    const id = li.dataset.id;
    if (!id) return;
    toggleItem(id, target.checked);
  });

  clearCompletedBtn.addEventListener('click', () => {
    clearCompleted();
  });

  load();
  render();
})();


