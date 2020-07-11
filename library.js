class Book {
    constructor(author, title, pages, read, id) {
        this.author = author
        this.title = title
        this.pages = pages
        this.read = read 
        this.id = uuidv4()
    }
}

document.querySelector("#submit").addEventListener('click', (e) => {
    event.preventDefault(e);
    const book = new Book(author.value, title.value, pages.value, read.value)
    library.addBook(book)
})
    
    const library = {
        

        books: [],

        init: function() {
            this.cacheDom()
            this.getLibrary()
            this.render()
        },
        addBook: function(book) {
            this.books.push(book)
            localStorage.setItem('myLibrary', JSON.stringify(this.books))
            this.render()
        },
        cacheDom: function() {
            this.renderBooks = document.querySelector(".books")
            this.table = document.querySelector(".table-library")
            this.form = document.querySelector(".form-container")
            this.test = document.querySelector(".test")
            this.author = document.querySelector("#author")
            this.title = document.querySelector("#title")
            this.pages = document.querySelector("#pages")
            this.read = document.querySelector("#read")
        },
        saveLibrary: function() {
            localStorage.setItem('myLibrary', JSON.stringify(this.books))
        },
        getLibrary: function () {
            const libraryJSON = localStorage.getItem('myLibrary')
            if (libraryJSON !== null) {
                this.books = JSON.parse(libraryJSON)
            }
        },
        removeBook: function (id) {
            const bookIndex = this.books.findIndex(function (book) {
                return book.id === id
            })
            this.books.splice(bookIndex, bookIndex+1)
        },
        changeReadStatus: function (id) {
            const bookIndex = this.books.findIndex(function (book) {
                return book.id === id
            })
            if (this.books[bookIndex].read === "yes") {
                this.books[bookIndex].read  = "no"
            } else {
                this.books[bookIndex].read  = "yes"
            }
        
        },
        generateBooksDOM: function (book) {
            const titleEl = document.createElement("div")
            const authorEl = document.createElement("div")
            const pagesEl = document.createElement("div")
            const statusEl = document.createElement("div")
            const removeEl = document.createElement("div")
            const removeButton = document.createElement("button")
        
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
            
            removeButton.addEventListener('click', () => {
                this.removeBook(book.id)
                this.saveLibrary()
                this.render()
            })
        
            removeEl.appendChild(removeButton)
        
            this.table.appendChild(titleEl)
            this.table.appendChild(authorEl)
            this.table.appendChild(pagesEl)
            this.table.appendChild(statusEl)
            this.table.appendChild(removeEl)
        
            return {titleEl, authorEl}
        },
        render: function() {
            this.elements = this.table.querySelectorAll('div')
            this.elements.forEach((e) => {
                if (e.className === "test" ) {
                    e.textContent = ""
                }
            })
            this.books.forEach(function (book) {
                const bookEl = library.generateBooksDOM(book)
            })
        }
    }

    library.init()



function openForm() {
    document.querySelector(".form-container").style.display = "inline-block";
}

function closeForm() {
    document.querySelector(".form-container").style.display = "none";
}





// const renderBooks = document.querySelector(".books")
// const table = document.querySelector(".table-library")
// const form = document.querySelector(".form-container")
// const test = document.querySelector(".test")
// const author = document.querySelector("#author")
// const title = document.querySelector("#title")
// const pages = document.querySelector("#pages")
// const read = document.querySelector("#read")
// const submit = document.querySelector("#submit")


// let myLibrary = [];

// function Book (author, title, pages, read, id) {
//     this.author = author
//     this.title = title
//     this.pages = pages
//     this.read = read 
//     this.id = id
// }


// const saveLibrary = () => {
//     localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
// }


// const getLibrary = () => {
//     const libraryJSON = localStorage.getItem('myLibrary')
//     if (libraryJSON !== null) {
//         myLibrary = JSON.parse(libraryJSON)
//     }
// }

// function addBookToLibrary(author, title, pages, read) {
//     let id = uuidv4()
//     const book1 = new Book (author, title, pages, read, id)
//     myLibrary.push(book1)
//     localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
//     render()
// }

// const removeBook = (id) => {
//     const bookIndex = myLibrary.findIndex(function (book) {
//         return book.id === id
//     })
//     myLibrary.splice(bookIndex, bookIndex+1)
// }

// const changeReadStatus = (id) => {
//     const bookIndex = myLibrary.findIndex(function (book) {
//         return book.id === id
//     })

//     if (myLibrary[bookIndex].read === "yes") {
//         myLibrary[bookIndex].read  = "no"
//     } else {
//         myLibrary[bookIndex].read  = "yes"
//     }

// }

// const generateBooksDOM = (book) => {
//     const titleEl = document.createElement("div")
//     const authorEl = document.createElement("div")
//     const pagesEl = document.createElement("div")
//     const statusEl = document.createElement("div")
//     const removeEl = document.createElement("div")
//     let removeButton = document.createElement("button")

//     titleEl.classList.add('test')
//     authorEl.classList.add('test')
//     pagesEl.classList.add('test')
//     statusEl.classList.add('test')
//     removeEl.classList.add('test')

//     titleEl.textContent = book.title
//     authorEl.textContent = book.author
//     pagesEl.textContent = book.pages
//     statusEl.textContent = book.read
//     removeButton.textContent = "Remove"
    
//     removeButton.addEventListener('click', () => {
//         removeBook(book.id)
//         saveLibrary()
//         render()
//     })

//     removeEl.appendChild(removeButton)

//     table.appendChild(titleEl)
//     table.appendChild(authorEl)
//     table.appendChild(pagesEl)
//     table.appendChild(statusEl)
//     table.appendChild(removeEl)

//     return {titleEl, authorEl}
// }

// const render = () => {
//     const elements = table.querySelectorAll('div')
   
//     elements.forEach((e) => {
//         if (e.className === "test" ) {
//             e.textContent = ""
//         }
//     })
    
//     myLibrary.forEach(function (book) {
//         const bookEl = generateBooksDOM(book)
//     })
// }

// submit.addEventListener('click', (e) => {
//     event.preventDefault(e);
//     addBookToLibrary(author.value, title.value, pages.value, read.value)
//     console.log(form.querySelectorAll('input')) 
// })

// function openForm() {
//     form.style.display = "inline-block";
// }

// function closeForm() {
//     form.style.display = "none";
//   }

// getLibrary()
// render()