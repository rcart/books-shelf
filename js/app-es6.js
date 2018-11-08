class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
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

  showAlert(msg, className) {

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

  deleteBook(target) {

    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {

    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = "";
    document.getElementById('title').focus();
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI();

      // Adding LS books to list
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// add books when DOM loads
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Add event listeners and functionality of the app
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
    ui.addBookToList(book);
    ui.showAlert('Book Added!', 'success');

    // Add to LS
    Store.addBook(book);

    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete

document.getElementById('book-list').addEventListener('click', function(e) {
  // Get an instance of UI to call the functions
  const ui = new UI();
  ui.deleteBook(e.target);

  // Remove from LS by getting the ISBN number: check DOM navigation
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert('Book removed!', 'success');
  e.preventDefault();
});
