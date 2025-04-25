import express from "express";
import {
    getUser,
    getUserById,
    createUser,
    deleteUser,
    updateUser
} from '../controllers/User.js';
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', verifyUser, adminOnly, getUser);
router.get('/users/:id', verifyUser, adminOnly, getUserById);
router.post('/users', verifyUser, adminOnly, createUser);
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);
router.patch('/users/:id', verifyUser, adminOnly, updateUser);

export default router;