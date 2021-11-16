const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable("tokens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: new DataTypes.INTEGER(),
      },
      token: {
        type: new DataTypes.STRING(),
      },
      userId: {
        type: new DataTypes.INTEGER(),
      },
      status: {
        type: new DataTypes.ENUM("valid", "invalid"),
        allowNull: false,
        defaultValue: "invalid",
      },
      createdAt: {
        allowNull: false,
        type: new DataTypes.DATE(),
      },
      updatedAt: {
        allowNull: false,
        type: new DataTypes.DATE(),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tokens");
  },
};
