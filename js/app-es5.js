// Set focus to initial UI element
document.addEventListener('DOMContentLoaded', () => document.getElementById('title').focus());

// Book Constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor

function UI() {}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');

  // Create tr element, row
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="" class="delete">X</a></td>
  `
  list.appendChild(row);
}

// Clear fields function
UI.prototype.clearFields = function() {
  document.getElementById('title').value = "";
  document.getElementById('author').value = "";
  document.getElementById('isbn').value = "";
  document.getElementById('title').focus();
}

// Delete item function
UI.prototype.deleteBook = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// Show Alert function
UI.prototype.showAlert = function(msg, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(msg));
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  container.insertBefore(div, form);

  // Set timeout
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}

// Event listener

document.getElementById('book-form').addEventListener('submit', function(e) {
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // Instantiate Book constructor
  const book = new Book(title, author, isbn);

  // Instantiate UI constructor
  const ui = new UI();

  // Validating input
  if (title === '' || author === '' || isbn === '') {
    // Error Alert
    ui.showAlert('Please fill in all fields', 'error');

  } else {
    ui.showAlert('Book Added!', 'success');
    ui.addBookToList(book);
    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete

document.getElementById('book-list').addEventListener('click', function(e) {
  // Get an instance of UI to call the functions
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert('Book removed!', 'success');
  e.preventDefault();
});
