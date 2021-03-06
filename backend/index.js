const express = require('express');
const app = express();
const booksRoutes = require('./routes/books')
const booksPublicRoutes = require('./routes/publicBooks')
const reviewsRoutes = require('./routes/reviews')
const reviewsPublicRoutes = require('./routes/publicReviews')
const authRoutes = require('./routes/auth')
const authMiddleware = require('./middleware/auth')
const helmet = require('helmet')
const morgan = require('./config/morgan')
const db = require('./lib/firebase');
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(helmet())
app.use(morgan)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
})

const vuePath = __dirname + '/../frontend/dist';
app.use(express.static(vuePath));

app.use(authRoutes)
app.use(reviewsPublicRoutes)
app.use(booksPublicRoutes)

app.use(authMiddleware)
app.use(reviewsRoutes)
app.use(booksRoutes)

app.get('/', function(req, res) {
  res.sendFile(vuePath + 'index.html');
});

app.use((error, req, res, next) => {
  const {
    statusCode,
    message,
    errorArray
  } = error

  res.status(statusCode).json({ message: message, errors: errorArray })
})


app.listen(2020)