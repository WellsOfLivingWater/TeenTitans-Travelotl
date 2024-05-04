const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const jwtToken = req.cookies.SSID;
  const isLoggedIn = req.cookies.logCode;
  
  if (isLoggedIn == '1') {
    try {
      // Verify token
      const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
  
      // Get user from the token, not including the hashed password
      req.user = await User.findById(decoded.id).select('-password');
    } catch (err) {
      return next(err);
    }
  }
  return next();
};

module.exports = { protect };
