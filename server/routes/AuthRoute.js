// Konfigurasi route untuk otentikasi pengguna
const express = require("express");
const {Login, Me, logOut} = require ("../controllers/Auth.js");

const router = express.Router();

router.post('/login', Login);
router.get('/me', Me);
router.delete('/logout', logOut);

module.exports = router;