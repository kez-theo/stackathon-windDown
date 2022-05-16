const router = require("express").Router();
const { models: { User, Activity, Routine} } = require("../db");
const { requireToken } = require("./gatekeepingMiddleware");
module.exports = router;

router.get("/", requireToken, async (req, res, next) => {
  try {
    const routine = await Routine.findOne({
      where: {
        userId: req.user.id
      },
      attributes: ["id","bedtime"],
      include: [
        {
          model: Activity,
          attributes: ["id", "activityName", "active", "duration", "time"],
          through: { attributes: [] },
          required: true
        },
      ],
    });
    if (routine) {
      res.json(routine);
    } 
  } catch (err) {
    next(err);
  }
});

router.post("/", requireToken, async (req, res, next) => {
  try {
    const routine = await Routine.findOne({
      where: {
        userId: req.user.id
      },
      attributes: ["id","bedtime"],
      include: [
        {
          model: Activity,
          attributes: ["id", "activityName", "active", "duration", "time"],
          through: { attributes: [] },
          required: true
        },
      ],
    });
    const activities = await Activity.findAll()
    console.log(activities)
    if (!routine) {
      const newRoutine = await Routine.create()
      newRoutine.setUser(req.user.id)
      newRoutine.addActivities(activities)
      res.json(newRoutine);
    } else {
      console.log("Add to routine!");
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
      attributes: ["id", "bedtime"],
      include: [{
        model: Activity,
        where: {
          id: req.params.id
        }
      }]
    });
    const activity = routine.activities[0]
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
