const { Model, DataTypes } = require("sequelize")
const { sequelize } = require("../util/db")

class Team extends Model { }

Team.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
},
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "team"
  })

module.exports = Team