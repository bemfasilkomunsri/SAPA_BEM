const db = require("../config/db");
const { QueryTypes } = require('sequelize');

// GET semua laporan pengajuan seminar
exports.getSeminar = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM pengajuan_seminar");
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message  });
  }
};

// POST laporan ormawa
exports.postSeminar = async (req, res) => {
  const { Jurusan, Judul_Seminar, Deskripsi_Seminar, proses } = req.body;
  
  if (!Jurusan || !Judul_Seminar || !Deskripsi_Seminar) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }
  
  try {
    await db.query(
      `INSERT INTO pengajuan_seminar  
      (Jurusan, Judul_Seminar, Deskripsi_Seminar, proses)
      VALUES (?, ?, ?, ?)`,
      {
        replacements: [ 
          Jurusan || '', 
          Judul_Seminar || '', 
          Deskripsi_Seminar || '', 
          proses || ''
        ],
        type: QueryTypes.INSERT,
        raw: true
      }
    );
      res.json({ msg: "Pengajuan seminar berhasil dikirim" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
  }
};
