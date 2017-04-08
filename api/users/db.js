const User = require('./model')

const insertUser = (user, done) => {
  console.log('incert', user)
  const newUser = new User(user)
  console.log('newUser', newUser)
  newUser.save((err, user) => {
    console.log('error ', err)
    console.log('user saved')
    done(err, user)
  })
}

const findUser = (userName, done) => {
  User.findOne({ userName: userName }, (err, user) => {
    if (err) {
      console.log('ERROR: NO USER', err)
    }
    return done(err, user)
  }
  )
}

module.exports = {
  insertUser,
  findUser
}
