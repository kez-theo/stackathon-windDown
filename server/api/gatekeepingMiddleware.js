// store all of our functions that act as middleware between our requests and responses
const { models: { User } } = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    console.log(user)
    next();
  } catch (e) {
    next(e);
  }
};

// checks to see if the user is an admin to access certain routes
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    console.log("You shall not pass!")
    res.status(403).send("You shall not pass!");
  } else {
    //if my user IS an admin, pass them forward!
    console.log("is Admin!");
    next();
  }
};

module.exports = {
  requireToken,
  isAdmin
};
