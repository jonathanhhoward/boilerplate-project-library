/*
*
*
*       Complete the API routing below
*
*
*/

'use strict'

const { connect } = require('../db')
const { ObjectID } = require('mongodb')

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res) {
      connect.then((client) => {
        client.db().collection('books')
          .find()
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
        .catch(console.error)
    })

    .post(function (req, res) {
      const book = {
        title: req.body.title,
        comments: []
      }

      if (!book.title) return res.send('missing title')

      connect.then((client) => {
        client.db().collection('books')
          .insertOne(book)
          .then((result) => res.json(result.ops[0]))
          .catch(console.error)
      })
        .catch(console.error)
    })

    .delete(function (req, res) {
      connect.then((client) => {
        client.db().collection('books')
          .drop()
          .then((result) => {
            result ? res.send('complete delete successful') : res.send('no deletion')
          })
          .catch(console.error)
      })
        .catch(console.error)
    })

  app.route('/api/books/:id')
    .get(function (req, res) {
      connect.then((client) => {
        client.db().collection('books')
          .findOne({ _id: ObjectID(req.params.id) })
          .then((result) => {
            result ? res.json(result) : res.send('no book exists')
          })
          .catch(console.error)
      })
        .catch(console.error)
    })

    .post(function (req, res) {
      connect.then((client) => {
        client.db().collection('books')
          .findOneAndUpdate(
            { _id: ObjectID(req.params.id) },
            { $push: { comments: req.body.comment } },
            { returnOriginal: false }
          )
          .then((result) => {
            result.value ? res.json(result.value) : res.send('no book exists')
          })
          .catch(console.error)
      })
        .catch(console.error)
    })

    .delete(function (req, res) {
      connect.then((client) => {
        client.db().collection('books')
          .findOneAndDelete({ _id: ObjectID(req.params.id) })
          .then((result) => {
            result.value ? res.send('delete successful') : res.send('no book exists')
          })
          .catch(console.error)
      })
        .catch(console.error)
    })
}
