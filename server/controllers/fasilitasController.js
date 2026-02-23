const db = require("../config/db");
const { QueryTypes } = require("sequelize");

exports.getFasilitas = async (req, res) => {

  console.log("=== GET FASILITAS ===");

  try {

    const [results] = await db.query(
      "SELECT * FROM kerusakan_fasilitas ORDER BY id DESC"
    );

    res.json(results);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

};


exports.postFasilitas = async (req, res) => {

  console.log("=== POST FASILITAS ===");

  console.log("BODY:", req.body);

  console.log("FILE:", req.file);

  try {

    const { fasilitas_yang_rusak, deskripsi_kerusakan, proses } = req.body;

    const berkas = req.file ? req.file.filename : null;

    await db.query(
      `INSERT INTO kerusakan_fasilitas
      (fasilitas_yang_rusak, deskripsi_kerusakan, proses, berkas)
      VALUES (?, ?, ?, ?)`,
      {
        replacements: [
          fasilitas_yang_rusak,
          deskripsi_kerusakan,
          proses,
          berkas
        ],
        type: QueryTypes.INSERT
      }
    );

    res.json({
      message: "Laporan berhasil dikirim"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

};
