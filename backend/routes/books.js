const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books.js');

router.get('/books', booksController.index)
router.post('/book', booksController.create)
router.put('/book/:id', booksController.update)
router.delete('/book/:id', booksController.delete)

module.exports = router