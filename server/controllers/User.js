const User = require("../models/UserModel.js");
const bcrypt = require("bcryptjs");


// GET ALL USER
const getUser = async (req, res) => {

    try {

        const users = await User.findAll({

            attributes: ["id", "username", "email"]

        });

        res.status(200).json(users);

    }

    catch (error) {

        res.status(500).json({
            msg: error.message
        });

    }

};


// GET USER BY ID
const getUserById = async (req, res) => {

    try {

        const user = await User.findOne({

            attributes: ["id", "username", "email"],

            where: {
                id: req.params.id
            }

        });

        if (!user) {

            return res.status(404).json({
                msg: "User tidak ditemukan"
            });

        }

        res.status(200).json(user);

    }

    catch (error) {

        res.status(500).json({
            msg: error.message
        });

    }

};



// CREATE USER
const createUser = async (req, res) => {

    try {

        const { username, email, password, confPassword } = req.body;

        if (!username || !email || !password || !confPassword) {

            return res.status(400).json({
                msg: "Semua field wajib diisi"
            });

        }

        if (password !== confPassword) {

            return res.status(400).json({
                msg: "Password tidak cocok"
            });

        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({

            username,
            email,
            password: hashPassword

        });

        res.status(201).json({
            msg: "User berhasil dibuat"
        });

    }

    catch (error) {

        res.status(400).json({
            msg: error.message
        });

    }

};



// UPDATE USER
const updateUser = async (req, res) => {

    try {

        const user = await User.findOne({

            where: {
                id: req.params.id
            }

        });

        if (!user) {

            return res.status(404).json({
                msg: "User tidak ditemukan"
            });

        }

        const { username, email, password, confPassword } = req.body;

        let hashPassword = user.password;

        if (password) {

            if (password !== confPassword) {

                return res.status(400).json({
                    msg: "Password tidak cocok"
                });

            }

            hashPassword = await bcrypt.hash(password, 10);

        }

        await User.update({

            username,
            email,
            password: hashPassword

        }, {

            where: {
                id: req.params.id
            }

        });

        res.status(200).json({
            msg: "User berhasil diupdate"
        });

    }

    catch (error) {

        res.status(400).json({
            msg: error.message
        });

    }

};



// DELETE USER
const deleteUser = async (req, res) => {

    try {

        const user = await User.findOne({

            where: {
                id: req.params.id
            }

        });

        if (!user) {

            return res.status(404).json({
                msg: "User tidak ditemukan"
            });

        }

        await User.destroy({

            where: {
                id: req.params.id
            }

        });

        res.status(200).json({
            msg: "User berhasil dihapus"
        });

    }

    catch (error) {

        res.status(400).json({
            msg: error.message
        });

    }

};


module.exports = {

    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser

};
