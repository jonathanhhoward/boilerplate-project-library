/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*
*/

const chaiHttp = require('chai-http')
const chai = require('chai')
const assert = chai.assert
const server = require('../server')

chai.use(chaiHttp)

suite('Functional Tests', function () {
  suite('Routing tests', function () {
    const basicRoute = '/api/books'
    const idRoute = '/api/books/:id'

    suite('POST /api/books with title => create book object/expect book object', function () {
      test('Test POST /api/books with title', function (done) {
        const book = {
          title: 'test'
        }

        chai.request(server)
          .post(basicRoute)
          .send(book)
          .end(function (err, res) {
            assert.strictEqual(res.status, 200)
            assert.strictEqual(res.body.title, book.title)
            done()
          })
      })

      test('Test POST /api/books with no title given', function (done) {
        const book = {
          title: ''
        }

        chai.request(server)
          .post(basicRoute)
          .send(book)
          .end(function (err, res) {
            assert.strictEqual(res.status, 200)
            assert.strictEqual(res.text, 'missing title')
            done()
          })
      })
    })

    suite('GET /api/books => array of books', function () {
      test('Test GET /api/books', function (done) {
        chai.request(server)
          .get(basicRoute)
          .end(function (err, res) {
            assert.strictEqual(res.status, 200)
            assert.isArray(res.body)
            assert.property(res.body[0], 'commentcount')
            assert.property(res.body[0], 'title')
            assert.property(res.body[0], '_id')
            done()
          })
      })
    })

    suite('GET /api/books/[id] => book object with [id]', function () {
      test.skip('Test GET /api/books/[id] with id not in db', function (done) {
        //done();
      })

      test.skip('Test GET /api/books/[id] with valid id in db', function (done) {
        //done();
      })
    })

    suite('POST /api/books/[id] => add comment/expect book object with id', function () {
      test.skip('Test POST /api/books/[id] with comment', function (done) {
        //done();
      })
    })
  })
})
