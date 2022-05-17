//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Activity = require('./models/Activity')
const Routine = require('./models/Routine')
const RoutineActivity = require('./models/RoutineActivity')

//associations could go here!

User.hasMany(Routine)
Routine.belongsTo(User)

Activity.belongsToMany(Routine, { 
  as: "routine",
  through: "routine_activities",
  foreignKey: "activityId"
});

Routine.belongsToMany(Activity, { 
  as: "activity",
  through: "routine_activities",
  foreignKey: "routineId" 

});


module.exports = {
  db,
  models: {
    User,
    Activity,
    Routine,
    RoutineActivity
  },
}
