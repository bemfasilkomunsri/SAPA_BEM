const db = require("../config/db");
const { QueryTypes } = require('sequelize');

//GET semua laporan kinerja dosen
exports.getKinerjaDosen = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM kinerja_dosen");
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
};

// Post Kirim Data Laporan Kinerja Dosen
exports.postKinerjaDosen = async (req, res) => {
  console.log("Isi req.body:", req.body);

  const { Subjek_Aspirasi, Target_Aspirasi, Jurusan_Dosen, Matakuliah_Dosen, Isi_Aspirasi } = req.body;
  
  try {
    await db.query(
      `INSERT INTO kinerja_dosen 
        (Subjek_Aspirasi, Target_Aspirasi, Jurusan_Dosen, Matakuliah_Dosen, Isi_Aspirasi)
       VALUES (?, ?, ?, ?, ?)`,
      {
        replacements: [ 
          Subjek_Aspirasi || '', 
          Target_Aspirasi || '', 
          Jurusan_Dosen || '', 
          Matakuliah_Dosen || '', 
          Isi_Aspirasi || ''
        ],
        type: QueryTypes.INSERT,
        raw: true
      }
    );
    
    res.json({ msg: "Aspirasi berhasil dikirim!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};