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
    fillTable();
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

const fillTable = () => {
    const tableBody = document.querySelector("tbody");
    for (const book of library) {
        const tableRow = createTableRow(book);
        tableBody.append(tableRow);
    }
}

const createTableRow = (book) => {
    const tableRow = document.createElement("tr");
    const headerCell = createTableCell("th", createElement("p", "book-title", book.title, { scope: "row" }), "title-cell");
    const authorCell = createTableCell("td", createElement("td", "book-author", book.author), "author-cell");
    const pagesCell = createTableCell("td", createElement("td", "book-pages", book.pages), "pages-cell");
    tableRow.append(headerCell, authorCell, pagesCell);
    return tableRow;
}

const createTableCell = (type, content, classes) => {
    const cell = document.createElement(type);
    if (classes) {
        cell.className = classes;
    }
    cell.append(content);
    return cell;
}

const createElement = (tag, classes = "", textContent = "", attributes = {}) => {
    const element = document.createElement(tag);
    element.className = classes;
    if (textContent) {
        element.textContent = textContent;
    }
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
}

init();