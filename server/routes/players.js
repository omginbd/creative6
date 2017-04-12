const Player = require('../models/player.js')

module.exports = function(app) {
  app.get('/players', authenticateUser, getPlayers)
  app.post('/players', authenticateUser, newPlayer)
  app.delete('/players/:_id', authenticateUser, deletePlayer)
}

const getPlayers = (req, res) => {
  Player.find({})
    .then(players => {
      res.json(players)
    })
}

const newPlayer = (req, res) => {
  const battleTag = req.body.battleTag
  const battleId = req.body.battleId
  const battleName = battleTag.split('#')[0]
  const player = new Player({battleName, battleTag, battleId})
  player.save()
    .then(newPlayer => {
      res.json(newPlayer)
    })
}

const deletePlayer = (req, res) => {
  const _id = req.params._id
  Player.remove({_id})
    .then(result => {
      res.json(result)
    })
}

const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated() || req.originalUrl === '/login.html') return next()
  res.sendStatus(302)
}
