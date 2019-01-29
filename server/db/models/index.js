const User = require('./user')
const Channel = require('./channel')

User.belongsToMany(Channel, { through: 'UserChannel' })
Channel.belongsToMany(User, { through: 'UserChannel' })

module.exports = {
  User,
  Channel
}
