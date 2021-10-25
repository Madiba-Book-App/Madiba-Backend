const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("users", "roleId", {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      defaultValue: 2,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
