const router = require("express").Router();
const { models: { User, Activity, RoutineActivity} } = require("../db");
const { requireToken } = require("./gatekeepingMiddleware");
module.exports = router;

router.get("/", requireToken, async (req, res, next) => {
  try {
    const routine = await RoutineActivity.findAll({
      where: {
        userId: req.user.id
      },
      // include: [
      //   {
      //     model: Activity,
      //     as: 'activity',
      //     attributes: ["id", "activityName"],
      //     through: { attributes: [] },
      //     required: true
      //   },
      // ],
    });
    if (routine) {
      res.json(routine);
    } 
  } catch (err) {
    next(err);
  }
});

// for (let i = 0; i < activities.length; i++) {
//   let activity = activities[i]
//   activity.activityName = activities[i].activityName
//   await user.addActivity(activity)
// };
// const routine = await RoutineActivity.findAll({
//   where: {
//     userId: req.user.id
//   },
// })

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

//Will need to use a token to modify data in the future. Look at file auth/index.
router.put("/:id", requireToken, async (req, res, next) => {
  try {
    // const routine = await Routine.findOne({
    //   where: {
    //     userId: req.user.id,
    //   },
    //   attributes: ["id", "bedtime"],
    //   include: [
    //     {
    //       model: Activity,
    //       attributes: ["id", "activityName", "duration", "time"],
    //       through: { attributes: [] },
    //       required: true,
    //     },
    //   ],
    // });
    const routine = await Routine.findOne({
      where: {
        userId: req.user.id,
      },
    });
    const activity = await RoutineActivity.findOne({
      where: {
        routineId: routine.id,
        activityId: req.params.id,
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
    // routine.setActivities(activity.id)
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
