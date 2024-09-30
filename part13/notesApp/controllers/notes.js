const router = require("express").Router()
const { Note } = require("../models")

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id)
  next()
}

router.get("/", async (req, res) => {
  const notes = await Note.findAll()
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

router.post("/", async (req, res) => {
  console.log(req.body)
  try {
    const note = await Note.create(req.body);
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
