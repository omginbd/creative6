const mongoose = require('mongoose')

const PlayerSchema = mongoose.Schema({
  battleName: String,
  battleTag: String,
  battleId: String
})

PlayerSchema.methods.getName = () => {
  if (!this.battleName) return this.battleTag.split('#')[0]
  return this.battleName
}

const Player = mongoose.model('Player', PlayerSchema)

module.exports = Player
