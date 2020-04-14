/*
*
*
*       Complete the API routing below
*
*
*/

'use strict'

const api = require('../handlers')

module.exports = function (app) {

  app.route('/api/books')
    .get(api.listBooks)
    .post(api.addBook)
    .delete(api.clearBooks)

  app.route('/api/books/:id')
    .get(api.viewBook)
    .post(api.addComment)
    .delete(api.removeBook)
}
