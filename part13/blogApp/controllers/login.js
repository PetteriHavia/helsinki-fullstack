const { User, Session } = require("../models")
const bcrypt = require("bcrypt")
const route = require("express").Router()
const jwt = require("jsonwebtoken")

route.post("/", async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ where: { username: username } });

  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "invalid username or password" })
  }

  if (user.disabled) {
    return res.status(401).json({ error: "Account disabled, please contact admin" })
  }

  const userForToken = ({ username: user.username, id: user.id })
  const token = jwt.sign(userForToken, process.env.SECRET)

  existingSession = await Session.findOne({ where: { userId: user.id } })

  if (existingSession) {
    existingSession.token = token
    await existingSession.save();
  } else {
    await Session.create({ userId: user.id, token: token })
  }
  res.status(200).send({ token, username: user.username, id: user.id })
})

route.delete("/logout", async (req, res, next) => {
  try {
    const session = await Session.findOne({ where: { userId: req.user.id, token: req.token } })
    if (!session) {
      return res.status(404).json({ error: "Session not found" })
    }
    await session.destroy()
    res.status(200).json({ message: "User logged out successfully" })
  } catch (error) {
    next(error)
  }
})

module.exports = route