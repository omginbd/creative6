const blizzard = require('blizzard.js').initialize({
  apikey: 'hkuhrbpegmaapz2uc75t9mgs3t2qus2t',
  origin: 'us',
  locale: 'en_us'
})

const Player = require('../models/player.js')

module.exports = function(app) {
  app.get('/matches/:_id', getMatches)
}

const getMatches = (req, res) => {
  const _id = req.params._id
  Player.find({_id})
    .then(result => {
      const profile = result[0]
      blizzard.sc2.profile('matches', {id: profile.battleId, name: profile.battleName})
        .then(resp => {
          res.json(resp.data)
        })
        .catch(err => {
          console.log(err)
        })
    })
}
