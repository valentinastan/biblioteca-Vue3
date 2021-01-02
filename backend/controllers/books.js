const db = require('../lib/firebase');

exports.index = async (req, res, next) => {
  const snapshot = await db.dbCon.collection('books').get();
  const books = []
  snapshot.forEach(book => books.push({id: book.id, ...book.data()}))
  
  res.status(200).json(books) 
}

exports.create = async (req, res, next) => {
  const bookDates = req.body

  let newBookRef = await (await db.dbCon.collection('books').add(bookDates)).get()
  let newBook = {id: newBookRef.id, ...newBookRef.data()}

  res.status(200).json(newBook)
}

exports.update = async (req, res, next) => {
  const bookDates = req.body

  let book = db.dbCon.collection('books').doc(bookDates.id);
  let searchedId = bookDates.id

  delete bookDates.id
  await book.update(bookDates)
  let bookValues = await db.dbCon.collection('books').doc(searchedId).get()
  let updatedBook = {id: searchedId, ...bookValues.data()}

  res.status(200).json(updatedBook)
}

exports.delete = async (req, res, next) => {
  const bookId = req.params.id

  // const books = db.dbCon.collection('books')
  // const bookRef = books.doc(bookId)
  let bookRef = await db.dbCon.collection('books').doc(bookId);
 
  bookRef.delete()

  res.status(204)
}