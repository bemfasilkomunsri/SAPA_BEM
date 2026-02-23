const express = require("express");
const router = express.Router();

const { Login, Me, logOut } = require("../controllers/Auth.js");

router.post("/login", Login);
router.get("/me", Me);
router.delete("/logout", logOut);

module.exports = router;
