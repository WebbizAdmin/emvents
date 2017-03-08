const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// This modification is for testinb branches and pull-request
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.post('/add', (req, res) => {
  res.send(`Data recieved ${req.body.name}`);
})

app.listen(3005, () => {
  console.log('Example app listening on port 3005!');
})