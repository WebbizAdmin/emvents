const assert = require('assert')
const Event = require('./model')

// Insert
const insertEvent = (event, callback) => {
  console.log('incert', event)

  const newEvent = new Event(event)
  console.log('newEvent', newEvent)
  newEvent.save((err, event) => {
    console.log('event saved')
    callback(err, event)
  })
}
const searchByTitle = (searchTerm, cb) => {
  const r = { 'title': { '$regex': searchTerm, '$options': 'i' } }
  Event.find(r, (err, events) => {
    if (err) {
      console.log('ERROR', err)
    }
    return cb(events)
  })
}

// Update
const updateEvent = (event, userId, callback) => {
  console.log('update', event)
  Event.findById(event._id, (err, newEvent) => {
    if (event.user._id === userId) {
      console.log('User authorized')
      console.log('event from db', newEvent)
      newEvent.title = event.title
      newEvent.description = event.description
      newEvent.save(() => {
        console.log('event updated')
        callback()
      })
    } else {
      console.log('User unauthorized')
      callback()
    }
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
  deleteEvent,
  searchByTitle
}
