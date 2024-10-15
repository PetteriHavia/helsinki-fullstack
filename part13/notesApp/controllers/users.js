const router = require("express").Router()
const { User, Note } = require("../models")
const { tokenExtractor } = require("../util/middleware")

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (!user.admin) {
    return res.status(401).json({ error: "Oparation not permitted" })
  }
  next()
}

router.put("/:username", tokenExtractor, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username } })
    if (!user) {
      return res.status(404).json({ error: "Username not found" })
    }
    user.disabled = req.body.disabled
    await user.save()
    res.json(user)
  } catch (error) {
    next(error)
  }
})

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