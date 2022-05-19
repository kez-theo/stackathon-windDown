//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Activity = require('./models/Activity')
const RoutineActivity = require('./models/RoutineActivity')

//associations could go here!
Activity.belongsToMany(User, { 
  as: "users",
  through: "routine_activities",
  foreignKey: "activityId"
});

User.belongsToMany(Activity, { 
  as: "activities",
  through: "routine_activities",
  foreignKey: "userId" 

});

module.exports = {
  db,
  models: {
    User,
    Activity,
    RoutineActivity
  },
}
