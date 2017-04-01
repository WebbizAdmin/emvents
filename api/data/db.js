const mongoClient = require('mongodb').MongoClient
const assert = require('assert')
const mongoose = require('mongoose')
const Event = require('../events/model')

const url = 'mongodb://localhost:27017/emvents'
mongoose.connect(url)

// Insert
const insertEvent = (event, callback) => {
  console.log('incert', event)
  const newEvent = new Event(event)
  console.log('newEvent', newEvent)
  newEvent.save(() => {
    console.log('event saved')
    callback()
  })
}

// Update
const updateEvent = (event, callback) => {
  console.log('update', event)
  Event.findById(event._id, (err, newEvent) => {
    console.log('event from db', newEvent)
    newEvent.title = event.title
    newEvent.description = event.description
    newEvent.save(() => {
      console.log('event updated')
      callback()
    })
  })
}

// Delete event

const deleteEvent = (id, callback) => {
  console.log('delete', id)
  Event.findById(id).remove((err) => {
    assert.equal(err, null)
    console.log('Removed the documentfrom events')
    callback()
  })
}

module.exports = {
  insertEvent,
  updateEvent,
  deleteEvent
}
