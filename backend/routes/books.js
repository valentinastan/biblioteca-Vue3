const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books.js');

// router.get('/books', booksController.index)
router.post('/books', booksController.create)
router.put('/books/:id', booksController.update)
router.delete('/books/:id', booksController.delete)

module.exports = router