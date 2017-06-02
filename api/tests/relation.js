const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const should = chai.should()
const server = require('../')
const uuidV1 = require('uuid/v1')

chai.use(chaiHttp)
let userId = null

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
