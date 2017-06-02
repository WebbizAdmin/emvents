const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  userName: String,
  password: String,
  fullName: String,
  email: String,
  events: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }]
})

module.exports = mongoose.model('User', UserSchema)
