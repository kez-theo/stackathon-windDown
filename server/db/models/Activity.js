const Sequelize = require('sequelize')
const db = require('../db')

const Activity = db.define('activities', {
  activityName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  time: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { 
      min: 0, 
      max: 1440 
    }
  }
})

module.exports = Activity