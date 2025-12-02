// script.js
document.addEventListener("DOMContentLoaded", () => {
            const IMAGE_URL = "https://m.media-amazon.com/images/I/71ZB18P3inL._SY522_.jpg";

            // State
            let books = [];
            let currentFilter = "All";

            // DOM references
            const form = document.getElementById("book-form");
            const titleInput = document.getElementById("title");
            const authorInput = document.getElementById("author");
            const categorySelect = document.getElementById("category");
            const grid = document.getElementById("books-grid");
            const sortAZBtn = document.getElementById("sort-az");
            const sortZABtn = document.getElementById("sort-za");
            const filterSelect = document.getElementById("filter-category");

            // Helper: create book object
            function createBook(title, author, category) {
                return {
                    title: title.trim(),
                    author: author.trim(),
                    category,
                    imageUrl: IMAGE_URL
                };
            }

            // Render books
            function renderBooks() {
                // Apply filter
                const list = books.filter(book =>
                    currentFilter === "All" ? true : book.category === currentFilter
                );

                grid.innerHTML = "";

                if (list.length === 0) {
                    grid.innerHTML = `<div class="card" style="text-align:center;color:#6b7280">No books to display</div>`;
                    return;
                }

                list.forEach((book, idx) => {
                    const card = document.createElement("div");
                    card.className = "book-card";

                    card.innerHTML = `
        <img src="${book.imageUrl}" alt="Book cover">
        <div class="book-content">
          <div class="book-title">${book.title}</div>
          <div class="book-meta">Author: ${book.author}</div>
          <div class="book-meta">Category: ${book.category}</div>
        </div>
        <div class="book-actions">
          <button class="delete-btn" data-id="${book.title}-${book.author}-${book.category}">Delete</button>
        </div>
      `;

                    grid.appendChild(card);
                });

                // Attach delete handlers
                grid.querySelectorAll(".delete-btn").forEach(btn => {
                    btn.addEventListener("click", (e) => {
                        const id = e.currentTarget.dataset.id;
                        books = books.filter(b => `${b.title}-${b.author}-${b.category}` !== id);
                        renderBooks();
                    });
                });
            }

            // Event: Add book
            form ? .addEventListener("submit", (e) => {
                e.preventDefault();
                const title = titleInput.value;
                const author = authorInput.value;
                const category = categorySelect.value;

                if (!title.trim() || !author.trim() || !category) return;

                const book = createBook(title, author, category);
                books.push(book);

                // Reset form
                titleInput.value = "";
                authorInput.value = "";
                categorySelect.value = "";

                renderBooks();
            });

            // Event: Sort A → Z
            sortAZBtn ? .addEventListener("click", () => {
                books.sort((a, b) => a.title.localeCompare(b.title));
                renderBooks();
            });

            // Event: Sort Z → A
            sortZABtn ? .addEventListener("click", () => {
                books.sort((a, b) => b.title.localeCompare(a.title));
                renderBooks();
            });

            // Event: Filter
            filterSelect ? .addEventListener("change", (e) => {
                        currentFilter = e.target.value;
                        render