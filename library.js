class Book {
    constructor(author, title, pages, read, id) {
        this.author = author
        this.title = title
        this.pages = pages
        this.read = read 
        this.id = uuidv4()
    }
}
 
    
const library = {
        
        books: [],
        init: function() {
            this.cacheDom()
            this.bindEvents()
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
        bindEvents: function() {
          document.querySelector("#submit").addEventListener('click', (e) => {

            if (author.validity.valueMissing) {
              author.setCustomValidity("Please fill in!");
            } else if (title.validity.valueMissing) {
              title.setCustomValidity("Please fill in!");
            } else if (pages.validity.valueMissing) {
              pages.setCustomValidity("Please fill in!");
            } else if (read.validity.valueMissing) { 
              read.setCustomValidity("Please fill in!");
            } else {
                const book = new Book(author.value, title.value, pages.value, read.value)
                library.addBook(book)
                closeForm()
            }
          })

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
