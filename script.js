"use strict";

const booksTable = document.querySelector(".books");
const addBookBtn = document.querySelector(".addBook");
const modal = document.querySelector(".modal");
const closeModalButton = document.querySelector(".modal-content span");
const submitBtn = document.querySelector('button[type="submit"]');
const warningMsg = document.querySelector(".warning");

const titleGl = document.querySelector("#title");
const authorGl = document.querySelector("#author");
const genreGl = document.querySelector("#genre");
const numberGl = document.querySelector("#numberOfBooks");
const isReadGl = document.querySelector("#readCheck");

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

  addBookToLibrary() {
    if (this.title == "" || this.genre == "" || this.author == "") {
      warningMsg.classList.remove("hidden");
      setTimeout(hideWarningMessage, 3000);
      return;
    }

    library.push(this);

    const markup = `
      <tr>
        <td>${this.title}</td>
        <td>${this.author}</td>
        <td>${this.genre}</td>
        <td>${this.numberOfBooks}</td>
        <td><span class="checkBox">${this.hasBeenRead ? "✅" : "❌"}</span></td>
        <td><button class="delBtn">Remove</button></td>
      </tr>
    `;
    booksTable.insertAdjacentHTML("beforeend", markup);
    delBtns = document.querySelectorAll(".delBtn");
    canClose = true;
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
  titleGl.value = "";
  authorGl.value = "";
  genreGl.value = "";
  numberGl.value = "";
  isReadGl.checked = false;
}

function hideWarningMessage() {
  warningMsg.classList.add("hidden");
}

function hideNumberWarningMessage() {
  numberWarning.classList.add("hidden");
}

// Open modal
addBookBtn.addEventListener("click", openModal);

// Close modal
closeModalButton.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target == modal) closeModal();
});
window.addEventListener("keydown", (e) => {
  if (e.key == "Escape") closeModal();
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const book = new Book(
    titleGl.value,
    authorGl.value,
    genreGl.value,
    numberGl.value,
    isReadGl.checked
  );

  book.addBookToLibrary();
  if (canClose) {
    hideWarningMessage();
    closeModal();
    resetInputFields();
    canClose = false;
    booksTable.addEventListener("click", (e) => {
      const btn = e.target.closest(".delBtn");
      if (!btn) return;
      btn.closest("tr").remove();
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
