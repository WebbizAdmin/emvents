const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./routes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/v1', routes)

app.listen(3005, () => {
  console.log('Example app listening on port 3005!')
})

module.exports = app
