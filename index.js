const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [];

// GET /books - Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
    const newBook = { id: Date.now(), ...req.body };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT /books/:id - Update an existing book
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(b => b.id == id);

    if (bookIndex === -1) {
        return res.status(404).send('Book not found');
    }

    books[bookIndex] = { id: Number(id), ...req.body };
    res.json(books[bookIndex]);
});

// DELETE /books/:id - Delete a book
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    books = books.filter(b => b.id != id);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
