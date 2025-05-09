const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <strong>${task.text}</strong> <br />
      <small>${task.time}</small>
      <div class="task-controls">
        <button onclick="toggleTask(${index})">✔️</button>
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt('Edit your task:', tasks[index].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = document.getElementById('task').value;
  const taskTime = document.getElementById('task-time').value;
  if (taskText && taskTime) {
    tasks.push({ text: taskText, time: taskTime, completed: false });
    saveTasks();
    renderTasks();
    form.reset();
  }
});

renderTasks();
