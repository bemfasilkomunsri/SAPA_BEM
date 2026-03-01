const express = require("express");
const router = express.Router();
const ormawaController = require("../controllers/ormawaController");

// GET semua laporan ormawa
router.get("/", ormawaController.getOrmawa);

// POST laporan ormawa
router.post("/", ormawaController.postOrmawa);

module.exports = router;
