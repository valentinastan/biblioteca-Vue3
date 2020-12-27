const db = require('../lib/firebase');
const faker = require('faker');
const { random } = require('faker');

const generateReviews = () => {
  let reviews = []
  for(let i = 0; i < Math.floor(Math.random() * 11); i++) {
    reviews.push({
      username: faker.internet.userName(),
      text: faker.lorem.sentences()
    })        
  }
  return reviews
}

const addBook = async () => {
  let reviews = generateReviews();
  let createdReviews = []
  for(review of reviews){
    let createdReview = await db.dbCon.collection('reviews').add(review)
    createdReviews.push({ ...review, _id: createdReview.id })
  }
  await db.dbCon.collection('books').add({ 
    title: faker.lorem.sentence(),
    price: faker.random.float(),
    reviews: createdReviews
  })
}

for(let i = 0; i < 10; i++) {
  addBook()
}

for(let i = 0; i < 2; i++) {
  db.dbCon.collection('users').add({
    email: faker.internet.email(),
    password: '123456'
  })
}