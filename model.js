'use strict'

const { MongoClient, ObjectID } = require('mongodb')

const connection = new MongoClient(
  process.env.MONGODB_URI,
  { useUnifiedTopology: true }
).connect()

module.exports = {
  list: async function () {
    const client = await connection

    const results = await client.db().collection('books')
      .find()

    return results.toArray()
  },

  create: async function (title) {
    const book = {
      title: title,
      comments: []
    }

    const client = await connection

    const result = await client.db().collection('books')
      .insertOne(book)

    return result.ops[0]
  },

  drop: async function () {
    const client = await connection

    return await client.db().collection('books')
      .drop()
  },

  get: async function (id) {
    const client = await connection

    return await client.db().collection('books')
      .findOne({ _id: ObjectID(id) })
  },

  update: async function (id, comment) {
    const client = await connection

    const result = await client.db().collection('books')
      .findOneAndUpdate(
        { _id: ObjectID(id) },
        { $push: { comments: comment } },
        { returnOriginal: false }
      )

    return result.value
  },

  remove: async function (id) {
    const client = await connection

    const result = await client.db().collection('books')
      .findOneAndDelete({ _id: ObjectID(id) })

    return result.value
  }
}
