const router = require("express").Router();
const { models: { Activity } } = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");
module.exports = router;

//the routes are mounted on /activities in the index
router.get("/", async (req, res, next) => {
  try {
    const activities = await Activity.findAll();
    res.json(activities);
  } catch (err) {
    next(err);
  }
});

//Route to get a specific activity of user based off of id
//mounted on /activities/:id
router.get("/:id", async (res, req, next) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    res.json(activity);
  } catch (err) {
    next(err);
  }
});