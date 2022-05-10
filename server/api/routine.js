const router = require("express").Router();
const { models: { User, Activity, Routine} } = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");
module.exports = router;

router.get("/", requireToken, async (req, res, next) => {
  try {
    const routine = await Routine.findOne({
      where: {
        userId: req.userId,
      },
      include: [
        {
          model: Activity,
          attributes: ["id", "activityName", "duration", "time"],
          through: { attributes: [] },
          required: true,
        },
      ],
    });
    res.json(routine);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireToken, async (res, req, next) => {
  try {
    // const routineActivity = await Activity.findByPk(req.body.id)      
    // console.log(req.user.id)
    const routine = await Routine.findOne({
      attributes: ["id", "bedtime"],
      include: [
        {
          model: Activity,
          attributes: ["id", "activityName", "duration", "time"],
          through: { attributes: [] },
          required: true,
        },
      ],
    });
    if (routine) {
      await routineActivity.setRoutine(routine.id)
      res.json(routineActivity)
    } else {
      const newRoutine = await Routine.create({
        userId: req.user.id
      })
      await routineActivity.setRoutine(newRoutine.id)
      res.json(routineActivity);
    }
  } catch (err) {
    next(err);
  }
});

//Will need to use a token to modify data in the future. Look at file auth/index.
router.put("/:id", async (req, res, next) => {
  try {
    const activity = await routine.getActivity(req.params.id);
    const routine = await Routine.findOne({
      where: {
        userId: req.userId,
      },
      attributes: ["id", "bedtime"],
      include: [
        {
          model: Activity,
          attributes: ["id", "activityName", "duration", "time"],
          through: { attributes: [] },
          required: true,
        },
      ],
    });
    if (activity) {
      const updatedActivity = activity.update(req.body)
      res.json(await routine.setActivity(updatedActivity));
    }
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
