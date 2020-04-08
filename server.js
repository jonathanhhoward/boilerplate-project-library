'use strict'

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const apiRoutes = require('./routes/api.js')
const fccTestingRoutes = require('./routes/fcctesting.js')
const runner = require('./test-runner')

const app = express()

const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true })

async function run () {
  try {
    await client.connect()
    console.log('Connected to MongoClient')

    const db = client.db()

    app.use('/public', express.static(process.cwd() + '/public'))

    app.use(cors({ origin: '*' })) //USED FOR FCC TESTING PURPOSES ONLY!

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    //Index page (static HTML)
    app.route('/')
      .get(function (req, res) {
        res.sendFile(process.cwd() + '/views/index.html')
      })

    //For FCC testing purposes
    fccTestingRoutes(app)

    //Routing for API
    apiRoutes(app, db)

    //404 Not Found Middleware
    app.use(function (req, res, next) {
      res.status(404)
        .type('text')
        .send('Not Found')
    })

    //Start our server and tests!
    const port = process.env.PORT || 3000
    app.listen(port, function () {
      console.log('Listening on port ' + port)
      if (process.env.NODE_ENV === 'test') {
        console.log('Running Tests...')
        setTimeout(function () {
          try {
            runner.run()
          } catch (err) {
            console.log('Tests are not valid:')
            console.log(err)
          }
        }, 1500)
      }
    })

  } catch (err) {
    console.log(err.stack)
  } finally {
    await client.close()
  }
}

run().catch(console.dir)

module.exports = app //for unit/functional testing
