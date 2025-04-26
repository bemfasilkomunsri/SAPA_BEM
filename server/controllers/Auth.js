const User = require ("../models/UserModel.js");
const bcrypt = require ("bcryptjs");

// Login
const Login = async (req, res) => {
    try {
        // Find user by username
        const user = await User.findOne({
            where: {
                // username: req.body.username
                email: req.body.email
            }
        });
        // If user not found
        if (!user) return res.status(404).json({ msg: "Incorrect username or password" });

        // Verify password using bcrypt
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(400).json({ msg: "Wrong password" });

        // Store user id in session
        req.session.userId = user.id;
        console.log("Session created:", req.session); // Debugging output

        // Send response with user details (no role field as per your DB schema)
        const { id, username, email } = user;
        res.status(200).json({ id, username, email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

// Get User (Logged-in user details)
const Me = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ msg: "Please login to your account!" });
        }

        // Find the logged-in user by ID (stored in session)
        const user = await User.findOne({
            attributes: ['id', 'username', 'email'], // No role field
            where: {
                id: req.session.userId
            }
        });

        // If user not found
        if (!user) return res.status(404).json({ msg: "User not found" });

        // Send user details
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

// Logout
const logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: "Cannot log out" });
        res.status(200).json({ msg: "You are logged out" });
    });
}

module.exports = {
    Login,
    Me,
    logOut
};