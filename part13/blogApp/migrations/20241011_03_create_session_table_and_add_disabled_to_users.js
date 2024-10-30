const { DataTypes } = require("sequelize")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("sessions", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" }
      },
      token: {
        type: DataTypes.STRING
      }
    })
    await queryInterface.addColumn("users", "disabled", {
      type: DataTypes.BOOLEAN,
      default: false,
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("sessions")
    await queryInterface.removeColumn("disabled")
  }
}