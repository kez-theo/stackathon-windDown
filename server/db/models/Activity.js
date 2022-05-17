const Sequelize = require('sequelize')
const db = require('../db')

const Activity = db.define('activity', {
  activityName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 5,
    validate: { 
      min: 5, 
      max: 60 
    }
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