const passport = require('passport')

const User = require('../models/user.js')

module.exports = (app) => {
  app.post('/users/login', passport.authenticate('local'), loginUser)
  app.post('/users/signup', newUser)
  app.get('/users/logout', logout)
}

const loginUser = (req, res) => {
  res.redirect('/')
}

const newUser = (req, res) => {
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
    if (err) return res.redirect('/login.html')
    passport.authenticate('local')(req, res, () => {
      res.redirect('/')
    })
  })
}

const logout = (req, res) => {
  req.logout()
  res.redirect('/login.html')
}
