const express = require('express');

const router = express.Router();
const { grantOauthJWT } = require('../controllers/userController');
const { setCookiesOAUTH } = require('../controllers/cookie_controller');
const session  = require('express-session');
const passport = require('passport');
require('../googleStrategy');
require('dotenv').config();


router.get('/google', passport.authenticate('google', {scope: ['email', 'profile']}));
    

router.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/api/auth/protect',
        failureRedirect: '/google/failure'
    })
)
router.get('/google/failure', (req, res) => {
    res.send('something went wrong!')
})

router.get('/protect', grantOauthJWT, setCookiesOAUTH, (req, res) => {
    console.log('cookies set');
    return res.redirect('/manager');
})

module.exports = router;