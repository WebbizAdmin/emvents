const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const should = chai.should()
const server = require('../')
const uuidV1 = require('uuid/v1')

chai.use(chaiHttp)
let userId = null
let eventId = null
const login = 'JohnDoe'
const password = 'password'
describe('/POST it creates a single user ', () => {
  it('it should POST an user', (done) => {
    let user = {
      userName: login,
      password: password,
      fullName: 'John M. Doe',
      email: 'john@deo.com'
    }
    chai.request(server)
      .post(`/v1/users`)
      .send(user)
      .end((err, res) => {
        console.log('user POST Test res: ', res.body.user._id)
        getNewId = res.body.user._id
        userId = getNewId
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('message').eql('User has been added')
        done()
      })
  })
})
describe('/POST it creates another single user ', () => {
  it('it should POST an user', (done) => {
    let user = {
      userName: 'login',
      password: password,
      fullName: 'John M. Doe',
      email: 'john@deo.com'
    }
    chai.request(server)
      .post(`/v1/users`)
      .send(user)
      .end((err, res) => {
        console.log('user POST Test res: ', res.body.user._id)
        getNewId = res.body.user._id
        userId = getNewId
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('message').eql('User has been added')
        done()
      })
  })
})
describe('/POST it creates a single event if autorized ', () => {
  it('it should POST an event', (done) => {
    console.log('User ID', userId)
    let event = {
      title: 'The Lord of the Rings',
      description: 'J.R.R. Tolkien',
      date: '2014-10-13T09:13:00.000Z',
      user: userId
    }
    chai.request(server)
      .post(`/v1/events`)
      .auth(login, password)
      .send(event)
      .end((err, res) => {
        if (err) {
          console.log('Error', err.status)
          done()
        }
        console.log('POST Test res: ', res.body.event._id)
        eventId = res.body.event._id
        console.log('eventId is ', eventId)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('message').eql('Event has been added')
        done()
      })
  })
})

describe('/PUT/:id it updates a single event by ID if the author is the same', () => {
  it('it should PUT a single event', (done) => {
    let event = {
      _id: eventId,
      title: 'New Title for test'
    }
    chai.request(server)
      .put(`/v1/events/${event._id}`)
      .auth(login, password)
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
describe('/PUT/:id it NOT update a single event by ID if the author is NOT the same', () => {
  it('it should NOT PUT a single event', (done) => {
    let event = {
      _id: eventId,
      title: 'New Title for test'
    }
    chai.request(server)
      .put(`/v1/events/${event._id}`)
      .auth('login', password)
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
