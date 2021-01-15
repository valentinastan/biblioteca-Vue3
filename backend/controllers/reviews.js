const db = require('../lib/firebase');
const { getTimestamp, secondsToDate } = require('../lib/generateDataAndTime')

exports.index = async (req, res, next) => {
  const bookId = req.params.bookId
  const pageSize = req.query.pageSize || 10
  const boundReviewId = req.query.reviewId
  const direction = req.query.direction

  const snapshot = db.dbCon.collection('reviews')
  let reviewsRef = snapshot.where('bookId', '==', bookId).orderBy('created_at', 'desc')

  if(boundReviewId) {
    console.log(boundReviewId)
    if(direction == 'next') {
      const cursor = await snapshot.doc(boundReviewId).get();
      console.log('like this', cursor.data().created_at)

      reviewsRef = await reviewsRef
      .startAfter(cursor.data().created_at)
      .limit(pageSize)
      .get();
    }
    if(direction == 'previous') {
      const cursor = await snapshot.doc(boundReviewId).get();
      console.log('like this', cursor.data().created_at)

      reviewsRef = await reviewsRef
      .endBefore(cursor.data().created_at)
      // .limit(pageSize)
      .get();
    }
  }
  else {
    reviewsRef = await reviewsRef.limit(pageSize).get();
  }

  let reviews = []
  reviewsRef.forEach(review => reviews.push({id: review.id, ...review.data()}))
  reviews.forEach(review => review.created_at = review.created_at._seconds)
  if(reviews.length > pageSize) {
    reviews = reviews.slice(Math.max(reviews.length - pageSize, 0))
  }

  res.status(200).json(reviews) 
}


exports.create = async (req, res, next) => {
  const reviewData = req.body
  const userId =  req.userId
  const bookId = req.params.bookId

  const error = new Error('Invalid request')
  error.errorArray = []
  error.statusCode = 400
  if(!reviewData || !userId || !bookId) {
    error.errorArray.push('Invalid data specified for request')
  }
  if (!reviewData.text || reviewData.text.length === 0) {
    error.errorArray.push('No text review specified for request')
  }
  if(error.errorArray.length > 0) {
    next(error)
    return
  }


  //identific email user dupa id-ul din token
  let currentUserRef = await db.dbCon.collection('users').doc(userId).get()
  if (currentUserRef.empty) {
    error.errorArray.push('Invalid user!')
    next(error)
    return
  }
  reviewData.email = currentUserRef.data().email

  //verific existenta cartii
  const snapshotBook = db.dbCon.collection('books').doc(bookId)
  let currentBookRef = await snapshotBook.get()
  if (!currentBookRef.data()) {
    error.errorArray.push('Book not found')
    next(error)
    return
  }

  //add the newReview
  let newReview = {...reviewData, created_at: getTimestamp()}
  let createdReviewRef = await (await db.dbCon.collection('reviews').add(newReview)).get()
  if (createdReviewRef.empty) {
    error.errorArray.push('Review was not created!')
    next(error)
    return
  }
  let createdReview = {id: createdReviewRef.id, ...createdReviewRef.data()}
  createdReview.created_at = createdReview.created_at._seconds

  //update book reviews with the new review
  let currentBook = {id: currentBookRef.id, ...currentBookRef.data()}
  let copyCreatedReview = {...createdReview}
  delete copyCreatedReview.created_at
  currentBook.reviews.unshift(copyCreatedReview)

  if(currentBook.reviews.length > 10) {
    for (let i = 0; i < (currentBook.reviews.length - 10); i++) {
      currentBook.reviews.pop()
    }
  }
  
  delete currentBook.id
  await snapshotBook.update(currentBook)
  console.log(createdReview)

  res.status(200).json(createdReview)
}
