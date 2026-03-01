const express = require("express");
const router = express.Router();
const seminarController = require("../controllers/seminarController");

// GET semua pengajuan seminar
router.get("/", seminarController.getSeminar);

// POST pengajuan seminar
router.post("/", seminarController.postSeminar);

module.exports = router;