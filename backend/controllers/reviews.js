const db = require('../lib/firebase');
const { currentDateAndTime } = require('../lib/generateDataAndTime')

exports.index = async (req, res, next) => {
  const bookId = req.params.bookId
  console.log('rev ale cartii cu id= ', bookId)

  const snapshot = db.dbCon.collection('reviews')

  let reviewsRef = await snapshot.where('bookId', '==', bookId).orderBy('created_at', 'desc').limit(10).get();
  let reviews = []
  reviewsRef.forEach(review => reviews.push({id: review.id, ...review.data()}))
  console.log('rev ordonate', reviews)

  res.status(200).json(reviews) 
}


exports.create = async (req, res, next) => {
  const reviewDates = req.body
  const bookId = req.params.bookId

  let savedReview = {...reviewDates, created_at: currentDateAndTime()}

  let updatedBookRef = await (await db.dbCon.collection('books').doc(bookId).add(savedReview)).get()
  const snapshot = db.dbCon.collection('reviews')
  await snapshot.where('bookId', '==', bookId).add(savedReview)

  //paginate a query
  const first = db.dbCon.collection('reviews')
  .orderBy('created_at', 'desc')
  .limit(10);

  const snapshot2 = await first.get();

  // Get the last document
  const last = snapshot.docs[snapshot.docs.length - 1];

  // Construct a new query starting at this document.
  // Note: this will not have the desired effect if multiple
  // cities have the exact same population value.
  const nextQ = db.dbCon.collection('reviews')
    .orderBy('created_at', 'desc')
    .startAfter(last.data().created_at)
    .limit(10);


  
  let newReview = {id: reviewsRef.id, ...reviewsRef.data()}

  res.status(200).json(newReview)
}
