const form = document.querySelector('#book-form');
const nameInput = document.querySelector('#book-name');
const authorInput = document.querySelector('#author');
const typeInput = document.querySelector('#type');
const searchInput = document.querySelector('#search');
const tip = document.querySelector('#tip');
const list = document.querySelector('#book-list');

let books = JSON.parse(localStorage.getItem('books') || '[]');

function saveBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}

function render() {
  list.innerHTML = '';

  const keyword = searchInput.value.trim();

const result = books.filter(function(book) {
  return book.name.includes(keyword) || book.author.includes(keyword);
});

  if (result.length === 0) {
    const li = document.createElement('li');
    li.textContent = '暂无图书信息';
    list.appendChild(li);
    return;
  }

  result.forEach(function(book) {
    const li = document.createElement('li');

    const text = document.createElement('span');
    text.textContent =
      book.name + ' - ' + book.author + ' - ' + book.type;

    const button = document.createElement('button');
    button.textContent = '删除';
    button.className = 'delete';

button.addEventListener('click', function() {
  const ok = confirm('确定删除这本图书吗？');

  if (!ok) {
    return;
  }

  books = books.filter(function(item) {
    return item !== book;
  });

  saveBooks();
  render();
});

    li.appendChild(text);
    li.appendChild(button);
    list.appendChild(li);
  });
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const author = authorInput.value.trim();
  const type = typeInput.value;

  if (name === '' || author === '' || type === '') {
    tip.textContent = '请完整填写图书信息';
    return;
  }

  books.push({
    name: name,
    author: author,
    type: type
  });

  saveBooks();

  nameInput.value = '';
  authorInput.value = '';
  typeInput.value = '';
  tip.textContent = '';

  render();
});

searchInput.addEventListener('input', function() {
  render();
});

render();