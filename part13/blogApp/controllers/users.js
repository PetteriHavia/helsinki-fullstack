const router = require("express").Router()
const { User, Blog } = require("../models")

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [{
      model: Blog,
      attributes: ["title"]
    },
    {
      model: Blog,
      as: "readings",
      attributes: { exclude: ["userId"] },
      through: {
        attributes: []
      }
    }
    ]
  })
  res.status(201).json(users)
})

router.get("/:id", async (req, res, next) => {

  let query = {}

  if (req.query.read) {
    query.read = req.query.read === "true" ? true : false
  }

  try {
    const user = await User.findByPk(req.params.id, {
      include: [{
        model: Blog,
        as: "readings",
        attributes: { exclude: ["userId"] },
        through: {
          attributes: ["id", "read"],
          where: query
        },
      }
      ]
    }
    )
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  const { username, name, password } = req.body

  const user = {
    username,
    name,
    passwordHash: password
  }
  try {
    const newUser = await User.create(user)
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})

router.put("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username } })
    user.username = req.body.username
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.status(201).json({ message: "User deleted" })
    user.destroy()
  } catch (error) {
    next(error)
  }
})

module.exports = router