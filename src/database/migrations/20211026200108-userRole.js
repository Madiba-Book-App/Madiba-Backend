const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable("userRole", {
   id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: new DataTypes.INTEGER(),
      },
      roleId: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      userId: {
        type: new DataTypes.STRING(),
        allowNull: false,
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
   await queryInterface.dropTable("userRole");
  }
};
