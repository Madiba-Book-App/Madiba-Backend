import { Model, DataTypes } from "sequelize";

module.exports = (sequelize) => {
  class UserRole extends Model {
    static associate(models) {
      // define association here
    }
  }
  UserRole.init(
    {
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
    },
    {
      sequelize,
      modelName: "UserRole",
      tableName: "userRole",
    }
  );
  return UserRole;
};
