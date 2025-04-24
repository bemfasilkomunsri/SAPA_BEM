const express = require("express");
const router = express.Router();
const dosenController = require("../controllers/dosenController");

// GET semua laporan kinerja dosen
router.get("/", dosenController.getKinerjaDosen);

// POST laporan kinerja dosen
router.post("/", dosenController.postKinerjaDosen);

module.exports = router;