const { Model, DataTypes } = require("sequelize")
const { sequelize } = require("../util/db")
const bcrypt = require("bcrypt")

class blogUser extends Model { }

blogUser.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: "Username can't be empty" },
      notNull: { msg: "Username can't be null" },
      isEmail: { msg: "Username needs to be valid email" }
    }
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Password can't be empty" },
      notNull: { msg: "Password can't be null" },
      is: {
        args: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$!%*?&]{8,}$/,
        msg: "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, and one number."
      }
    }
  }
},
  {
    sequelize,
    modelName: "blogUser",
    hooks: {
      async beforeSave(user) {
        if (user.changed("passwordHash")) {
          const saltRounds = 10
          user.passwordHash = await bcrypt.hash(user.passwordHash, saltRounds)
        }
      }
    }
  })

module.exports = blogUser