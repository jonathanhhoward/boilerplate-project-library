'use strict'

const Book = require('./model')

module.exports = {
  listBooks: async function (req, res, next) {
    try {
      const books = await Book.getAll()

      res.json(
        books.map((book) => ({
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length
        }))
      )
    } catch (err) {
      next(err)
    }
  },

  addBook: async function (req, res, next) {
    if (!req.body.title) return res.send('missing title')

    try {
      const book = await Book.create(req.body.title)
      res.json(book)
    } catch (err) {
      next(err)
    }
  },

  clearBooks: async function (req, res, next) {
    try {
      const success = await Book.drop()

      if (success) {
        res.send('complete delete successful')
      } else {
        res.send('no deletion')
      }
    } catch (err) {
      next(err)
    }
  },

  viewBook: async function (req, res, next) {
    try {
      const book = await Book.get(req.params.id)

      if (book) {
        res.json(book)
      } else {
        res.send('no book exists')
      }
    } catch (err) {
      next(err)
    }
  },

  addComment: async function (req, res, next) {
    try {
      const book = await Book.update(req.params.id, req.body.comment)

      if (book) {
        res.json(book)
      } else {
        res.send('no book exists')
      }
    } catch (err) {
      next(err)
    }
  },

  removeBook: async function (req, res, next) {
    try {
      const success = await Book.remove(req.params.id)

      if (success) {
        res.send('delete successful')
      } else {
        res.send('no book exists')
      }
    } catch (err) {
      next(err)
    }
  }
}
