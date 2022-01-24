const { models: { User } } = require("../db");

//created bedtime function
const convertBedtime = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  convertBedtime
};
