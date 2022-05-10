//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Activity = require('./models/Activity')
const Routine = require('./models/Routine')

//associations could go here!
const routine_activities = db.define("routine_activities", {}, { timestamps: false });

User.hasMany(Routine)
Routine.belongsTo(User)
Activity.belongsToMany(Routine, { through: "routine_activities" });
Routine.belongsToMany(Activity, { through: "routine_activities" });


module.exports = {
  db,
  models: {
    User,
    Activity,
    Routine
  },
}
