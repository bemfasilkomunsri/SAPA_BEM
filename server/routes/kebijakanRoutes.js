const express = require("express");
const router = express.Router();
const kebijakanController = require("../controllers/kebijakanController");
const upload = require("../config/multerConfig");

// GET semua laporan kebijakan kampus
router.get("/", kebijakanController.getKebijakan);

// POST laporan baru dengan file pendukung
router.post("/", upload.single("dataPendukung"), kebijakanController.postKebijakan);

module.exports = router;
