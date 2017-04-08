require('../data/connect')
const express = require('express')
const db = require('./db')
const router = express.Router()

// Create User
router.post('/', (req, res) => {
  console.log('User data: ', req.body)
  let newUser = req.body

  db.insertUser(newUser, (err, user) => {
    res.json({
      message: 'User has been added',
      user
    })
  })
})

module.exports = router
