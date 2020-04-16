'use strict'

const router = require('express').Router()
const api = require('../controller')

router.route('/books')
  .get(api.listBooks)
  .post(api.createBook)
  .delete(api.clearBooks)

router.route('/books/:id')
  .get(api.getBook)
  .post(api.addComment)
  .delete(api.removeBook)

module.exports = router
