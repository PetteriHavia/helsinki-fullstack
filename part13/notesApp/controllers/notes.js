const router = require("express").Router()
const { Note, User } = require("../models")
const jwt = require("jsonwebtoken")
const { SECRET } = require("../util/config")
const { Op } = require("sequelize");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: "Invalid token" })
    }
  } else {
    return res.status(401).json({ error: "Token is missing" })
  }
  next()
}


const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id)
  next()
}

router.get("/", async (req, res) => {
  const where = {}

  if (req.query.important) {
    where.important = req.query.important === "true"
  }

  if (req.query.search) {
    where.content = {
      [Op.iLike]: `%${req.query.search}%`
    }
  }

  const notes = await Note.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where
  })
  res.json(notes);
})

router.get("/:id", noteFinder, async (req, res) => {
  if (!req.note) {
    res.status(404).json({ error: "Note not found" });
  }
  res.status(201).json(req.note);
})

router.put('/:id', noteFinder, async (req, res) => {
  if (req.note) {
    req.note.important = req.body.important
    await req.note.save()
    res.json(req.note)
  } else {
    res.status(404).end()
  }
})

router.post("/", tokenExtractor, async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const note = await Note.create({ ...req.body, userId: user.id, date: new Date() });
    return res.json(note)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: "An error has occured" });
  }
})

router.delete("/:id", noteFinder, async (req, res) => {
  const note = req.note

  if (!note) {
    return res.status(404).json({ error: "Note not found" })
  }
  try {
    note.destroy();
    res.status(204).end();
  } catch (error) {
    console.log(error)
    res.status(500).json({ errro: "An error occured while deleting blog" })
  }
})

module.exports = router
