const Sequelize = require('sequelize')

const db = require('../db')

const Channel = db.define('channel', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  // Time in MS
  timestamp: {
    type: Sequelize.DATE
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: './assets/ss_logo.png',
    validate: {
      isUrl: true
    }
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Channel
