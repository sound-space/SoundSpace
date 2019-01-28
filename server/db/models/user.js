const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // profileUrl:
  spotifyId: {
    type: Sequelize.STRING
  }
})

module.exports = User
