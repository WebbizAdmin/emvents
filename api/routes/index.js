const express = require('express')
const app = express()
const events = require('../events')
const users = require('../users')

const router = express.Router()
router.use('/events', events)
router.use('/users', users)

module.exports = router
