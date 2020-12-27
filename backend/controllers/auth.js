const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../lib/firebase');

exports.signUp = async (req, res, next) => {
  const {
    email,
    password,
  } = req.body

  const hashPass = await bcrypt.hash(password, 12)
  const createdUser = await db.dbCon.collection('users').add({
    email: email,
    password: hashPass
  })

  const token = jwt.sign(
    {
      id: createdUser.id,
    },
    'super-secret'
  )

  res.status(201).json({token})
}

exports.login = async (req, res, next) => {
  const {
    email,
    password
  } = req.body

  const usersRef = db.dbCon.collection('users')
  const queryRef = await usersRef.where('email', '==', email).get()
  
  if (queryRef.empty) {
    res.status(404).json("User Not Found!")
  }

  let foundUser
  queryRef.forEach(user => {
    foundUser = {
      ...user.data(),
      id: user.id
    }
  });
  console.log(queryRef)
  console.log(foundUser)
  validPass = await bcrypt.compare(password, foundUser.password)
  if (!validPass) {
    res.status(404).json("Wrong password!")
  }

  const token = jwt.sign(
    {
      id: foundUser.id,
    },
    'super-secret'
  )

  res.status(200).json({token})
}