require('../data/connect')
const express = require('express')
const passport = require('passport')
var Strategy = require('passport-http').BasicStrategy
const db = require('./db')

passport.use(new Strategy(
    (username, password, done) => {
      db.findUser(username, (err, user) => {
        if (err) {
          console.log('Error: ', err)
          return done(err)
        }
        if (!user) {
          console.log('No user', user)
          return done(null, false)
        }
        if (!(user.password === password)) {
          return done(null, false)
        }
        console.log('User ', user)
        return done(null, user)
      })
    }
))
