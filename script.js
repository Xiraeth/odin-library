"use strict";

const booksTable = document.querySelector(".books");
const addBookBtn = document.querySelector(".addBook");
const modal = document.querySelector(".modal");
const closeModalButton = document.querySelector(".modal-content span");
const submitBtn = document.querySelector('button[type="submit"]');
const warningMsg = document.querySelector(".warning");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const genre = document.querySelector("#genre");
const number = document.querySelector("#numberOfBooks");
const isRead = document.querySelector("#readCheck");

let canClose = false;

let delBtns;

const testBtn = document.querySelector(".test");

const library = [];

class Book {
  constructor(title, author, genre, numberOfBooks, hasBeenRead) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.numberOfBooks = numberOfBooks;
    this.hasBeenRead = hasBeenRead;
  }
  getBookSummary = function () {
    return `${title} is written by ${author}. It is a ${genre} book with ${numberOfBooks} in it's series.`;
  };
}

function closeModal() {
  modal.classList.add("hidden");
}

function openModal() {
  modal.classList.remove("hidden");
}

function resetInputFields() {
  title.value = "";
  author.value = "";
  genre.value = "";
  number.value = "";
  isRead.checked = false;
}

function hideWarningMessage() {
  warningMsg.classList.add("hidden");
}

function hideNumberWarningMessage() {
  numberWarning.classList.add("hidden");
}

function AddBookToLibrary() {
  const book = new Book(
    title.value,
    author.value,
    genre.value,
    number.value,
    isRead.checked
  );

  if (book.title == "" || book.genre == "" || book.author == "") {
    warningMsg.classList.remove("hidden");
    setTimeout(hideWarningMessage, 3000);
    return;
  }

  library.push(book);

  const markup = `
    <tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.genre}</td>
      <td>${book.numberOfBooks}</td>
      <td><span class="checkBox">${book.hasBeenRead ? "✅" : "❌"}</span></td>
      <td><button class="delBtn">Remove</button></td>
    </tr>
  `;
  booksTable.insertAdjacentHTML("beforeend", markup);
  delBtns = document.querySelectorAll(".delBtn");
  canClose = true;
}

// Add book
addBookBtn.addEventListener("click", (e) => {
  openModal();
});

// Open/close modal
closeModalButton.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target == modal) closeModal();
});
window.addEventListener("keydown", (e) => {
  if (e.key == "Escape") closeModal();
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  AddBookToLibrary();
  if (canClose) {
    hideWarningMessage();
    closeModal();
    resetInputFields();
    canClose = false;
    delBtns.forEach((button) => {
      button.addEventListener("click", (e) => {
        const element = e.target.closest("td");
        if (!element) return;

        element.closest("tr").remove();
      });
    });
    canClose = false;
  }
});

// Changing 'read' status
window.addEventListener("click", (e) => {
  const read = e.target.closest(".checkBox");
  if (!read) return;
  read.textContent = read.textContent == "✅" ? "❌" : "✅";
});
