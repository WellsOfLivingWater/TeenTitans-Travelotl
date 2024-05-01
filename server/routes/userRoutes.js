const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser } = require('../controllers/userController');
const { setCookiesBasic } = require('../controllers/cookie_controller');
const { protect } = require('../controllers/auth_controller');

router.post('/', registerUser);
router.post('/login', loginUser, setCookiesBasic, (req, res) => {
  console.log('login success');
  // return res.status(200).json(res.locals.userDetails).redirect('/manager');
  return res.redirect('/manager');
});
router.get('/user', protect, getUser);

module.exports = router;