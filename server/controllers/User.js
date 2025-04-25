import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['id', 'name'] 
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['id', 'name'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createUser = async (req, res) => {
    const { username, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    const hashPassword = await bcrypt.hash(password, 10); // Menambahkan hashing dengan bcrypt
    try {
        await User.create({
            username: username,
            password: hashPassword
        });
        res.status(201).json({ msg: "User Created" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


export const updateUser = async (req, res) => {
    const user = await User.findOne({
        where: { id: req.params.id }
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    const { username, password, confPassword } = req.body;
    let hashPassword = password ? await bcrypt.hash(password, 10) : user.password;
    if (password && password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password do not match" });

    try {
        await User.update({ username, password: hashPassword }, { where: { id: user.id } });
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: { id: req.params.id }
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    try {
        await User.destroy({ where: { id: user.id } });
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};