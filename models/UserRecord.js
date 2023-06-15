const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./init.db");

class UserRecord extends Model {}

UserRecord.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type:DataTypes.INTEGER
    },
    prediction: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    img: {
      allowNull: false,
      type: DataTypes.STRING,
    },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "UserRecord",
  }
);

module.exports = {UserRecord}