const express = require('express');

const router = express.Router();

const session  = require('express-session');
const passport = require('passport');
require('../googleStrategy');
require('dotenv').config();


// router.use(session({
//     secret: 'keyboard cat',
//     // resave: false,
//     // saveUninitialized: false,
//     // cookie: { secure: true }
//   }));
// router.use(passport.initialize());
// router.use(passport.session());


router.get('/google',
    passport.authenticate('google', {scope: ['email', 'profile']})
);

router.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/manager',
        failureRedirect: '/google/failure'
    })
)
router.get('/google/failure', (req, res) => {
    res.send('something went wrong!')
})

router.get('/protect', (req, res) => {
    res.send('Hello')
})

module.exports = router;