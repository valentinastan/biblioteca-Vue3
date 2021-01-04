const express = require('express');
const router = express.Router();

const reviewsController = require('../controllers/reviews.js');

router.post('/books/:bookId/reviews/', reviewsController.create)

module.exports = router