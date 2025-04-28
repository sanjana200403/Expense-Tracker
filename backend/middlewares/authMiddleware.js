const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("step1")
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
    console.log("step 2")
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};
