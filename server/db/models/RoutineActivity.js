const Sequelize = require('sequelize')
const db = require('../db')

const RoutineActivity = db.define('routine_activities', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  activityId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'activities',
      key: 'id'
    }
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  activityName: {
    type: Sequelize.STRING,
    allowNull: false
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