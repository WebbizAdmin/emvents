var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
  res.send('Hello World!');
})

app.post('/add', function (req, res) {
  res.send('Data recieved ' + req.body.name);
})

app.listen(3005, function () {
  console.log('Example app listening on port 3005!');
})