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
    defaultValue:
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
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
