const User = require('./user');
const Channel = require('./channel');
const Song = require('./song');

User.belongsToMany(Channel, { through: 'UserChannel' });
Channel.belongsToMany(User, { through: 'UserChannel' });

Song.belongsTo(Channel);

module.exports = {
  User,
  Channel,
  Song,
};
