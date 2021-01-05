const db = require('../lib/firebase');
const { currentDateAndTime } = require('../lib/generateDataAndTime')

exports.index = async (req, res, next) => {
  const bookId = req.params.bookId

  const snapshot = db.dbCon.collection('reviews')

  let reviewsRef = await snapshot.where('bookId', '==', bookId).orderBy('created_at', 'desc').limit(10).get();
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


//adaug review in collection('reviews') -
//extrag carte id -
// .data().reviews unshift(savedRev)
//scot rev a.i. sa fie 10rev
// .data().reviews.shift()
//update carte in bd

//return review creat




  // //paginate a query
  // const first = db.dbCon.collection('reviews')
  // .orderBy('created_at', 'desc')
  // .limit(10);

  // const snapshot2 = await first.get();

  // // Get the last document
  // const last = snapshot.docs[snapshot.docs.length - 1];

  // // Construct a new query starting at this document.
  // // Note: this will not have the desired effect if multiple
  // // cities have the exact same population value.
  // const nextQ = db.dbCon.collection('reviews')
  //   .orderBy('created_at', 'desc')
  //   .startAfter(last.data().created_at)
  //   .limit(10);

  res.status(200).json(createdReview)
}
