const library = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
}

const addBookToLibrary = (title, author, pages, isRead) => {
    library.push(new Book(title, author, pages, isRead));
}