const Bluebird = require('bluebird')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const expressSession = require('express-session')
const mongoose = require('mongoose')
const morgan = require('morgan')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('./models/user.js')
const matchesRoutes = require('./routes/matches.js')
const playersRoutes = require('./routes/players.js')
const usersRoutes = require('./routes/users.js')

// Global Config
const PORT = process.env.PORT || 3002

// DB Config
mongoose.Promise = Bluebird
mongoose.connect('mongodb://your:mom@ds163718.mlab.com:63718/golfbot')
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true)
}

// Server Config
const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))

app.use(expressSession({secret: 'hunting vampires with my grandkids it\'s tiny rick!'}))
app.use(passport.initialize())
app.use(passport.session())

// Auth Config
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Routes
app.use((req, res, next) => {
  if (!req.isAuthenticated() && req.originalUrl === '/index.html') return res.redirect('/login.html')
  return next()
})

app.use(express.static('client'))
usersRoutes(app, passport)
matchesRoutes(app, passport)
playersRoutes(app, passport)

// Start Server
app.listen(PORT, () => {
  console.log('App listening on port ' + PORT)
})
