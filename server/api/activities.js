const router = require("express").Router();
const { models: { User, Activity} } = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");
module.exports = router;

//the routes are mounted on /activities in the index
//this is to get the bedtime routine of the user
router.get("/", requireToken, async (req, res, next) => {
  try {
    const routine = await Activity.findAll({
      where: {
        userId: req.user.id,
      },
      attributes: ["id", "name", "duration", "time"],
    });
    res.json(routine);
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

//Will need to use a token to modify data in the future. Look at file auth/index.
router.put("/:id", async (req, res, next) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    res.json(await activity.update(req.body));
  } catch (err) {
    next(err);
  }
});

//Will need to use a token to modify data in the future. Look at file auth/index.
router.delete("/:id", async (req, res, next) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    await activity.destroy()
    res.json(activity);
  } catch (err) {
    next(err);
  }
});

//Will need to use a token to modify data in the future. Look at file auth/index.
router.post("/", async (req, res, next) => {
  try {
    const activity = await Activity.create(req.body);
    res.json(activity);
  } catch (err) {
    next(err);
  }
});