import { Model, DataTypes } from "sequelize";

module.exports = (sequelize) => {
  class Subscription extends Model {
    static associate(models) {
      // define association here
    }
  }
  Subscription.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: new DataTypes.INTEGER(),
      },
      name: {
        type: new DataTypes.STRING(),
      },
      price: {
        type: new DataTypes.STRING(),
      },
      description: {
        type: new DataTypes.STRING(),
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
      modelName: "Subscription",
      tableName: "subscriptions",
    }
  );
  return Subscription;
};
