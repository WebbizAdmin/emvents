const express = require('express')
const data = require('../data')
const router = express.Router()
const uuidV1 = require('uuid/v1')

let db = data.events

const fakeAjaxCall = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(db)
    }, 2000)
  })
}

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
  fakeAjaxCall().then((obj, err) => {
    res.send(obj)
  })
})

router.get('/:id', (req, res) => {
  const event = filterEvents(req.params.id)
  res.send(event[0])
})

// 'v1/events/:id - PUT - update an existing record
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

// '/v1/events/:id' - DELETE one event
router.delete('/:id', (req, res) => {
  const id = req.params.id
  remainingEvents = filterNotEvents(id)
  db = remainingEvents
  res.json({
    status: 200,
    message: 'Event has been deleted',
    events: db
  })
})

module.exports = router
