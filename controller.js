'use strict'

const Book = require('./model')
const autoCatch = require('./auto-catch')

module.exports = autoCatch({
  listBooks: async function (req, res) {
    const books = await Book.list()

    res.json(
      books.map((book) => ({
        _id: book._id,
        title: book.title,
        commentcount: book.comments.length
      }))
    )
  },

  createBook: async function (req, res) {
    if (!req.body.title) return res.send('missing title')

    const book = await Book.create(req.body.title)
    res.json(book)
  },

  clearBooks: async function (req, res) {
    const success = await Book.drop()

    if (success) {
      res.send('complete delete successful')
    } else {
      res.send('no deletion')
    }
  },

  getBook: async function (req, res) {
    const book = await Book.get(req.params.id)

    if (book) {
      res.json(book)
    } else {
      res.send('no book exists')
    }
  },

  addComment: async function (req, res) {
    const book = await Book.update(req.params.id, req.body.comment)

    if (book) {
      res.json(book)
    } else {
      res.send('no book exists')
    }
  },

  removeBook: async function (req, res) {
    const success = await Book.remove(req.params.id)

    if (success) {
      res.send('delete successful')
    } else {
      res.send('no book exists')
    }
  }
})
