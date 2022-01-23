const router = require("express").Router();
const { models: { User, Activity} } = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");
module.exports = router;

//the routes are mounted on /activities in the index
//this is to get the bedtime routine of the user
router.get("/", requireToken, async (req, res, next) => {
  try {
    //if we managed to make it PAST require token, we can guarantee that we have a user!
    //isAdmin lets us check to see if that user is an Admin
    const routine = await Activity.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      where: {
        userId: req.user.id,
      },
      attributes: ["name", "duration", "time"],
    });
    res.json(routine);
  } catch (err) {
    next(err);
  }
});

//Route to get a specific activity of user based off of id
//mounted on /activities/:id
router.get("/:id", requireToken, async (res, req, next) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    res.json(activity);
  } catch (err) {
    next(err);
  }
});

//Will need to use a token to modify data in the future. Look at file auth/index.
router.put("/:id", requireToken, async (req, res, next) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    res.json(await activity.update(req.body));
  } catch (err) {
    next(err);
  }
});

//Will need to use a token to modify data in the future. Look at file auth/index.
router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    await activity.destroy()
    res.json(activity);
  } catch (err) {
    next(err);
  }
});

//Will need to use a token to modify data in the future. Look at file auth/index.
router.post("/", requireToken, async (req, res, next) => {
  try {
    const activity = await Activity.create(req.body);
    res.json(activity);
  } catch (err) {
    next(err);
  }
});