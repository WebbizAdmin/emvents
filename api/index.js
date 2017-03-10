const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const event = require('./events');

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send(event);
})

app.post('/add', (req, res) => {
  res.send(`Data recieved ${req.body.name}`);
})

app.listen(3005, () => {
  console.log('Example app listening on port 3005!');
})