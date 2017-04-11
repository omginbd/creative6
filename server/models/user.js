const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  battleName: String,
  battleTag: String,
  battleId: String
})

UserSchema.methods.getName = () => {
  if (!this.battleName) return this.battleTag.split('#')[0]
  return this.battleName
}

const User = mongoose.model('User', UserSchema)

module.exports = User
