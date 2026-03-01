const db = require("../config/db");
const { QueryTypes } = require('sequelize');

// GET semua laporan ormawa
exports.getOrmawa = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM ormawa");
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// POST laporan ormawa
exports.postOrmawa = async (req, res) => {
  const { Subjek_Aspirasi, Organisasi_yang_Dituju, Kritik_dan_Saran } = req.body;

  if (!Subjek_Aspirasi || !Organisasi_yang_Dituju || !Kritik_dan_Saran) {
    return res.status(400).json({ message: "Mohon lengkapi semua kolom" });
  }

  try {
    await db.query(
      `INSERT INTO ormawa 
      (Subjek_Aspirasi, Organisasi_yang_Dituju, Kritik_dan_Saran)
      VALUES (?, ?, ?)`,
      {
        replacements: [
          Subjek_Aspirasi,
          Organisasi_yang_Dituju,
          Kritik_dan_Saran
        ],
        type: QueryTypes.INSERT,
        raw: true
      }
    );
    res.json({ message: "Aspirasi Ormawa berhasil dikirim" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};