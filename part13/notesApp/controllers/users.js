const router = require("express").Router()
const { User, Note } = require("../models")

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Note,
      attributes: { exclude: ['userId'] }
    }
  })
  res.status(201).json(users)
})

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.status(201).json(user)
  } catch (error) {
    res.status(404).end()
  }
})

module.exports = router