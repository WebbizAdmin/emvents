const express = require('express')
const data = require('../data')
const router = express.Router()
const uuidV1 = require('uuid/v1')

let db = data.events;

const filterEvents = (eventId) => {
  return data.events.filter((obj) => {
    return eventId == obj.id
  })
}
router.get('/', (req, res) => {
  res.send(data.events)
})

router.get('/:id', (req, res) => {
  const event = filterEvents(req.params.id)
  res.send(event)
})

router.post('/', (req, res) => {
  
  let newEvent = req.body;
  newEvent.id = uuidV1();

  // const newEvent = {
  //   ...postData, id: uuidV1()
  // }

  const newData = [...data.events, newEvent];
  
  db = newData;

  res.json({ 
    message: 'Event has been added',
    events: db
  });

})

module.exports = router
