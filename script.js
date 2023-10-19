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
const isReadGl = document.querySelector("#readCheck");

const library = [];
let canClose = false;
let delBtns;

// localStorage.clear();

const testBtn = document.querySelector(".test");

class Book {
  constructor(title, author, genre, hasBeenRead) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.hasBeenRead = hasBeenRead;
  }

  insertBookToTable() {
    const markup = `
      <tr>
        <td>${this.title}</td>
        <td>${this.author}</td>
        <td>${this.genre}</td>
        <td><span class="checkBox">${this.hasBeenRead ? "✅" : "❌"}</span></td>
        <td><button class="delBtn">Remove</button></td>
      </tr>
    `;
    booksTable.insertAdjacentHTML("beforeend", markup);
    delBtns = document.querySelectorAll(".delBtn");
    canClose = true;
  }

  addBookToLibrary() {
    if (this.title == "" || this.genre == "" || this.author == "") {
      warningMsg.classList.remove("hidden");
      setTimeout(hideWarningMessage, 3000);
      return;
    }
    // library.push(this);
    let bookCount = localStorage.getItem("bookCount");
    localStorage.setItem(`book--${bookCount}`, JSON.stringify(this));
    bookCount++;
    localStorage.setItem("bookCount", bookCount);
  }

  getBookSummary = function () {
    return `${title} is written by ${author} and it is a ${genre} book.`;
  };
}

function createLocalStorage() {
  if (localStorage.getItem("bookCount")) return;
  else localStorage.setItem("bookCount", 0);

  if (localStorage.getItem(`library`)) return;
  else localStorage.setItem("library", []);
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
  isReadGl.checked = false;
}

function hideWarningMessage() {
  warningMsg.classList.add("hidden");
}

function hideNumberWarningMessage() {
  numberWarning.classList.add("hidden");
}

/* -------- Functionality of the page -------- */
createLocalStorage();

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
    isReadGl.checked
  );

  book.addBookToLibrary();
  book.insertBookToTable();
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

window.addEventListener("load", () => {
  let bookCount = localStorage.getItem("bookCount");
  console.log(`Book count is: ${bookCount}`);
  for (let i = 0; i < bookCount; i++) {
    const storedData = localStorage.getItem(`book--${i}`);
    const parsedData = JSON.parse(storedData);
    const book = new Book(
      parsedData.title,
      parsedData.author,
      parsedData.genre,
      parsedData.hasBeenRead
    );
    book.insertBookToTable();
  }
});
