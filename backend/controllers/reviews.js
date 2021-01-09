const db = require('../lib/firebase');
const { currentDateAndTime } = require('../lib/generateDataAndTime')

exports.index = async (req, res, next) => {
  const bookId = req.params.bookId
  const pageSize = req.query.pageSize || 10
  const boundReviewId = req.query.reviewId
  const direction = req.query.direction

  const snapshot = db.dbCon.collection('reviews')
  let reviewsRef = snapshot.where('bookId', '==', bookId).orderBy('created_at', 'desc')

  if(boundReviewId) {
    if(direction == 'next') {
      console.log('HERE')
      const cursor = await snapshot.doc(boundReviewId).get();
      console.log('like this', cursor.data().created_at)

      reviewsRef = await reviewsRef
      .startAfter(cursor.data().created_at)
      .limit(pageSize)
      .get();
    }
    if(direction == 'previous') {
      const cursor = await snapshot.doc(boundReviewId).get();

      reviewsRef = await reviewsRef
      .endBefore(cursor.data().created_at)
      .limit(pageSize)
      .get();
    }
  }
  else {
    console.log('HERE2')
    reviewsRef = await reviewsRef.limit(pageSize).get();
  }

  let reviews = []
  reviewsRef.forEach(review => reviews.push({id: review.id, ...review.data()}))
  console.log('rev ordonate', reviews)

  res.status(200).json(reviews) 
}


exports.create = async (req, res, next) => {
  const reviewData = req.body
  const userId =  req.userId
  const bookId = req.params.bookId

  //identific email user dupa id-ul din token
  let currentUserRef = await db.dbCon.collection('users').doc(userId).get()
  reviewData.email = currentUserRef.data().email

  //add the newReview
  let newReview = {...reviewData, created_at: currentDateAndTime()}
  let createdReviewRef = await (await db.dbCon.collection('reviews').add(newReview)).get()
  let createdReview = {id: createdReviewRef.id, ...createdReviewRef.data()}

  //update book reviews with the new review
  const snapshotBook = db.dbCon.collection('books').doc(bookId)
  let currentBookRef = await snapshotBook.get()
  let currentBook = {id: currentBookRef.id, ...currentBookRef.data()}
  console.log(currentBook)
  console.log(bookId)
  currentBook.reviews.unshift(createdReview)


  console.log('currentBoook.reviews.length ', currentBook.reviews.length)
  if(currentBook.reviews.length > 10) {
    for (let i = 0; i < (currentBook.reviews.length - 10); i++) {
      currentBook.reviews.pop()
    }
  }
  console.log('currentBoook.reviews.length ', currentBook.reviews.length)

  delete currentBook.id
  await snapshotBook.update(currentBook)

  res.status(200).json(createdReview)
}
