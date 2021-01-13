const db = require('../lib/firebase');
const { secondsToDate, getTimestamp } = require('../lib/generateDataAndTime')

exports.index = async (req, res, next) => {
  const snapshot = await db.dbCon.collection('books').orderBy('created_at', 'desc').get();

  let books = []
  snapshot.forEach(book => books.push({id: book.id, ...book.data()}))
  books.forEach(book => book.created_at = book.created_at._seconds)

  res.status(200).json(books) 
}

exports.show = async (req, res, next) => {
  const bookId = req.params.id

  let bookRef = await db.dbCon.collection('books').doc(bookId).get()
 
  const error = new Error('Invalid request')
  error.errorArray = []
  error.statusCode = 400
  if(!bookRef.data()) {
    error.errorArray.push('Invalid id')
  }
  if(error.errorArray.length > 0) {
    next(error)
  }

  let currentBook = {id: bookRef.id, ...bookRef.data()}

  res.status(200).json(currentBook)
}

exports.create = async (req, res, next) => {
  const bookData = req.body

  const error = new Error('Invalid request')
  error.errorArray = []
  error.statusCode = 400
  if(!bookData) {
    error.errorArray.push('No body specified for request')
  }
  if (!bookData.title || bookData.title.length === 0) {
    error.errorArray.push('No title specified for request')
  }
  if (!bookData.price) {
    error.errorArray.push('No price specified for request')
  }
  if(error.errorArray.length > 0) {
    next(error)
    return
  }

  let newBookRef = await (await db.dbCon.collection('books').add({...bookData, created_at: getTimestamp()})).get()
  let newBook = {id: newBookRef.id, ...newBookRef.data()}
  newBook.created_at = newBook.created_at._seconds
  
  res.status(200).json(newBook)
}

exports.update = async (req, res, next) => {
  const bookData = req.body
  const bookId = req.params.id

  const error = new Error('Invalid request')
  error.errorArray = []
  error.statusCode = 400
  if(!bookData) {
    error.errorArray.push('No body specified for request')
  }
  if ((!bookData.title || bookData.title.length === 0) && !bookData.price) {
    error.errorArray.push('No data specified for request')
  }

  let book = db.dbCon.collection('books').doc(bookId);
  let searchedId = bookId
  let bookRef = await book.get()
 
  if(!bookRef.data()) {
    error.errorArray.push('Invalid id specified for request')
  }
  if(error.errorArray.length > 0) {
    next(error)
  }

  const created_at = bookRef.data().created_at
  bookData.created_at = created_at
  delete bookData.id
  await book.update(bookData)

  let bookValues = await db.dbCon.collection('books').doc(searchedId).get()
  let updatedBook = {id: searchedId, ...bookValues.data()}
  updatedBook.created_at = updatedBook.created_at._seconds

  res.status(200).json(updatedBook)
}

exports.delete = async (req, res, next) => {
  const bookId = req.params.id

  let book = db.dbCon.collection('books').doc(bookId);
  let bookRef = await book.get()

  const error = new Error('Invalid request')
  error.errorArray = []
  error.statusCode = 400
  if(!bookRef.data()) {
    error.errorArray.push('Invalid id')
  }
  if(error.errorArray.length > 0) {
    next(error)
  }

  await book.delete()

  res.status(200).json()
}