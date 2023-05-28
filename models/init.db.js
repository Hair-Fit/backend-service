const { config } = require("dotenv");
const { Sequelize } = require("sequelize");

config()

const env = process.env.NODE_ENV || 'development'
const db_config = require('../config/database')[(env)]

const sequelize = new Sequelize(db_config.database, db_config.username, db_config.password, {
  host: db_config.host,
  dialect: db_config.dialect
})

exports.db_test = async ()=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

exports.sequelize = sequelize;