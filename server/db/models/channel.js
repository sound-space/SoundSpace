const Sequelize = require('sequelize');

const db = require('../db');

const Channel = db.define('channel', {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  // Time in MS
  timestamp: {
    type: Sequelize.DATE,
  },
});

module.exports = Channel;
