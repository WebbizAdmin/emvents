const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
  title: String,
  description: String,
  date: String
})

EventSchema.index({ title: 1})


module.exports = mongoose.model('Event', EventSchema)
