const myLibrary = [];

function Book (title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

//Not added to the book prototype as this function manages the library array, not individual book instances.
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('The Lord of the Rings', 'J.R.R. Tolkien', 1178, false);
addBookToLibrary('The Silmarillion', 'J.R.R. Tolkien', 365, true);
addBookToLibrary('1984', 'George Orwell', 328, true);
addBookToLibrary('Brave New World', 'Aldous Huxley', 311, false);
addBookToLibrary('Fahrenheit 451', 'Ray Bradbury', 158, true);      

//Not added to the book prototype as this function manages the library array, not individual book instances.
function displayBooks(myLibrary) {
    myLibrary.forEach(book => {
        console.log(`Book ID ${book.id} is called ${book.title} by ${book.author}. It has ${book.pages} pages. Status: ${book.read ? 'read' : 'not read yet'}`);
    }
    );  
}

displayBooks(myLibrary);