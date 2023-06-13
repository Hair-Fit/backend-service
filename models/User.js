const { Model, DataTypes, Op } = require("sequelize");
const { sequelize } = require("./init.db");
const { RefreshToken } = require("./RefreshToken");
const { hashString } = require("../utils/hashString");

class User extends Model {}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    gender: {
      allowNull: false,
      type: DataTypes.ENUM('male','female'),
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
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
    modelName: "User",
  }
);
User.hasMany(RefreshToken);
RefreshToken.belongsTo(User);

const customMethodUser = {
  findUserByEmail: async (email) => User.findOne({ attributes: ["email"], where: { email: email } }),

  findUserById: async (id) => User.findOne({ where: { id: id } }),
  indUserByUsername: async (username) => User.findOne({ attributes: ["username"], where: { username: username } }),

  findUserByUsernameOrEmail: async (email) =>
    User.findOne({ where: { email: email } }),

  // findUserByUsernameOrEmail: async (username, email) =>
  //   User.findOne({ where: { [Op.or]: [{ username: username},{email: email }] } }),

  createUser: async (user) => {
    user.password = await hashString(user.password);
    return User.create({ ...user });
  },
  getAllUsers: async () => User.findAll({ attributes: ["id", "username", "email"] }),
};

module.exports = { User, ...customMethodUser };
