const db = require("../config/db");
const { QueryTypes } = require('sequelize');

// GET semua laporan kebijakan
exports.getKebijakan = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM kebijakan_kampus");
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message  });
  }
};

// POST laporan kebijakan
exports.postKebijakan = async (req, res) => {
  const { judul_aspirasi, nama_kebijakan, isi_aspirasi, proses } = req.body;
  const dataPendukung = req.file ? req.file.filename : "";
  
  try {
    await db.query(
      `INSERT INTO kebijakan_kampus 
      (judul_aspirasi, nama_kebijakan, isi_aspirasi, data_pendukung, proses)
      VALUES (?, ?, ?, ?, ?)`,
      {
        replacements: [ 
          judul_aspirasi || '', 
          nama_kebijakan || '', 
          isi_aspirasi || '', 
          dataPendukung || '', 
          proses || ''
        ],
        type: QueryTypes.INSERT,
        raw: true
      }
    );
      res.json({ msg: "Laporan berhasil ditambahkan" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
  }
};