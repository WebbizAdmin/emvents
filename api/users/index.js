require('../data/connect')
const express = require('express')
const db = require('./db')
const router = express.Router()
const passport = require('passport')

require('./auth')

router.get('/',
 passport.authenticate('basic', { session: false }),
 (req, res) => {
   console.log('Passing The result: ', req.user)
   res.json({ username: req.user.userName, email: req.user.email })
 })

// Create User
router.post('/', (req, res) => {
  // console.log('User data: ', req.body)
  let newUser = req.body

  db.insertUser(newUser, (err, user) => {
    res.json({
      message: 'User has been added',
      user
    })
  })
})

module.exports = router
