const db = require('../lib/firebase');
const faker = require('faker');
const { random } = require('faker');
const { getTimestamp } = require('../lib/generateDataAndTime')

const populateDb = async () => {
  await generateUsers()
  for(let i = 0; i < 10; i++) {
    await addBook()
   }
}

let usersEmails = []
const generateUsers = async () => {
  for(let i = 0; i < 2; i++) {
    let email = faker.internet.email()
    await db.dbCon.collection('users').add({
      email: email,
      password: '123456'
    })
    usersEmails.push(email)
  }
}

const generateReviews = () => {
  let reviews = []
  for(let i = 1; i < Math.floor(Math.random() * 11); i++) {
    reviews.push({
      email: usersEmails[Math.floor(Math.random() * usersEmails.length)],
      text: faker.lorem.sentences(),
      created_at: getTimestamp()
    })        
  }
  return reviews
}

const addBook = async () => {
  let reviews = generateReviews();
  let createdReviews = []

  let currentBook = await db.dbCon.collection('books').add({ 
    title: faker.lorem.sentence(),
    price: faker.random.float({'min': 10,'max': 150}),
    created_at: getTimestamp()
  })

  for(review of reviews){
    let reviewCopy = {...review, bookId: currentBook.id}
    let createdReview = await db.dbCon.collection('reviews').add(reviewCopy)
    createdReviews.push({ ...reviewCopy, _id: createdReview.id })
  }

  createdReviews.forEach(review => delete review.created_at)
  await currentBook.update({reviews: createdReviews})

}

populateDb()