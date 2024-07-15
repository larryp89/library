const myLibrary = [];

// Create book object
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

  // Check if the form is valid
  if (checkValidForm(title, author, pages)) {
    let newBook = new Book(title, author, pages, haveRead);
    myLibrary.push(newBook);
    updateShelf(myLibrary);
    clearForm();
    dialog.close(); // Close the dialog after adding the book
  } else {
    alert("Please fill in all fields");
  }
}

// Function to clear the form
function clearForm() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#read").checked = false;
}

// Function to check if the form is valid
function checkValidForm(title, author, pages) {
  return title !== "" && author !== "" && pages !== "" && pages >= 0;
}

function toggleReadStatus(book) {
  if (book.haveRead === "Read") {
    book.haveRead = "Unread";
  } else {
    book.haveRead = "Read";
  }
  updateShelf(myLibrary); // Update the display after toggling the status
}

const dialog = document.querySelector("#add-book-dialog");
const addBookBtn = document.querySelector("#add-book");
const submit = document.querySelector("#submit");

// Opens the dialog modally
addBookBtn.addEventListener("click", function () {
  dialog.showModal();
});

// Add book to library array
submit.addEventListener("click", getBookDetails);

const updateShelf = function (books) {
  const bookContainer = document.querySelector(".book-cards"); // Select your container
  bookContainer.innerHTML = ""; // Clear existing cards

  for (let book of books) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card"); // Add a class for styling

    // Create a group div for the title and remove button
    const groupDiv = document.createElement("div");
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button-div");
    groupDiv.classList.add("card-div");

    // Create elements for book info
    const titleElement = document.createElement("h3");
    const authorElement = document.createElement("p");
    const pagesElement = document.createElement("p");
    const haveReadElement = document.createElement("p");
    const removeButton = document.createElement("button");
    const updateButton = document.createElement("button");

    // Set content of elements
    titleElement.textContent = book.title;
    removeButton.addEventListener("click", function () {
      // Remove the book from the library
      const index = myLibrary.indexOf(book);
      if (index > -1) {
        myLibrary.splice(index, 1); // Remove the book from the array
      }
      // Update the shelf
      updateShelf(myLibrary);
    });

    // Pass a function reference to addEventListener
    updateButton.addEventListener("click", function () {
      toggleReadStatus(book);
    });

    authorElement.textContent = `Author: ${book.author}`;
    pagesElement.textContent = `Pages: ${book.pages}`;
    haveReadElement.textContent = `Status: ${book.haveRead}`;
    removeButton.textContent = "Remove from library";
    updateButton.textContent = "Change status";

    // Append elements to groupDiv and button div
    groupDiv.appendChild(titleElement);
    buttonDiv.appendChild(removeButton);
    buttonDiv.appendChild(updateButton);

    // Append groupDiv and other elements to bookCard
    bookCard.appendChild(groupDiv);
    bookCard.appendChild(authorElement);
    bookCard.appendChild(pagesElement);
    bookCard.appendChild(haveReadElement);
    bookCard.appendChild(buttonDiv);

    // Append bookCard to container
    bookContainer.appendChild(bookCard);
  }
};
