// selectors
const renderBooks = document.querySelector(".books")
const table = document.querySelector(".table-library")
const form = document.querySelector(".form-container")
const test = document.querySelector(".test")
const author = document.querySelector("#author")
const title = document.querySelector("#title")
const pages = document.querySelector("#pages")
const read = document.querySelector("#read")
const submit = document.querySelector("#submit")


let myLibrary = [];

function Book (author, title, pages, read, id) {
    this.author = author
    this.title = title
    this.pages = pages
    this.read = read 
    this.id = id
    this.info = () => {
        console.log(this.title + " by " + this.author + ", " + this.pages + ", " + this.read)
    }
}

// Save library to local storage
const saveLibrary = () => {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}

// get library from local storage
const getLibrary = () => {
    const libraryJSON = localStorage.getItem('myLibrary')
    if (libraryJSON !== null) {
        myLibrary = JSON.parse(libraryJSON)
    }
}

function addBookToLibrary(author, title, pages, read) {
    let id = uuidv4()
    const book1 = new Book (author, title, pages, read, id)
    myLibrary.push(book1)
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    render()
}

const removeBook = (id) => {
    const bookIndex = myLibrary.findIndex(function (book) {
        return book.id === id
    })
    myLibrary.splice(bookIndex, bookIndex+1)
}

const changeReadStatus = (id) => {
    const bookIndex = myLibrary.findIndex(function (book) {
        return book.id === id
    })

    if (myLibrary[bookIndex].read === "yes") {
        myLibrary[bookIndex].read  = "no"
    } else {
        myLibrary[bookIndex].read  = "yes"
    }

}

const generateBooksDOM = (book) => {
    const titleEl = document.createElement("div")
    const authorEl = document.createElement("div")
    const pagesEl = document.createElement("div")
    const statusEl = document.createElement("div")
    const removeEl = document.createElement("div")
    let removeButton = document.createElement("button")

    titleEl.classList.add('test')
    authorEl.classList.add('test')
    pagesEl.classList.add('test')
    statusEl.classList.add('test')
    removeEl.classList.add('test')

    titleEl.textContent = book.title
    authorEl.textContent = book.author
    pagesEl.textContent = book.pages
    statusEl.textContent = book.read
    removeButton.textContent = "Remove"
    // let titleEl = document.createElement('p')
    
    // let readStatus = document.createElement("input")
    // readStatus.type = "checkbox"
    
    // book.read === "yes" ? readStatus.checked = true : readStatus.checked = false

    // titleEl.textContent = book.title

    
    // bookEl.appendChild(textEl)
    // bookEl.appendChild(removeButton)
    // bookEl.appendChild(readStatus)
    removeButton.addEventListener('click', () => {
        removeBook(book.id)
        saveLibrary()
        render()
    })

    // readStatus.addEventListener('change', () => {
    //     changeReadStatus(book.id)
    //     saveLibrary()
    //     render()
    // })
    removeEl.appendChild(removeButton)

    table.appendChild(titleEl)
    table.appendChild(authorEl)
    table.appendChild(pagesEl)
    table.appendChild(statusEl)
    table.appendChild(removeEl)

    return {titleEl, authorEl}
}

const render = () => {
    const elements = table.querySelectorAll('div')
   
    elements.forEach((e) => {
        if (e.className === "test" ) {
            e.textContent = ""
        }
    })
    
    myLibrary.forEach(function (book) {
        const bookEl = generateBooksDOM(book)
    })
}

submit.addEventListener('click', (e) => {
    event.preventDefault(e);
    addBookToLibrary(author.value, title.value, pages.value, read.value)
    console.log(form.querySelectorAll('input')) 
})

function openForm() {
    form.style.display = "inline-block";
}

function closeForm() {
    form.style.display = "none";
  }

getLibrary()
render()