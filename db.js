const { MongoClient } = require('mongodb')

const mongoClient = new MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true })

module.exports = {
  connect: mongoClient.connect()
}
