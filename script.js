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
let bookCount;

  // localStorage.clear();

const testBtn = document.querySelector(".test");

class Book {
  constructor(title, author, genre, hasBeenRead, id) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.hasBeenRead = hasBeenRead;
	this.id = id;
  }

  addBookToLibrary() {
    if (this.title == "" || this.genre == "" || this.author == "") {
      warningMsg.classList.remove("hidden");
      setTimeout(hideWarningMessage, 3000);
	  console.log(canClose);
      return;
    }
    localStorage.setItem(`book--${bookCount}`, JSON.stringify(this));
    bookCount++;
    localStorage.setItem("bookCount", bookCount);
	
	this.insertBookToTable();
  }

  insertBookToTable() {
	let count = localStorage.getItem('bookCount');
    const markup = `
      <tr data-id="table-row-${count - 1}">
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
	console.log(this);
  }

  getBookSummary = function () {
    return `${title} is written by ${author} and it is a ${genre} book.`;
  };
}

function loadTableFromLocalStorage() {
  let count = localStorage.getItem('bookCount');
  for(let i = 0; i < count; i++) {
	const storedData = localStorage.getItem(`book--${i}`);
	if(!storedData) continue;
    const parsedData = JSON.parse(storedData);
    const book = new Book(
      parsedData.title,
      parsedData.author,
      parsedData.genre,
      parsedData.hasBeenRead,
	  i,
    );
    const markup = `
      <tr data-id="table-row-${i}">
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td><span class="checkBox">${book.hasBeenRead ? "✅" : "❌"}</span></td>
        <td><button class="delBtn">Remove</button></td>
      </tr>
    `;
    booksTable.insertAdjacentHTML("beforeend", markup);
  }
};

function updateLocalStorage() {
	bookCount--;
}

function createLocalStorage() {
  if (localStorage.getItem("bookCount")) {
	bookCount = localStorage.getItem("bookCount");
	return;
  }
  else localStorage.setItem("bookCount", 0);
  bookCount = localStorage.getItem("bookCount");
}

function closeModal() {
  modal.classList.add("hidden");
}

function openModal() {
  canClose = false;
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
  const id = Number(localStorage.getItem('bookCount'));
  console.log(id);
  const book = new Book(
    titleGl.value,
    authorGl.value,
    genreGl.value,
    isReadGl.checked,
    id,
  );
 
  book.addBookToLibrary();
  
  if (canClose) {
    hideWarningMessage();
    closeModal();
    resetInputFields();
    canClose = false;
  }
});

// Changing 'read' status
window.addEventListener("click", (e) => {
  const read = e.target.closest(".checkBox");
  if (!read) return;
  console.log(e.target.closest('tr'));
  read.textContent = read.textContent == "✅" ? "❌" : "✅";
});

/* ---------- Remove item from local storage and table ---------- */
window.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delBtn");
  if (!deleteBtn) return;

  const row = e.target.closest('tr');
  const id = row.dataset.id.slice(-1);
  row.remove();
 
  localStorage.removeItem(`book--${id}`);
  
  // INSERT CODE TO CHANGE ROW-IDS AND BOOK IDS
  
  bookCount--;
  localStorage.setItem('bookCount', bookCount);
});

window.addEventListener("load", () => {
  loadTableFromLocalStorage();
});