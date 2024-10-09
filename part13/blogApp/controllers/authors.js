const route = require("express").Router()
const { Blog } = require("../models")
const { sequelize } = require("../util/db")

route.get("/", async (req, res, next) => {
  try {
    const blog = await Blog.findAll({
      attributes: [
        'author',
        [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
        [sequelize.fn('COUNT', sequelize.col('author')), 'blogs'],
      ],
      order: [['likes', 'DESC']],
      group: ['author']
    })
    res.status(201).json(blog)
  } catch (error) {
    next(error)
  }
})

module.exports = route