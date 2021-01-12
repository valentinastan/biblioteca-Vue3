const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../lib/firebase');
const { validateEmail } = require('../lib/userHelpers')

exports.signUp = async (req, res, next) => {
  const {
    email,
    password,
  } = req.body

  const error = new Error('Invalid request')
  error.errorArray = []
  error.statusCode = 400
  if(!email || email.length === 0 || !password || password.length === 0) {
    error.errorArray.push('No email or password specified for request')
    next(error)
    return
  }
  if(!validateEmail(email)) {
    error.errorArray.push('Your email is not in the right format')
    next(error)
    return
  }

  const hashPass = await bcrypt.hash(password, 12)
  const createdUser = await db.dbCon.collection('users').add({
    email: email,
    password: hashPass
  })

  if(!createdUser) {
    error.errorArray.push('User not saved')
    next(error)
    return
  }

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

  const error = new Error('Invalid request')
  error.errorArray = []
  error.statusCode = 400
  if(!email || email.length === 0 || !password || password.length === 0) {
    error.errorArray.push('No email or password specified for request')
    next(error)
    return
  }

  const usersRef = db.dbCon.collection('users')
  const queryRef = await usersRef.where('email', '==', email).get()
 
  if(queryRef.empty) {
    error.errorArray.push('User Not Found!')
    next(error)
    return
  } 
  
  let foundUser = {}
  queryRef.forEach(user => {
    foundUser = {
      ...user.data(),
      id: user.id
    }
  });

  let validPass = await bcrypt.compare(password, foundUser.password)

  if(!validPass) {
    error.errorArray.push('Wrong password!')
    next(error)
    return
  }

  const token = jwt.sign(
    {
      id: foundUser.id,
    },
    'super-secret'
  )

  res.status(200).json({token})
}