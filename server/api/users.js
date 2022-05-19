const router = require("express").Router();
const { models: { User, Routine} } = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");
module.exports = router;

//the routes are mounted on /users in the index
router.get("/", requireToken, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        include: ["id", "username", "bedtime"],
      },
      include: {  
        model: Routine
      }
    })
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//Route to get a specific user based off of id
//mounted on /users/:id
router.get("/:id", requireToken, async (res, req, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id);
    res.json(singleUser);
  } catch (err) {
    next(err);
  }
});

//Will need to use a token to modify data in the future. Look at file auth/index.
// router.put("/:id", async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     res.json(await user.update(req.body));
//   } catch (err) {
//     next(err);
//   }
// });
