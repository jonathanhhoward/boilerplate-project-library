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

  app.route('/api/books')
    .get(function (req, res) {
      db.collection('books')
        .find()
        .toArray()
        .then((books) => res.json(
          books.map((book) => ({
            _id: book._id,
            title: book.title,
            commentcount: book.comments.length
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

      db.collection('books')
        .insertOne(book)
        .then((result) => res.json(result.ops[0]))
        .catch(console.error)
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
    })

  app.route('/api/books/:id')
    .get(function (req, res) {
      db.collection('books')
        .findOne({ _id: ObjectID(req.params.id) })
        .then((result) => {
          if (!result) return res.send('no book exists')

          res.json(result)
        })
        .catch(console.error)
    })

    .post(function (req, res) {
      const bookid = req.params.id
      const comment = req.body.comment
      //json res format same as .get
    })

    .delete(function (req, res) {
      const bookid = req.params.id
      //if successful response will be 'delete successful'
    })

}
