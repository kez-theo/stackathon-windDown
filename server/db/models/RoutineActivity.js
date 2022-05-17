const Sequelize = require('sequelize')
const db = require('../db')
const Activity = require('./Activity')

const RoutineActivity = db.define('routine_activities', {
  routineId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'routine',
      key: 'id'
    }
  },
  activityId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'activity',
      key: 'id'
    }
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
},
{
  timestamps: false
})

module.exports = RoutineActivity