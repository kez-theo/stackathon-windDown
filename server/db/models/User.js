const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Routine = require('./Routine')

const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
  },
  bedtime: {
    type: Sequelize.STRING,
  },
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
}

User.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT)
}

/**
 * classMethods
 */
User.authenticate = async function({ username, password }){
    const user = await this.findOne({where: { username }})
    if (!user || !(await user.correctPassword(password))) {
      const error = Error('Incorrect username/password');
      error.status = 401;
      throw error;
    }
    return user.generateToken();
};

User.findByToken = async function(token) {
  try {
    const {id} = await jwt.verify(token, process.env.JWT)
    const user = User.findByPk(id)
    if (!user) {
      throw 'nooo'
    }
    return user
  } catch (ex) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}

/**
 * hooks
 */
const hashPassword = async(user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}

const addRoutine = async(user) => {
  const routine = await Routine.create()
  routine.setUser(user)
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))

User.afterCreate(addRoutine)
User.afterBulkCreate(users => Promise.all(users.map(addRoutine)))


// bedtime: {
//   type: Sequelize.TIME,
//   defaultValue: 11:30
// },
// bedtimeHour: {
//   type: Sequelize.INTEGER,
//   allowNull: false,
//   defaultValue: 0,
//   validate: { 
//     min: 0, 
//     max: 24 
//   }
// },
// bedtimeMin: {
//   type: Sequelize.INTEGER,
//   allowNull: false,
//   defaultValue: 00,
//   validate: { 
//     min: 0, 
//     max: 60 
//   }
// }

// bedtime: {
//   type: Sequelize.INTEGER,
//   allowNull: false,
//   defaultValue: 1340,
//   validate: { 
//     min: 0, 
//     max: 1440 
//   }
// }