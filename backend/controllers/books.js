const db = require('../lib/firebase');

exports.index = async (req, res, next) => {
  const snapshot = await db.dbCon.collection('books').get();
  const books = []
  snapshot.forEach(book => books.push({id: book.id, ...book.data()}))
  
  res.status(200).json(books) 
}