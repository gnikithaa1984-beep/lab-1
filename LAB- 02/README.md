# Backend Lab 2 – SQLite Database and CRUD Routes

## Project Description
This project demonstrates how to create a backend application using Node.js, Express.js, and SQLite. It performs CRUD operations (Create, Read, Update, and Delete) on a Book database.

## Technologies Used
- Node.js
- Express.js
- SQLite
- SQLite3
- Postman
- Nodemon

## Project Structure

```text
LAB-02/
│
├── app.js
├── books.db
├── package.json
├── package-lock.json
└── README.md
```

## Installation

Install the project dependencies:

```bash
npm install
```

## Database Details

**Database Name:** books.db

**Table Name:** book

| Column | Data Type |
|---|---|
| id | INTEGER PRIMARY KEY |
| title | TEXT |
| author | TEXT |
| price | INTEGER |
| pages | INTEGER |

The application creates the database and book table automatically when the server starts. It also inserts sample book records when the table is empty.

## Running the Application

Start the server using the production script:

```bash
npm start
```

For local development with automatic restarts:

```bash
npm run dev
```

The server uses the hosting platform's `PORT` environment variable when available, and defaults to port `3000` for local use. The SQLite database path is resolved relative to `app.js`.

Local server URL:

```text
http://localhost:3000/
```

## API Endpoints

### 1. Get All Books
- Method: GET
- URL: `http://localhost:3000/books/`
- Description: Retrieves all books from the database.

### 2. Get a Book by ID
- Method: GET
- URL: `http://localhost:3000/books/1/`
- Description: Retrieves a particular book using its ID.

### 3. Add a New Book
- Method: POST
- URL: `http://localhost:3000/books/`
- Body (JSON):

```json
{
  "title": "Python Programming",
  "author": "John Smith",
  "price": 400,
  "pages": 250
}
```

- Description: Adds a new book to the database.
- Required fields: non-empty `title` and `author`, non-negative integer `price`, and positive integer `pages`.
- Success status: `201 Created`; invalid input returns `400 Bad Request`.

### 4. Update a Book
- Method: PUT
- URL: `http://localhost:3000/books/1/`
- Body (JSON):

```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "price": 350,
  "pages": 180
}
```

- Description: Updates the details of an existing book.

### 5. Delete a Book
- Method: DELETE
- URL: `http://localhost:3000/books/2/`
- Description: Deletes a book using its ID.

## Testing

All five API endpoints were tested using Postman.

The database operations were implemented using SQLite and parameterized SQL queries with `?` placeholders to handle user input safely.

## Conclusion

This lab helped me understand how to connect a Node.js application with an SQLite database and perform CRUD operations using Express.js routes. I also learned how to test backend APIs using Postman.
