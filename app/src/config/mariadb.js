import * as db from "mariadb";

const mariadb = db.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 3306,
  connectionLimit: 300,
});

module.exports = mariadb;
