const db = require("../config/db");
const { QueryTypes } = require('sequelize');

// GET semua laporan fasilitas
exports.getFasilitas = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM kerusakan_fasilitas ORDER BY id DESC");
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message  });
  }
};

// POST laporan fasilitas
exports.postFasilitas = async (req, res) => {
  const { fasilitas_yang_rusak, deskripsi_kerusakan, proses } = req.body;
  const berkas = req.file ? req.file.filename : null;
  
  try {
    await db.query(
      `INSERT INTO kerusakan_fasilitas 
        (fasilitas_yang_rusak, deskripsi_kerusakan, proses, berkas)
       VALUES (?, ?, ?, ?)`,
      {
        replacements: [ 
          fasilitas_yang_rusak || '', 
          deskripsi_kerusakan || '', 
          proses || '', 
          berkas || '', 
        ],
        type: QueryTypes.INSERT,
        raw: true
      }
    );
    
    res.json({ msg: "Laporan berhasil dikirim!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
