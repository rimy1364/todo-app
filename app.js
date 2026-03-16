const input = document.getElementById('todoInput');
const list = document.getElementById('todoList');
const emptyMsg = document.getElementById('emptyMsg');

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];
renderAll();

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderAll() {
  list.innerHTML = '';
  todos.forEach((todo, index) => renderItem(todo, index));
  emptyMsg.style.display = todos.length === 0 ? 'block' : 'none';
}

function renderItem(todo, index) {
  const li = document.createElement('li');
  if (todo.done) li.classList.add('done');

  const span = document.createElement('span');
  span.textContent = todo.text;
  span.title = 'Click to mark done';
  span.onclick = () => toggleDone(index);

  const btn = document.createElement('button');
  btn.textContent = 'Delete';
  btn.classList.add('delete-btn');
  btn.onclick = () => deleteTodo(index);

  li.appendChild(span);
  li.appendChild(btn);
  list.appendChild(li);
}

function addTodo() {
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, done: false });
  input.value = '';
  saveTodos();
  renderAll();
}

function toggleDone(index) {
  todos[index].done = !todos[index].done;
  saveTodos();
  renderAll();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderAll();
}

// Allow pressing Enter to add
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});
