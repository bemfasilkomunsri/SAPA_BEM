const User = require("../models/UserModel.js");

// VERIFY USER LOGIN
const verifyUser = async (req, res, next) => {

    console.log("===== VERIFY USER =====");
    console.log("Session:", req.session);
    console.log("Session userId:", req.session.userId);
    console.log("=======================");

    if (!req.session.userId) {

        console.log("SESSION TIDAK ADA USERID");

        return res.status(401).json({
            msg: "Silakan login dulu"
        });

    }

    const user = await User.findOne({
        where: {
            id: req.session.userId
        }
    });

    if (!user) {

        console.log("USER TIDAK DITEMUKAN DI DATABASE");

        return res.status(404).json({
            msg: "User tidak ditemukan"
        });

    }

    console.log("USER VERIFIED:", user.username);

    req.userId = user.id;
    req.email = user.email;

    next();

};


// ADMIN ONLY
const adminOnly = async (req, res, next) => {

    console.log("===== ADMIN CHECK =====");
    console.log("Session:", req.session);
    console.log("=======================");

    const user = await User.findOne({
        where: {
            id: req.session.userId
        }
    });

    if (!user) {

        return res.status(404).json({
            msg: "User tidak ditemukan"
        });

    }

    if (user.email !== "admin@gmail.com") {

        return res.status(403).json({
            msg: "Access denied"
        });

    }

    next();

};


module.exports = {
    verifyUser,
    adminOnly
};
