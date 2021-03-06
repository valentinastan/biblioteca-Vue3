const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books.js');

router.get('/books/:id', booksController.show)
router.get('/books', booksController.index)

module.exports = router