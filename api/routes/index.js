const express = require('express')
const app = express()
const events = require('../events')

const router = express.Router()
router.use('/events', events)

module.exports = router
