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
    handleOpenModalClick();
    handleCloseModalClick();
    handleNewBookSubmit();
}

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
}

Book.prototype.updateRead = function () {
    this.isRead = !this.isRead;
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
    const authorCell = createTableCell("td", createElement("p", "book-author", book.author), "author-cell");
    const pagesCell = createTableCell("td", createElement("p", "book-pages", book.pages), "pages-cell");
    const isReadCell = createTableCell("td", createIsReadCheckbox(book.id, book.isRead), "isread-cell");
    const deleteCell = createTableCell("td", createDeleteBookButton(book.id), "delete-cell");
    tableRow.append(headerCell, authorCell, pagesCell, isReadCell, deleteCell);
    return tableRow;
}

const createDeleteBookButton = (id) => {
    const button = document.createElement("button");
    button.textContent = "delete";
    button.classList.add("book-delete");
    button.addEventListener("click", () => {
        deleteBook(id);
        refreshTable();
    });
    return button;
}

const createIsReadCheckbox = (id, initialState) => {
    const checkbox = createElement("input", "book-isread", "", { type: "checkbox" });
    if (initialState) {
        checkbox.checked = true;
    }
    checkbox.addEventListener("change", (e) => {
        updateBookRead(id);
        refreshTable();
    })
    return checkbox;
}

const updateBookRead = (id) => {
    for (const book of library) {
        if (book.id === id) {
            book.updateRead();
            return;
        }
    }
}

const emptyTable = () => {
    const tableBody = document.querySelector("tbody");
    tableBody.replaceChildren();
}

const refreshTable = () => {
    emptyTable();
    fillTable();
}

const deleteBook = (id) => {
    const index = library.findIndex((book) => book.id === id);
    library.splice(index, 1);
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

const handleOpenModalClick = () => {
    const openButton = document.querySelector(".new-book");
    openButton.addEventListener("click", openModal);
}

const handleCloseModalClick = () => {
    const closeButton = document.querySelector(".close-dialog");
    closeButton.addEventListener("click", closeModal);
}

const openModal = () => {
    const dialog = document.querySelector("dialog");
    dialog.showModal();
}

const closeModal = () => {
    const dialog = document.querySelector("dialog");
    dialog.close();
}

const handleNewBookSubmit = () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(form);
        storeFormBook(data);
        form.reset();
        closeModal();
    })
}

const storeFormBook = (formData) => {
    const dataObject = Object.fromEntries(formData);
    addBookToLibrary(
        dataObject.title,
        dataObject.author,
        dataObject.pages,
        dataObject["is-read"] === "yes" ? true : false
    );
}

init();