// const mysql = require("mysql");
const Sequelize = require ("sequelize");
require("dotenv").config();

// Konfigurasi koneksi MySQL dengan Sequelize via .env
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
      host: process.env.DB_HOST,
      dialect: "mysql"
  }
);

db.authenticate()
  .then(() => {
    console.log("Berhasil terkoneksi ke MySQL");
  })
  .catch((err) => {
    console.error("Gagal terkoneksi ke MySQL:", err);
  });


// Konfigurasi koneksi Mysql Native
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Gagal terkoneksi ke MySQL:", err);
//   } else {
//     console.log("Berhasil terkoneksi ke MySQL");
//   }
// });

module.exports = db;