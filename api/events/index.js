const express = require('express')
const data = require('../data')
const router = express.Router()

const filterEvents = (eventId) => {
  return data.events.filter((obj) => {
    return eventId == obj.id
  })
}
router.get('/', (req, res) => {
  res.send(data.events)
})
router.get('/:id', (req, res) => {
  const event = filterEvents(req.params.id)
  res.send(event)
})
router.post('/add', (req, res) => {
  res.send(`Data recieved ${req.body.name}`)
})

module.exports = router
