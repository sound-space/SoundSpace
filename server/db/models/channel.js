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
    defaultValue: 'https://static.thenounproject.com/png/80779-200.png',
    // allowNull: true,
    validate: {
      isUrl: true
    }
  },
  description: {
    type: Sequelize.STRING(50)
  }
})

module.exports = Channel
