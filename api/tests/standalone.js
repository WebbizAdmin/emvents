const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const should = chai.should()
const server = require('../')
const uuidV1 = require('uuid/v1')

chai.use(chaiHttp)
// chai.request(app)
//   .get('/v1/events/')
//   .end(function (err, res) {
//     expect(err).to.be.null
//     expect(res).to.have.status(200)
//   })

// describe('/GET events', () => {
//   it('it should GET all the events', (done) => {
//     chai.request(server)
//             .get('/v1/events')
//             .end((err, res) => {
//               res.should.have.status(200)
//             //   res.body.should.be.a('array')
//             //   res.body.length.should.be.eql(0)
//               done()
//             })
//   })
// })

// describe('/GET/:id a single event ', () => {
//   it('it should GET an event from the id', (done) => {
//     let event = {
//       id: 2
//     }
//     chai.request(server)
//       .get(`/v1/events/${event.id}`)
//       .end((err, res) => {
//         res.should.have.status(200)
//         res.body.should.not.be.a('array')
//         done()
//       })
//   })
// })

let getNewId = null

describe('/POST it creates a single event if autorized ', () => {
  it('it should POST an event', (done) => {
    let event = {
      title: 'The Lord of the Rings',
      description: 'J.R.R. Tolkien',
      date: '2014-10-13T09:13:00.000Z',
      userLogin: 'jason'
    }
    chai.request(server)
      .post(`/v1/events`)
      .auth('jason', 'password')
      .send(event)
      .end((err, res) => {
        if (err) {
          console.log('Error', err.status)
          done()
        }
        console.log('POST Test res: ', res.body.event._id)
        getNewId = res.body.event._id
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('message').eql('Event has been added')
        done()
      })
  })
})

describe('/PUT/:id it updates a single event by ID ', () => {
  it('it should PUT a single event', (done) => {
    let event = {
      _id: getNewId,
      title: 'New Title for test'
    }
    chai.request(server)
      .put(`/v1/events/${event._id}`)
      .auth('jason', 'password')
      .send(event)
      .end((err, res) => {
        let title = res.body.event.title
        expect(title).to.equal('New Title for test')
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('message').eql('Event has been updated')
        done()
      })
  })
})

describe('/DELETE/:id it delete a single event by ID ', () => {
  it('it should DELETE a single event', (done) => {
    let event = {
      _id: getNewId
    }
    chai.request(server)
      .delete(`/v1/events/${event._id}`)
      .auth('jason', 'password')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('message').eql('Event has been deleted')
        done()
      })
  })
})

describe('/POST it creates a single user ', () => {
  it('it should POST an user', (done) => {
    let user = {
      userName: 'JohnDoe' + uuidV1(),
      password: 'secretWords',
      fullName: 'John M. Doe',
      email: 'john@deo.com'
    }
    chai.request(server)
      .post(`/v1/users`)
      .send(user)
      .end((err, res) => {
        console.log('user POST Test res: ', res.body.user._id)
        getNewId = res.body.user._id
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('message').eql('User has been added')
        done()
      })
  })
})
