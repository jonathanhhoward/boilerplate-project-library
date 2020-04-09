/*
*
*
*       Complete the API routing below
*
*
*/

'use strict'

const { ObjectID } = require('mongodb')

module.exports = function (app, db) {
  const books = db.collection('books')

  app.route('/api/books')
    .get(function (req, res) {
      books.find()
        .toArray()
        .then((results) => res.json(
          results.map((doc) => ({
            _id: doc._id,
            title: doc.title,
            commentcount: doc.comments.length
          }))
        ))
        .catch(console.error)
    })

    .post(function (req, res) {
      const book = {
        title: req.body.title,
        comments: []
      }

      if (!book.title) return res.send('missing title')

      books.insertOne(book)
        .then((result) => res.json(result.ops[0]))
        .catch(console.error)
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
    })

  app.route('/api/books/:id')
    .get(function (req, res) {
      books.findOne({ _id: ObjectID(req.params.id) })
        .then((result) => {
          if (!result) return res.send('no book exists')

          res.json(result)
        })
        .catch(console.error)
    })

    .post(function (req, res) {
      const bookId = { _id: ObjectID(req.params.id) }

      books.findOne(bookId)
        .then((result) => {
          if (!result) return res.send('no book exists')

          books.findOneAndUpdate(bookId, {
            $set: { comments: result.comments.concat(req.body.comment) }
          })
            .then((updatedResult) => res.json(updatedResult.value))
            .catch(console.error)
        })
        .catch(console.error)
    })

    .delete(function (req, res) {
      const bookid = req.params.id
      //if successful response will be 'delete successful'
    })

}
