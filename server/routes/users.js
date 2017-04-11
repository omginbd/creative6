const User = require('../models/user.js')

module.exports = function(app) {
  app.get('/users', getUsers)
  app.post('/users', newUser)
  app.delete('/users/:_id', deleteUser)
}

const getUsers = (req, res) => {
  User.find({})
    .then(users => {
      res.json(users)
    })
}

const newUser = (req, res) => {
  const battleTag = req.body.battleTag
  const battleId = req.body.battleId
  const battleName = battleTag.split('#')[0]
  const user = new User({battleName, battleTag, battleId})
  user.save()
    .then(newUser => {
      res.json(newUser)
    })
}

const deleteUser = (req, res) => {
  const _id = req.params._id
  User.remove({_id})
    .then(result => {
      res.json(result)
    })
}
