const router = require("express").Router();
const { models: { User, Activity, RoutineActivity} } = require("../db");
const { requireToken } = require("./gatekeepingMiddleware");
module.exports = router;

//get user's routine
router.get("/", requireToken, async (req, res, next) => {
  try {
    const routine = await RoutineActivity.findAll({
      where: {
        userId: req.user.id
      },
    });
    if (routine) {
      res.json(routine);
    } 
  } catch (err) {
    next(err);
  }
});

//create user's routine
router.post("/", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    const activities = await Activity.findAll()
    for (let i = 0; i < activities.length; i++) {
      let activity = activities[i]
      await user.addActivity(activity, 
        { through: {
        activityName: activities[i].activityName
        }
      })
    };
    const routine = await RoutineActivity.findAll({
      where: {
        userId: req.user.id
      },
    })
    if (routine) {
      res.json(routine);
    } else {
      console.log("create routine error!");
      throw new Error();
    }
  } catch (err) {
    next(err);
  }
});

//add or delete items from user's routine
router.put("/:activityId", requireToken, async (req, res, next) => {
  try {
    const activity = await RoutineActivity.findOne({
      where: {
        userId: req.user.id,
        activityId: req.params.activityId,
      },
    });
    if (!activity.active) {
      await activity.update({
        active: true 
      })
    } else {
      await activity.update({
        active: false
      })
    }
    await activity.save()
    res.json(activity)
  } catch (err) {
    next(err);
  }
});

//update time from user's routine
router.put("/:activityId/duration", requireToken, async (req, res, next) => {
  try {
    const activity = await RoutineActivity.findOne({
      where: {
        userId: req.user.id,
        activityId: req.params.activityId,
      },
    });
    const updatedActivity = await activity.update(req.body)
    await updatedActivity.save()
    res.json(updatedActivity)
  } catch (err) {
    next(err);
  }
});

