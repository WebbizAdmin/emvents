const express = require('express')
const data = require('../data')
const router = express.Router()
const uuidV1 = require('uuid/v1')

let db = data.events

const filterEvents = (eventId) => {
  return db.filter((obj) => {
    return eventId == obj.id
  })
}
const filterNotEvents = (eventId) => {
  return db.filter((obj) => {
    return eventId != obj.id
  })
}
router.get('/', (req, res) => {
  res.send(db)
})

router.get('/:id', (req, res) => {
  const event = filterEvents(req.params.id)
  res.send(event)
})
router.put('/:id', (req, res) => {
  let newEvent = req.body
  const id = req.params.id
  const oldEventsList = filterNotEvents(id)
  const oldEvent = filterEvents(id)
  console.log('oldEvent', oldEvent)
  let newEvent1 = Object.assign({}, oldEvent[0], newEvent)
  console.log('event', newEvent1)
  const newData = [...oldEventsList, newEvent1]
  db = newData
  res.json({
    message: 'Event has been added',
    events: db
  })
})
router.post('/', (req, res) => {
  let newEvent = req.body
  newEvent.id = uuidV1()
  const newData = [...db, newEvent]
  db = newData
  res.json({
    message: 'Event has been added',
    events: db
  })
})

module.exports = router
