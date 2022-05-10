const Sequelize = require('sequelize')
const db = require('../db')

const Routine = db.define('routine', {
  bedtime: {
    type: Sequelize.INTEGER,
  }
})

module.exports = Routine