//es5 implementation
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
function  UI(){

}

//add book to list
UI.prototype.addToBookList = function(book){
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
 //clear UI fields
 UI.prototype.clearField = function(){
   document.getElementById('title').value = ''
   document.getElementById('author').value = ''
   document.getElementById('isbn').value = ''
 }
//show alert
UI.prototype.showAlert = function(message, className){
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

UI.prototype.deleteBook = function(target){
  if(target.className==='delete'){
    target.parentElement.parentElement.remove()
  }
  }

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

//show success
ui.showAlert('book has been added', 'success')

//clear fields
ui.clearField();
}

//console.log(ui)

e.preventDefault()
})



//event listener for delete
document.querySelector('#book-list').addEventListener('click', function(e){

const ui = new UI()
ui.deleteBook(e.target)
//show alert
ui.showAlert('book removed!','success')

  e.preventDefault()
})