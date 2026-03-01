const express = require("express");
const {
    getUser,
    getUserById,
    createUser,
    deleteUser,
    updateUser
} = require ("../controllers/User.js");
const { verifyUser, adminOnly } = require ("../middleware/AuthUser.js");

const router = express.Router();

// Route yang membutuhkan autentikasi
router.get('/users', verifyUser, adminOnly, getUser);
// router.post('/users', createUser);
router.get('/users/:id', verifyUser, adminOnly, getUserById);
router.post('/users', verifyUser, adminOnly, createUser);
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);
router.patch('/users/:id', verifyUser, adminOnly, updateUser);

module.exports = router;