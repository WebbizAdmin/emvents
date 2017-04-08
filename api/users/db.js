const User = require('./model')

const insertUser = (user, cb) => {
  console.log('incert', user)
  const newUser = new User(user)
  console.log('newUser', newUser)
  newUser.save((err, user) => {
    console.log('error ', err)
    console.log('user saved')
    cb(err, user)
  })
}

module.exports = {
  insertUser
}
