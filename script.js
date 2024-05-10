const myLibrary = [];


function Book() {  // the constructor...
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.publishingYear = publishingYear;
    //this.read = read;
}

Book.prototype.haveRead = function() {
    if (this.read="true"){
        console.log(`You have read ${this.pages} pages of ${this.author}, ${this.title}!`);
    }
    else{
        console.log(`You have not read ${this.title} by ${this.author}`);
    }
  };


function addBookToLibrary() {  // do stuff here

}

