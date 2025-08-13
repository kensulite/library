const library = [];

const dummyBooks = [
    {
        title: "Book A",
        author: "Author A",
        pages: 500,
        isRead: true
    },
    {
        title: "Book B",
        author: "Author B",
        pages: 400,
        isRead: false
    },
    {
        title: "Book C",
        author: "Author C",
        pages: 300,
        isRead: true
    }
];

const addDummyBooks = () => {
    for (const book of dummyBooks) {
        addBookToLibrary(book.title, book.author, book.pages, book.isRead);
    }
}

const init = () => {
    addDummyBooks();
}

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

init();