const Sequelize = require('sequelize');

const db = require('../db');

const Song = db.define('song', {
  songId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  votes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  played: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isPlaying: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isLast: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Song;
