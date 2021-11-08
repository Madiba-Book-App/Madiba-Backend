import { Model, DataTypes } from "sequelize";

module.exports = (sequelize) => {
  class Event extends Model {
    static associate(models) {
      // define association here
    }
  }
  Event.init(
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
      description: {
        type: new DataTypes.TEXT(),
      },
      location: {
        type: new DataTypes.STRING(),
      },
      time: {
        type: new DataTypes.STRING(),
      },
      date: {
        type: new DataTypes.DATE(),
      },
      price: {
        type: new DataTypes.STRING(),
      },
      places: {
        type: new DataTypes.STRING(),
      },
      eventImage: {
        type: new DataTypes.STRING(),
      },
      cloudinaryImageId: {
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
      modelName: "Event",
      tableName: "events",
    }
  );
  return Event;
};
