'use strict'

const { MongoClient } = require('mongodb')
const { ObjectID } = require('mongodb')

const connection = new MongoClient(
  process.env.MONGODB_URI,
  { useUnifiedTopology: true }
).connect()

module.exports = {
  getAll,
  create,
  drop,
  get,
  update,
  remove
}

async function getAll () {
  try {
    const client = await connection
    const results = await client.db().collection('books')
      .find()
    return results.toArray()
  } catch (e) {
    console.error(e)
  }
}

async function create (title) {
  const book = {
    title: title,
    comments: []
  }

  try {
    const client = await connection
    const result = await client.db().collection('books')
      .insertOne(book)
    return result.ops[0]
  } catch (err) {
    console.error(err)
  }
}

async function drop () {
  try {
    const client = await connection
    return await client.db().collection('books')
      .drop()
  } catch (err) {
    console.error(err)
  }
}

async function get (id) {
  try {
    const client = await connection
    return await client.db().collection('books')
      .findOne({ _id: ObjectID(id) })
  } catch (err) {
    console.error(err)
  }
}

async function update (id, comment) {
  try {
    const client = await connection
    const result = await client.db().collection('books')
      .findOneAndUpdate(
        { _id: ObjectID(id) },
        { $push: { comments: comment } },
        { returnOriginal: false }
      )
    return result.value
  } catch (err) {
    console.error(err)
  }
}

async function remove (id) {
  try {
    const client = await connection
    const result = await client.db().collection('books')
      .findOneAndDelete({ _id: ObjectID(id) })
    return result.value
  } catch (err) {
    console.error(err)
  }
}
