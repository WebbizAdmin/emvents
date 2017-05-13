require('../data/connect')
const express = require('express')
const db = require('./db')
const router = express.Router()
const passport = require('passport')

// let db = data.db

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
router.get('/search/:title', (req, res) => {
  // const event = filterEvents(req.params.id)
  // res.send(event[0])
  db.searchByTitle(req.params.title, (events) => {
    console.log('returned events', events)
    res.json(events)
  })
})

// 'v1/events/:id - PUT - update an existing record
router.put('/:id', (req, res) => {
  let newEvent = req.body
  newEvent.id = req.params.id
  // const id = req.params.id
  // const oldEventsList = filterNotEvents(id)
  // const oldEvent = filterEvents(id)
  // console.log('oldEvent', oldEvent)
  // let newEvent1 = Object.assign({}, oldEvent[0], newEvent)
  // console.log('event', newEvent1)
  // const newData = [...oldEventsList, newEvent1]
  // db = newData
  console.log('update event.js', newEvent)
  db.updateEvent(newEvent, () => {
    res.json({
      message: 'Event has been updated',
      event: newEvent
    })
  })
})

router.post('/', passport.authenticate('basic'), (req, res) => {
  let newEvent = req.body
  db.insertEvent(newEvent, (err, event) => {
    console.log('Response', res)
    res.json({
      message: 'Event has been added',
      event
    })
  })
})

// '/v1/events/:id' - DELETE one event
router.delete('/:id', (req, res) => {
  // const id = req.params.id
  // remainingEvents = filterNotEvents(id)
  // db = remainingEvents
  db.deleteEvent(req.params.id, () => {
    res.json({
      status: 200,
      message: 'Event has been deleted'
    })
  })
})

module.exports = router
