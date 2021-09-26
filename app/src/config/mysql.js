const mysql = require("serverless-mysql")({
  config: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306,
    connectTimeout: 500,
  },
});

module.exports = mysql;
