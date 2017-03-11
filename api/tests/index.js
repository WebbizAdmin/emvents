const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect()
const should = chai.should()
const server = require('../')

chai.use(chaiHttp)

// chai.request(app)
//   .get('/v1/events/')
//   .end(function (err, res) {
//     expect(err).to.be.null
//     expect(res).to.have.status(200)
//   })

describe('/GET events', () => {
  it('it should GET all the events', (done) => {
    chai.request(server)
            .get('/v1/events')
            .end((err, res) => {
              res.should.have.status(200)
            //   res.body.should.be.a('array')
            //   res.body.length.should.be.eql(0)
              done()
            })
  })
})
describe('/GET/:id a single event ', () => {
  it('it should GET an event from the id', (done) => {
    let event = {
      id: 2
    }
    chai.request(server)
      .get(`/v1/events/${event.id}`)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.not.be.a('array')
        done()
      })
  })
})
describe('/POST it creates a single event ', () => {
  it('it should POST an event', (done) => {
    let event = {
      id: 6,
      title: 'The Lord of the Rings',
      description: 'J.R.R. Tolkien',
      date: '2014-10-13T09:13:00.000Z'
    }
    chai.request(server)
      .post(`/v1/events`)
      .end((err, res) => {
       // console.log(res.body)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('message').eql('Event has been added')
        done()
      })
  })
})
