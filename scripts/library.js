const myLibrary = [];

    function Book(title, author, pages, read) {
      this.id = crypto.randomUUID();
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read === "true";
    }

    Book.prototype.toggleRead = function() {
      this.read = !this.read;
    };

    function addBookToLibrary(title, author, pages, read) {
      const newBook = new Book(title, author, pages, read);
      myLibrary.push(newBook);
      displayBooks();
    }

    function displayBooks() {
      const container = document.getElementById('bookContainer');
      container.innerHTML = '';
      myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('book-card');
        card.dataset.id = book.id;
        card.innerHTML = `
          <h3>${book.title}</h3>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Pages:</strong> ${book.pages}</p>
          <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
          <button class="toggle-read-btn">Toggle Read</button>
          <button class="remove-btn">Remove</button>
        `;

        card.querySelector('.toggle-read-btn').addEventListener('click', () => {
          book.toggleRead();
          displayBooks();
        });

        card.querySelector('.remove-btn').addEventListener('click', () => {
          const index = myLibrary.findIndex(b => b.id === book.id);
          if (index !== -1) {
            myLibrary.splice(index, 1);
            displayBooks();
          }
        });

        container.appendChild(card);
      });
    }

    document.getElementById('newBookBtn').addEventListener('click', () => {
      document.getElementById('bookDialog').showModal();
    });

    document.querySelector('.close').addEventListener('click', () => {
      document.getElementById('bookDialog').close();
    });

    document.getElementById('bookForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      addBookToLibrary(
        formData.get('title'),
        formData.get('author'),
        formData.get('pages'),
        formData.get('read')
      );
      e.target.reset();
      document.getElementById('bookDialog').close();
    });

    // Optional: Preload some books
    addBookToLibrary("1984", "George Orwell", 328, "true");
    addBookToLibrary("Dune", "Frank Herbert", 412, "false");