import { Model, DataTypes } from "sequelize";

const { Model } = require("sequelize");
module.exports = (sequelize) => {
  class Genre extends Model {
    static associate(models) {
      // define association here
    }
  }
  Genre.init(
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
      range: {
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
      modelName: "Genre",
      tableName: "genres",
    }
  );
  return Genre;
};
