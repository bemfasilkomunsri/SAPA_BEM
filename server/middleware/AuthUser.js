// Middleware for checking if the logged-in user is an admin
export const adminOnly = (req, res, next) => {
    // Check if the logged-in user's email matches the admin's email (replace with your actual check)
    if (req.user.email !== 'admin@example.com') {  // Replace with actual admin email or condition
      return res.status(403).json({ msg: 'Access denied, not an admin' });
    }
    next();
};
  

// Fungsi middleware untuk memverifikasi user
export const verifyUser = (req, res, next) => {
    // Logika untuk memverifikasi user
    if (req.user) {
        return next();
    }
    return res.status(401).json({ msg: "Unauthorized" });
};
