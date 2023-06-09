// const fs = require("fs");
const { config } = require("dotenv");
config();
module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME||"root",
    password: process.env.DEV_DB_PASSWORD||"",
    database: process.env.DEV_DB_NAME||"dev_db",
    host: process.env.DEV_DB_HOSTNAME||"127.0.0.1",
    port: process.env.DEV_DB_PORT || 3306,
    dialect: process.env.DEV_DB_DIALECT||"mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: process.env.CI_DB_HOSTNAME,
    port: process.env.CI_DB_PORT || 3306,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT || 3306,
    dialect: "mysql",
    dialectOptions: {
      socketPath:process.env.DB_CONNECTION_NAME,
      bigNumberStrings: true,
      // ssl: {
      //   ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
      // }
    },
  },
};
