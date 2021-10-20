import { Model, DataTypes } from "sequelize";

module.exports = (sequelize) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Token.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
  Token.init(
    {
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
        defaultValue: "valid",
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
      modelName: "Token",
      tableName: "tokens",
    }
  );
  return Token;
};
