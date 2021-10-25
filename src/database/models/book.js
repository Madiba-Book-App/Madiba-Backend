import { Model, DataTypes } from "sequelize";

module.exports = (sequelize) => {
  class Book extends Model {
    static associate(models) {
      // define association here
      Book.belongsTo(models.Genre, {
        as: "genre",
        foreignKey: "genreId",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
  Book.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: new DataTypes.INTEGER(),
      },
      title: {
        type: new DataTypes.STRING(),
      },
      author: {
        type: new DataTypes.STRING(),
      },
      language: {
        type: new DataTypes.STRING(),
      },
      description: {
        type: new DataTypes.STRING(),
      },
      price: {
        type: new DataTypes.STRING(),
      },
      generId: {
        type: new DataTypes.INTEGER(),
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
      modelName: "Book",
      tableName: "books",
    }
  );
  return Book;
};
