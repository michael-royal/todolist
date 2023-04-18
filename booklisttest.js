class Books{
  constructor(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}



class UI{
  static displayBooks(){


    const books = store.getBooks()

    books.forEach((book)=>{UI.addBookToList(book)})
  }


  static addBookToList(book){
    const tr = document.getElementById('book-list')


    const row = document.createElement('tr')

    row.innerHTML= `
    <th>${book.title}</th>
    <th>${book.author}</th>
    <th>${book.isbn}</th>
    <th><a href="#" class="btn btn-danger btn-sm delete">X</a></th>
    `

    tr.appendChild(row)
  }

  static clearFields(){
    const title = document.getElementById('title').value = '';
    const author = document.getElementById('author').value= '';
    const isbn = document.getElementById('isbn').value = '';
  }

  static removeBook(el){
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
      
    }
  }


  static showAlert(message, className){
    const div = document.createElement('div')
    div.className= `alert alert-${className}`
    div.appendChild(document.createTextNode(message))

    const container = document.querySelector('.container')
    const form = document.getElementById('book-form')

    container.insertBefore(div, form)

    setTimeout(() => document.querySelector('.alert').remove(),  2000)
  }

 
}

class store{
  static getBooks(){
    let books;
    if (localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }

    return books;
  }
   static addBook(book){
    const books = store.getBooks()
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))
   }

  static removeBook(isbn){
    const books = store.getBooks()
    books.forEach((book, index) =>{
      if (book.isbn === isbn) {
        books.splice(index, 1)
        
      }
    })
    localStorage.setItem('books', JSON.stringify(books))
  }
  
}


document.addEventListener('DOMContentLoaded', UI.displayBooks())


const form = document.getElementById('book-form').addEventListener('submit', (e)=>{

  e.preventDefault()
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const isbn = document.getElementById('isbn').value

 if (title === '' || author === '' || isbn === '') {
  UI.showAlert('please fill in all fields', 'danger')
 } else {
  const book = new Books(title,author,isbn)
  UI.addBookToList(book)
  store.addBook(book)

  UI.clearFields()
  UI.showAlert('Task added successfully', 'success')
  
 }
})

document.querySelector('#book-list').addEventListener('click', (e)=>{
  UI.removeBook(e.target)
  UI.showAlert('Tasks deleted', 'info')
  store.removeBook(e.target.parentElement.previousElementSibling.textContent)

})