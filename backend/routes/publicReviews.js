const express = require('express');
const router = express.Router();

const reviewsController = require('../controllers/reviews.js');

router.get('/books/:bookId/reviews/', reviewsController.index)

module.exports = router