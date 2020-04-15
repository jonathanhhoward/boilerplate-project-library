'use strict'

const router = require('express').Router()
const api = require('../handlers')

router.route('/books')
  .get(api.listBooks)
  .post(api.addBook)
  .delete(api.clearBooks)

router.route('/books/:id')
  .get(api.viewBook)
  .post(api.addComment)
  .delete(api.removeBook)

module.exports = router
