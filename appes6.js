class Book{
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI{
 
  addToBookList(book){
    //console.log(book)
    const list = document.getElementById('book-list')
    const row = document.createElement('tr')
    //insert tds
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete" >X</a></td>
    `
    list.appendChild(row)

    console.log(row)
  }
  deleteBook(target){
    if(target.className==='delete'){
      target.parentElement.parentElement.remove()
    }
  }
  showAlert(message, className){
        //create a div
    const div = document.createElement('div')
    div.className = `alert ${className}`
    //add text
    div.appendChild(document.createTextNode(message))
    //put it before the form
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form')
    container.insertBefore(div,form);
    //timeout after 3 secs
    setTimeout(function(){
      document.querySelector('.alert').remove()
    }, 3000)

  }
  clearField(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

  }
}
class Store{
 static getBooks(){
  let books;
  if(localStorage.getItem('books')===null){
     books = []
  }else{
    books = JSON.parse(localStorage.getItem('books'))
  }
  return books;
  }
 static displayBooks(){
  const books = Store.getBooks();
  books.forEach(book => {
    const ui = new UI;
    ui.addToBookList(book)
  });
  }

 static addBook(book){
  const books = Store.getBooks();
  books.push(book)
  localStorage.setItem('books', JSON.stringify(books))
  }
  static removeBook(isbn){
    const books = Store.getBooks();
    //console.log(isbn)
    books.forEach(function(book, index){
      if(book.isbn===isbn){
        books.splice(index, 1)
      }
    })
    localStorage.setItem('books', JSON.stringify(books))
  }
}

//dom load event
document.addEventListener('DOMContentLoaded', Store.displayBooks)

//event listener for addbook
document.getElementById('book-form').addEventListener('submit', function(e){
  //get form values
  const   title = document.getElementById('title').value,
          author= document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
//instantiating a book
const book = new Book(title, author, isbn);
//console.log(book)
//instantiating UI
const ui = new UI()
//validate
if(title === '' || author === '' || isbn === ''){
ui.showAlert('please fill these fields', 'error')
}else {
//adding book to table list
ui.addToBookList(book)
//add book to LS
Store.addBook(book)
//show success
ui.showAlert('book has been added', 'success')
//clear fields
ui.clearField();
}
e.preventDefault()
})



//event listener for delete
document.querySelector('#book-list').addEventListener('click', function(e){
const ui = new UI()
ui.deleteBook(e.target)
//remove book from LS
Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
//console.log(e.target.parentElement.previousElementSibling.textContent)
//show alert
ui.showAlert('book removed!','success')
e.preventDefault()
})