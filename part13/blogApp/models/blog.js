const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")

class Blog extends Model { }

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: { msg: "Url is required" },
    }
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: { msg: "Title is required" },
    }
  },
  likes: {
    type: DataTypes.INTEGER,
    default: 0,
  },
  year: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: { msg: "The year must be number values" },
      min: { args: 1901, msg: "The year must be no earlier than 1901" },
      max: { args: new Date().getFullYear(), msg: `The year must be no later than ${new Date().getFullYear()}` }
    }
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'blog'
})

module.exports = Blog