// Package dependencies
const express = require('express');
const session  = require('express-session');
const passport = require('passport');

// Controllers
const { grantOauthJWT } = require('../controllers/userController');
const { setCookiesOAUTH } = require('../controllers/cookie_controller');

// Strategies
require('../googleStrategy');

// Environment variables
require('dotenv').config();

const router = express.Router();

// Google OAuth, step 1: Redirect to Google OAuth consent screen
router.get('/google', passport.authenticate('google', {scope: ['email', 'profile']}));

// Google OAuth, step 2: Google OAuth consent screen redirects to this route
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/api/auth/protect',
  failureRedirect: '/google/failure'
}));

// Google OAuth failure route
router.get('/google/failure', (req, res) => {
  res.send('Google authentication failed.');
});

// Google OAuth, step 3: Set cookies for JWT
router.get('/protect', grantOauthJWT, setCookiesOAUTH, (req, res) => {
  console.log('Google OAuth cookies set successfully. Redirecting to Manager.');
  return res.redirect('/manager');
});

module.exports = router;