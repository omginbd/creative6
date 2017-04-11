const Bluebird = require('bluebird')
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const matchesRoutes = require('./routes/matches.js')
const usersRoutes = require('./routes/users.js')

// Global Config
const PORT = process.env.PORT || 3002

// DB Config
mongoose.Promise = Bluebird
mongoose.connect('mongodb://localhost/matchhistory')
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true)
}

// Server Config
const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))

// Routes
app.use(express.static('client'))
matchesRoutes(app)
usersRoutes(app)

// Start Server
app.listen(PORT, () => {
  console.log('App listening on port ' + PORT)
})
