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
