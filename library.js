const myLibrary = [];

// Id is not a parameter of the constructor, it is generated automatically
function Book (title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Prototype method to toggle read status (opposite of the current status)
Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

// Not added to the prototype because it is not a method of the Book object, but rather a function that adds a book to the library
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function removeBookFromLibrary(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    // Splice removes the book from the array at the specified index, 2nd parameter is the number of elements to remove
    myLibrary.splice(index, 1);
  }
}

function displayBooks(myLibrary) {
    const booksList = document.getElementById('books-list');
    // If the booksList element does not exist, return early to avoid errors
    if (!booksList) return;
    // Clear the current list before displaying the updated list
    booksList.innerHTML = '';
    myLibrary.forEach(book => {
        const div = document.createElement('div');
        div.textContent = `Book ID ${book.id} is called ${book.title} by ${book.author}. It has ${book.pages} pages. Status: ${book.read ? 'read' : 'not read yet'}`;

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        // Set a custom attribute to identify the book by its id
        removeBtn.setAttribute('data-id', book.id);
        removeBtn.addEventListener('click', function () {
            removeBookFromLibrary(book.id);
            displayBooks(myLibrary);
        });

        // Toggle read status button
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'Toggle Read Status';
        toggleBtn.className = 'toggle-btn';
        toggleBtn.setAttribute('data-id', book.id);
        toggleBtn.addEventListener('click', function () {
            book.toggleReadStatus();
            displayBooks(myLibrary);
        });

        div.appendChild(removeBtn);
        div.appendChild(toggleBtn);
        // Append the book div of each loop to the books list
        booksList.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayBooks(myLibrary);

    const form = document.getElementById('book-form');
    // If the form element does not exist, return early to avoid errors
    if (form) {
        // Function(e) is an event handler for the form submission
        // e is the event object that contains information about the event
        form.addEventListener('submit', function(e) {
            // Prevent the form from submitting and refreshing the page
            e.preventDefault();
            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            // ParseInt is used to convert the string input to a number, the 2nd argument 10 specifies that the number is in base 10
            const pages = parseInt(document.getElementById('pages').value, 10);
            const read = document.getElementById('read').value === "true";
            addBookToLibrary(title, author, pages, read);
            displayBooks(myLibrary);
            form.reset();
        });
    }
});