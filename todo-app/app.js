const form = document.querySelector('#add-form');
const input = document.querySelector('#task-input');
const tip = document.querySelector('#tip');
const list = document.querySelector('#task-list');

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
let currentFilter = 'all';

const save = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const render = () => {
  list.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'done') return task.done;
    if (currentFilter === 'todo') return !task.done;
    return true;
  });

  if (filteredTasks.length === 0) {
    const li = document.createElement('li');
    li.textContent = '暂无任务';
    list.appendChild(li);
    return;
  }

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;

    if (task.done) {
      li.classList.add('done');
    }

    const del = document.createElement('button');
    del.textContent = '删除';
    del.className = 'del';

    del.addEventListener('click', (e) => {
      e.stopPropagation();
      tasks = tasks.filter(item => item !== task);
      save();
      render();
    });

    li.addEventListener('click', () => {
      task.done = !task.done;
      save();
      render();
    });

    li.appendChild(del);
    list.appendChild(li);
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = input.value.trim();

  if (text === '') {
    tip.textContent = '任务名不能为空';
    return;
  }

  tasks.push({
    text: text,
    done: false
  });

  save();

  tip.textContent = '';
  input.value = '';

  render();
});

const filters = document.createElement('div');
filters.className = 'filters';

['all', 'todo', 'done'].forEach(filter => {
  const button = document.createElement('button');

  if (filter === 'all') button.textContent = '全部';
  if (filter === 'todo') button.textContent = '未完成';
  if (filter === 'done') button.textContent = '已完成';

  button.addEventListener('click', () => {
    currentFilter = filter;
    render();
  });

  filters.appendChild(button);
});

form.after(filters);

render();