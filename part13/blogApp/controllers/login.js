const { User } = require("../models")
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
  const userForToken = ({
    username: user.username,
    id: user.id
  })
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })
  res.status(200).send({ token, username: user.username, id: user.id })
})

module.exports = route