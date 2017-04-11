const blizzard = require('blizzard.js').initialize({
  apikey: 'hkuhrbpegmaapz2uc75t9mgs3t2qus2t',
  origin: 'us',
  locale: 'en_us'
})

const User = require('../models/user.js')

module.exports = function(app) {
  app.get('/matches/:_id', getMatches)
}

const getMatches = (req, res) => {
  const _id = req.params._id
  User.find({_id})
    .then(result => {
      const profile = result[0]
      console.log(profile)
      blizzard.sc2.profile('matches', {id: profile.battleId, name: profile.battleName})
        .then(resp => {
          res.json(resp.data)
        })
        .catch(err => {
          console.log(err)
        })
    })
}
