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
          result ? res.json(result) : res.send('no book exists')
        })
        .catch(console.error)
    })

    .post(function (req, res) {
      books.findOneAndUpdate(
        { _id: ObjectID(req.params.id) },
        { $push: { comments: req.body.comment } }
      )
        .then((result) => {
          result.value ? res.json(result.value) : res.send('no book exists')
        })
        .catch(console.error)
    })

    .delete(function (req, res) {
      books.findOneAndDelete({ _id: ObjectID(req.params.id) })
        .then((result) => {
          result.value ? res.send('delete successful') : res.send('no book exists')
        })
        .catch(console.error)
    })
}
