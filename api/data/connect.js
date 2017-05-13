const mongoose = require('mongoose')
var mongodb = require('mongodb')
const authorization = require('../users/autorization')
const url = 'mongodb://localhost:27017/emvents'

// mongodb.connect(url, (err, db) => {
//   console.log('connected to mongo')
//

// })
mongoose.connect(url, () => {
  const db = mongoose.connection.db
  authorization.initializeAcl(db)
})
