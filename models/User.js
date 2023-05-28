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
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
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

// const findUserByEmail = async (email)=>User.findOne({attributes:['email'],where:{email:email}})
// const findUserById = async (id)=>User.findOne({where:{id:id}})
// const findUserByUsername = async (username)=>User.findOne({attributes:['username'],where:{username:username}})
// const findUserByUsernameOrEmail = async (username,email)=>User.findOne({where:{[Op.or]:[{username:username,email:email}]}})
// const createuser = async(user)=>{
//   user.password = await hashString(user.password)
//   return User.create({user})
// }
// const getAllUsers = async ()=>User.findAll({attributes:['id','username','email']})

const customMethodUser = {
  findUserByEmail: async (email) => User.findOne({ attributes: ["email"], where: { email: email } }),

  findUserById: async (id) => User.findOne({ where: { id: id } }),
  indUserByUsername: async (username) => User.findOne({ attributes: ["username"], where: { username: username } }),

  findUserByUsernameOrEmail: async (username, email) =>
    User.findOne({ where: { [Op.or]: [{ username: username},{email: email }] } }),

  createUser: async (user) => {
    user.password = await hashString(user.password);
  // console.log(user);
    return User.create({ ...user });
  },
  getAllUsers: async () => User.findAll({ attributes: ["id", "username", "email"] }),
};

module.exports = { User, ...customMethodUser };