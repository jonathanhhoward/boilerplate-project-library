'use strict'

const { connect } = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {
  listBooks,
  clearBooks,
  addBook,
  removeBook,
  addComment,
  viewBook
}

function listBooks (req, res) {
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
}

function addBook (req, res) {
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
}

function clearBooks (req, res) {
  connect.then((client) => {
    client.db().collection('books')
      .drop()
      .then((result) => {
        result ? res.send('complete delete successful') : res.send('no deletion')
      })
      .catch(console.error)
  })
    .catch(console.error)
}

function viewBook (req, res) {
  connect.then((client) => {
    client.db().collection('books')
      .findOne({ _id: ObjectID(req.params.id) })
      .then((result) => {
        result ? res.json(result) : res.send('no book exists')
      })
      .catch(console.error)
  })
    .catch(console.error)
}

function addComment (req, res) {
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
}

function removeBook (req, res) {
  connect.then((client) => {
    client.db().collection('books')
      .findOneAndDelete({ _id: ObjectID(req.params.id) })
      .then((result) => {
        result.value ? res.send('delete successful') : res.send('no book exists')
      })
      .catch(console.error)
  })
    .catch(console.error)
}
