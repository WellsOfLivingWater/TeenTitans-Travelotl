const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');
const express = require('express');

const protect = async (req, res, next) => {
  // console.log('protect middleware req.cookies ===>', req.cookies);
  const jwtToken = req.cookies.SSID;
  // console.log(req.headers.authorization);

  try {
    // Verify token
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    // Get user from the token, not including the hashed password
    req.user = await User.findById(decoded.id).select('-password');
    // console.log(req.user);

    return next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Not authorized' });
  }
};

module.exports = { protect };
