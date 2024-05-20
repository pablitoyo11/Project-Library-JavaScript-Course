const myLibrary = [
    {
        author: "George Orwell",
        title: "1984",
        pages: 328,
        publishingYear: 1949,
        read: true,
    },
    {
        author: "Harper Lee",
        title: "To Kill a Mockingbird",
        pages: 281,
        publishingYear: 1960,
        read: false,
    }
];

function Book(author,title,pages,publishingYear,read) {  // the constructor...
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.publishingYear = publishingYear;
    this.read = read;
}

Book.prototype.haveRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(e) {  // do stuff here
// on book form submit add new book
    e.preventDefault();
    let author = document.getElementById("addBookForm").elements["Author"].value;
    let title = document.getElementById("addBookForm").elements["Title"].value;
    let pages = document.getElementById("addBookForm").elements["Pages"].value;
    let publishingYear = document.getElementById("addBookForm").elements["Publishing Year"].value;
    let haveRead = document.getElementById("addBookForm").elements["switchButton"].checked;
    myLibrary.push(new Book(author,title,pages,publishingYear,haveRead));
    document.getElementById("addBookForm").reset();
    alert("Book Added");
    addBookToTable(author,title,pages,publishingYear,haveRead);
    window.location.href = "#";
    return false;
}


function addBookToTable(author, title, pages, publishingYear, haveRead,bookIndex) {
    if (bookIndex===undefined) {
        bookIndex=(myLibrary.length-1);
    }
    const tbody = document.getElementById("bookTable").querySelector("tbody");
    const row = document.createElement("tr");

    const authorCell = document.createElement("td");
    authorCell.textContent = author;
    row.appendChild(authorCell);

    const titleCell = document.createElement("td");
    titleCell.textContent = title;
    row.appendChild(titleCell);

    const pagesCell = document.createElement("td");
    pagesCell.textContent = pages;
    row.appendChild(pagesCell);

    const publishingYearCell = document.createElement("td");
    publishingYearCell.textContent = publishingYear;
    row.appendChild(publishingYearCell);

    const haveReadCell = document.createElement("td");
    //need to check prototype and write yes or no, or move switch
    if (haveRead==true){
        haveReadCell.textContent = "Yes";
    }
    else{
        haveReadCell.textContent = "No";
    }
    const protoHaveReadCellBtn= document.createElement('button');
    protoHaveReadCellBtn.textContent = "Change";
    protoHaveReadCellBtn.classList.add("haveReadBtn");
    protoHaveReadCellBtn.setAttribute("data-index", bookIndex);
    protoHaveReadCellBtn.addEventListener('click', () => {
        myLibrary[bookIndex].haveRead();
        updateLibraryToTable();
    });
    haveReadCell.appendChild(protoHaveReadCellBtn);
    row.appendChild(haveReadCell);

    const deleteBookBtnCell = document.createElement("td");
    const deleteBookBtn= document.createElement('button');
    deleteBookBtn.textContent = "Remove Book";
    deleteBookBtn.classList.add("deleteBookBtn");
    deleteBookBtn.setAttribute("data-index", bookIndex);
    deleteBookBtn.addEventListener('click', () => {
        myLibrary.splice(bookIndex,1);
        updateLibraryToTable();
    });
    deleteBookBtnCell.appendChild(deleteBookBtn);
    row.appendChild(deleteBookBtnCell);

    tbody.appendChild(row);
}

function loadLibraryToTable(){
    for (let index = 0; index < myLibrary.length; index++) {
        Object.setPrototypeOf(myLibrary[index], Book.prototype);
        addBookToTable(myLibrary[index].author,myLibrary[index].title,myLibrary[index].pages,myLibrary[index].publishingYear,myLibrary[index].read,index);
    }
}
function updateLibraryToTable(){
    document.getElementsByTagName("tbody")[0].remove()
    document.getElementsByTagName("table")[0].appendChild(document.createElement("tbody"))
    loadLibraryToTable();
};


Window.onload = loadLibraryToTable();