const db = require("serverless-mysql");

const mysql = db({
  config: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306,
  },
});

module.exports = mysql;
