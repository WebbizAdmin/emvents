const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  _id: String,
  username: String,
  password: String,
  fullName: String,
  email: String
})

module.exports = mongoose.model('User', UserSchema)
