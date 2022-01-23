//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Activity = require('./models/Activity')

//associations could go here!
Activity.belongsTo(User);
User.hasMany(Activity);

module.exports = {
  db,
  models: {
    User,
    Activity
  },
}
