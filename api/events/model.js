const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
  _id: String,
  title: String,
  description: String,
  date: String
})

module.exports = mongoose.model('Event', EventSchema)
