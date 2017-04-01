const mongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017/emvents'
const eventsCollection = 'events'
// get collection
const getCollection = (db, collName) => {
  return db.collection(collName)
}

// Insert
const insertEventInDb = (event, db, callback) => {
  console.log('incert', event)
  getCollection(db, eventsCollection).insertMany([
    event
  ], (err, result) => {
    assert.equal(err, null)
    console.log('Inserted 1 event the collection')
    callback(result)
  })
}

const insertEvent = (event, cb) => {
  mongoClient.connect(url, (err, db) => {
    assert.equal(null, err)
    console.log('connected', event)
    insertEventInDb(event, db, () => {
      console.log('Close de connection')
      db.close()
      cb()
    })
  })
}

// Update
const updateEventInDb = (event, db, callback) => {
  console.log('update', event)
  getCollection(db, eventsCollection).updateOne(
    { _id: event.id },
    { $set: {
      title: event.title,
      description: event.description,
      date: event.date
    } }, (err, result) => {
      assert.equal(err, null)
      console.log('Updated the event')
      callback(result)
    })
}

const updateEvent = (event, cb) => {
  mongoClient.connect(url, (err, db) => {
    assert.equal(null, err)
    console.log('Connected for the update', event)
    updateEventInDb(event, db, () => {
      console.log('Close update connection')
      db.close()
      cb()
    })
  })
}

// Delete event

const deleteEventInDb = (id, db, callback) => {
  console.log('delete', id)
  getCollection(db, eventsCollection).deleteOne(
    { _id: id }, (err, result) => {
      assert.equal(err, null)
      console.log('Removed the documentfrom events')
      callback(result)
    })
}

const deleteEvent = (id, cb) => {
  mongoClient.connect(url, (err, db) => {
    assert.equal(null, err)
    console.log('Connected for the delete event', id)
    deleteEventInDb(id, db, () => {
      console.log('Close delete connection')
      db.close()
      cb()
    })
  })
}

module.exports = {
  insertEvent,
  updateEvent,
  deleteEvent
}
