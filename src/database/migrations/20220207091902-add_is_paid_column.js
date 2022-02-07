const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn("users", "isPaid", {
      type: new DataTypes.BOOLEAN(),
      defaultValue: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("users");
  },
};
