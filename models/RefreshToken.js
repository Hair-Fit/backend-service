const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./init.db");
const { hashString } = require("../utils/hashString");
const bcrypt = require("bcrypt");


class RefreshToken extends Model {}

RefreshToken.init(
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    hashedToken: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: "Users",
        key: "id",
      },
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
    modelName: "RefreshToken",
  }
);
const customMethodToken = {
  findRefreshTokenById: async (id) => RefreshToken.findOne({ where: { id: id } }),
  
  deleteRefreshTokenById: async (id) => {
    const token = await RefreshToken.findOne(id);
    if (token) {
      await token.destroy();
    }
    return token;
  },

  deleteAllRefreshTokens: async (id) => RefreshToken.destroy({ where: { userId: id } }),

  addRefreshToken: async (id, userId, refreshToken) => {
    const hashedToken = await hashString(refreshToken);
    return RefreshToken.create({ id : id, userId : userId, hashedToken:hashedToken });
  },

  tokenExistInDb: async (id, refreshToken)=>{
    const tokenFromDB = await this.findRefreshTokenById(id)
    const match = tokenFromDB && (await bcrypt.compare(refreshToken, tokenFromDB.hashedToken))
    return match
  }
};

module.exports = { RefreshToken, ...customMethodToken };
