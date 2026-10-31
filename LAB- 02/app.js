
const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const app = express();

app.use(express.json());

const databasePath = "./books.db";

let db;

// Initialize database and start server
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    console.log("Database connected successfully");

    // Create books table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS book (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        author TEXT,
        price INTEGER,
        pages INTEGER
      );
    `);

    // Insert sample books if table is empty
    const result = await db.get("SELECT COUNT(*) AS count FROM book");

    if (result.count === 0) {
      const books = [
        ["The Alchemist", "Paulo Coelho", 250, 180],
        ["Wings of Fire", "A.P.J. Abdul Kalam", 300, 200],
        ["Harry Potter", "J.K. Rowling", 450, 320],
        ["The Jungle Book", "Rudyard Kipling", 200, 150],
        ["Atomic Habits", "James Clear", 500, 280],
        ["Rich Dad Poor Dad", "Robert Kiyosaki", 350, 240],
        ["The Secret", "Rhonda Byrne", 280, 190],
        ["Ikigai", "Hector Garcia", 320, 210],
      ];

      for (const book of books) {
        await db.run(
          `INSERT INTO book (title, author, price, pages)
           VALUES (?, ?, ?, ?)`,
          book
        );
      }
    }

    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000/");
    });
  } catch (error) {
    console.log(`Database Error: ${error.message}`);
    process.exit(1);
  }
};

// API 1: Get all books
app.get("/books/", async (request, response) => {
  const books = await db.all("SELECT * FROM book");
  response.send(books);
});

// API 2: Get a single book
app.get("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;

  const book = await db.get(
    "SELECT * FROM book WHERE id = ?",
    [bookId]
  );

  if (book === undefined) {
    response.status(404).send("Book not found");
  } else {
    response.send(book);
  }
});

// API 3: Add a new book
app.post("/books/", async (request, response) => {
  const { title, author, price, pages } = request.body;

  const query = `
    INSERT INTO book (title, author, price, pages)
    VALUES (?, ?, ?, ?)
  `;

  await db.run(query, [title, author, price, pages]);

  response.send("Book added successfully");
});

// API 4: Update a book
app.put("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;
  const { title, author, price, pages } = request.body;

  const result = await db.run(
    `UPDATE book
     SET title = ?, author = ?, price = ?, pages = ?
     WHERE id = ?`,
    [title, author, price, pages, bookId]
  );

  if (result.changes === 0) {
    response.status(404).send("Book not found");
  } else {
    response.send("Book updated successfully");
  }
});

// API 5: Delete a book
app.delete("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;

  const result = await db.run(
    "DELETE FROM book WHERE id = ?",
    [bookId]
  );

  if (result.changes === 0) {
    response.status(404).send("Book not found");
  } else {
    response.send("Book deleted successfully");
  }
});

initializeDBAndServer();

