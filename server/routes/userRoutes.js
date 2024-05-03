const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser } = require('../controllers/userController');
const { setCookiesBasic, clearCookies } = require('../controllers/cookie_controller');
const { protect } = require('../controllers/auth_controller');

router.post('/', registerUser);
router.post('/login', loginUser, setCookiesBasic, (req, res) => {
  console.log('login success');
  res.json(res.locals.userDetails);
});
router.post('/logout', clearCookies, (req, res) => {
  res.status(200).json('Logged Out');
});
router.get('/isAuthenticated', protect, (req, res) => {
  res.status(200).json(req.user);
})
router.get('/user', protect, getUser);

module.exports = router;