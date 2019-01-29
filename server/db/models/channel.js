const Sequelize = require('sequelize')

const db = require('../db')

const Channel = db.define('channel', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  currentlyPlaying: {
    type: Sequelize.STRING
  },
  // Time in MS
  currPlayingStartTime: {
    type: Sequelize.DATE
  }
})

module.exports = Channel
