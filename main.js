const myLibrary = [];

// create book object
function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead ? "Read" : "Unread";
}

function getBookDetails() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const haveRead = document.querySelector("#read").checked;

  let newBook = new Book(title, author, pages, haveRead);
  myLibrary.push(newBook);
  updateShelf(myLibrary);
  dialog.close(); // Close the dialog after adding the book
}

const dialog = document.querySelector("#add-book-dialog");
const addBookBtn = document.querySelector("#add-book");
const submit = document.querySelector("#submit");

// opens the dialog modally
addBookBtn.addEventListener("click", function () {
  dialog.showModal();
});

// add book to library array
submit.addEventListener("click", getBookDetails);

const updateShelf = function (books) {
  const bookContainer = document.querySelector(".book-cards"); // Select your container
  bookContainer.innerHTML = ""; // Clear existing cards

  for (let book of books) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card"); // Add a class for styling

    // Create a group div for the title and remove button
    const groupDiv = document.createElement("div");
    groupDiv.classList.add("card-div");

    // Create elements for book info
    const titleElement = document.createElement("h3");
    const removeButton = document.createElement("button");
    const authorElement = document.createElement("p");
    const pagesElement = document.createElement("p");
    const haveReadElement = document.createElement("p");

    // Set content of elements
    titleElement.textContent = book.title;
    removeButton.textContent = "X";
    removeButton.addEventListener("click", function () {
      // Remove the book from the library
      const index = myLibrary.indexOf(book);
      if (index > -1) {
        myLibrary.splice(index, 1); // Remove the book from the array
      }
      // Update the shelf
      updateShelf(myLibrary);
    });
    authorElement.textContent = `Author: ${book.author}`;
    pagesElement.textContent = `Pages: ${book.pages}`;
    haveReadElement.textContent = `Status: ${book.haveRead}`;

    // Append elements to groupDiv
    groupDiv.appendChild(titleElement);
    groupDiv.appendChild(removeButton);

    // Append groupDiv and other elements to bookCard
    bookCard.appendChild(groupDiv);
    bookCard.appendChild(authorElement);
    bookCard.appendChild(pagesElement);
    bookCard.appendChild(haveReadElement);

    // Append bookCard to container
    bookContainer.appendChild(bookCard);
  }
};
