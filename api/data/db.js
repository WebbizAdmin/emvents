const mongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017/emvents'

const insertEventInDb = (event, db, callback) => {
  var collection = db.collection('events')
  collection.insertMany([
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
    })
    const collection = db.collection('events')
    collection.insertMany([
      event
    ], (err, result) => {
      assert.equal(err, null)
    })
  })
}
module.exports = {
  insertEvent
}
