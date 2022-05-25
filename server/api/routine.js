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

// router.post("/", requireToken, async (req, res, next) => {
//   try {
//     console.log("req.body", req.body)
//     const routineActivity = await Activity.findByPk(req.body.id) 
//     const routine = await Routine.findOne({ 
//       attributes: ["id", "bedtime"],
//       include: [
//         {
//           model: Activity,
//           attributes: ["id", "activityName", "duration", "time"],
//           through: { attributes: [] },
//         },
//       ],
//     });
//     console.log("routine activity", routineActivity)
//     routine.addActivity(routineActivity.id)
//     res.json(routineActivity)
//   } catch (err) {
//     next(err);
//   }
// });

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
