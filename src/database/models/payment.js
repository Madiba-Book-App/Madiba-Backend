import { Model, DataTypes } from "sequelize";

module.exports = (sequelize) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      Payment.belongsTo(models.Book, {
        as: "book",
        foreignKey: "bookId",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
  Payment.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: new DataTypes.INTEGER(),
      },
      userId: {
        type: new DataTypes.INTEGER(),
      },
      bookId: {
        type: new DataTypes.INTEGER(),
      },
      method: {
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
      modelName: "Payment",
      tableName: "payments",
    }
  );
  return Payment;
};
