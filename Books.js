document.addEventListener('DOMContentLoaded', getBooks)
const booksTable = document.querySelector('table')
const form = document.querySelector('form')

booksTable.addEventListener('click', deleteBook)
form.addEventListener('submit', addBooks)

function addBooks () {
    var table = document.getElementById("bookTable");
    // Create an empty <tr> element and add it to the last position of the table
    var row = table.insertRow(-1);
    // Insert new cells (<td> elements) of the "new" <tr> element
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    // Identify input field values
    let input1 = document.getElementById("title");
    let input2 = document.getElementById("author");
    let input3 = document.getElementById("isbn");
    // Add text to the new cells
    cell1.innerText = input1.value;
    cell2.innerText = input2.value;
    cell3.innerText = input3.value;
    cell4.innerHTML = '<a href="#">X</a>'
    addBookToLS([input1.value, input2.value, input3.value])
    // Clear the input fields
    input1.value = ''
    input2.value = ''
    input3.value = ''
}

function deleteBook(e){
    if(e.target.textContent == 'X'){
        if(confirm('Are you sure you want to delete this book?')){
            e.target.parentElement.parentElement.remove()
            deleteBookLS(e.target.parentElement.parentElement.firstChild.textContent)
        }
    }
}

function addBookToLS (book) {
    let books
    if(localStorage.getItem('books') === null){
        books = []
    } else {
        books = JSON.parse(localStorage.getItem('books'))
    }
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))
}

function deleteBookLS(book) {
    let books
    if(localStorage.getItem('books') === null){
        books = []
    } else {
        books = JSON.parse(localStorage.getItem('books'))
    }
    books.forEach((bookLS, bookIndex) => {
        if(bookLS[0] === book){
            books.splice(bookIndex, 1)
        }
    })
    localStorage.setItem('books', JSON.stringify(books))
}

function getBooks(){
    let books
    if(localStorage.getItem('books') === null){
        books = []
    } else {
        books = JSON.parse(localStorage.getItem('books'))
    }
    books.forEach((book) => {
        const tr = document.createElement('tr')
        const td1 = document.createElement('td')
        const td2 = document.createElement('td')
        const td3 = document.createElement('td')
        const td4 = document.createElement('td')
        const a = document.createElement('a')
        a.appendChild(document.createTextNode('X'))
        a.setAttribute('href', '#')
        td1.appendChild(document.createTextNode(book[0]))
        td2.appendChild(document.createTextNode(book[1]))
        td3.appendChild(document.createTextNode(book[2]))
        td4.appendChild(a)
        tr.append(td1, td2, td3, td4)
        const tbody = document.querySelector('tbody')
        tbody.append(tr)
    })
}