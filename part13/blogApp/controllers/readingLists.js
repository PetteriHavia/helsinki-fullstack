const router = require("express").Router()
const { ReadingList } = require("../models")
const { userExtractor } = require("../util/middleware")


router.post("/", async (req, res, next) => {
  const { userId, blogId } = req.body
  try {
    const addToReadingList = await ReadingList.create({ userId, blogId })
    res.status(201).json(addToReadingList)
  } catch (error) {
    next(error)
  }
})

router.put("/:id", userExtractor, async (req, res, next) => {
  const { read } = req.body
  try {
    const readlists = await ReadingList.findOne({ where: { blogId: req.params.id, userId: req.user.id } })
    if (!readlists) {
      return res.status(404).json({ error: "Reading list entry not found or user not authorized to edit this listing" });
    }
    readlists.read = read
    await readlists.save()
    res.status(200).json(readlists)
  } catch (error) {
    next(error)
  }
})

module.exports = router