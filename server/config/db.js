const Sequelize = require("sequelize");
require("dotenv").config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      connectTimeout: 60000
    }
  }
);

async function connectDB() {
  try {
    await db.authenticate();
    console.log("✅ Berhasil terkoneksi ke MySQL");
  } catch (error) {
    console.error("❌ Gagal terkoneksi ke MySQL:");
    console.error(error.message);
  }
}

connectDB();

module.exports = db;