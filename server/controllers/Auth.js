const User = require("../models/UserModel.js");
const bcrypt = require("bcryptjs");


const Login = async (req, res) => {

    console.log("LOGIN HIT");

    try {

        console.log("BODY:", req.body);

        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        console.log("USER FOUND:", user);

        if (!user) {

            console.log("USER TIDAK DITEMUKAN");

            return res.status(404).json({
                msg: "User tidak ditemukan"
            });
        }

        const match = await bcrypt.compare(
            req.body.password,
            user.password
        );

        console.log("PASSWORD MATCH:", match);

        if (!match) {

            console.log("PASSWORD SALAH");

            return res.status(400).json({
                msg: "Password salah"
            });
        }

        req.session.userId = user.id;

        console.log("SESSION CREATED:", req.session);

        res.json({
            msg: "Login berhasil",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {

        console.log("ERROR LOGIN:");
        console.log(error);

        res.status(500).json({
            msg: "Server error",
            error: error.message
        });

    }

};




// GET LOGGED USER
const Me = async (req, res) => {

    try {

        if (!req.session.userId) {

            return res.status(401).json({
                msg: "Silakan login dulu"
            });

        }

        const user = await User.findOne({

            attributes: ["id", "username", "email"],

            where: {
                id: req.session.userId
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
            msg: "Internal server error"
        });

    }

};



// LOGOUT
const logOut = (req, res) => {

    req.session.destroy((err) => {

        if (err) {

            return res.status(400).json({
                msg: "Tidak bisa logout"
            });

        }

        res.status(200).json({
            msg: "Logout berhasil"
        });

    });

};


module.exports = {
    Login,
    Me,
    logOut
};
