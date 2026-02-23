const express = require("express");
const router = express.Router();
const fasilitasController = require("../controllers/fasilitasController");
const upload = require("../config/multerConfig");


// GET semua laporan
router.get("/", fasilitasController.getFasilitas);


// POST laporan + upload file
router.post(
  "/",
  upload.single("berkas"),
  fasilitasController.postFasilitas
);


module.exports = router;
