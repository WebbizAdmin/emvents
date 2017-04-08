const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
  _id: String,
  title: { type: [String], index: true },
  description: String,
  date: String
})

module.exports = mongoose.model('Event', EventSchema)
