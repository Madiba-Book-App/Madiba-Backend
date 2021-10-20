import { Model, DataTypes } from "sequelize";

module.exports = (sequelize) => {
  class Borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Borrow.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      Borrow.belongsTo(models.Book, {
        as: "book",
        foreignKey: "bookId",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
  Borrow.init(
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
      returnAt: {
        type: new DataTypes.DATE(),
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
      modelName: "Borrow",
      tableName: "borrows",
    }
  );
  return Borrow;
};
