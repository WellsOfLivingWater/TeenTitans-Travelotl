const express = require('express');

const { registerUser, loginUser, getUsers } = require('../controllers/userController');
const { setCookiesBasic, clearCookies } = require('../controllers/cookie_controller');
const { protect } = require('../controllers/auth_controller');
const { getFriends, addFriend } = require('../controllers/friendsController');

const router = express.Router();

/**
 * @route POST /api/users/login
 * 
 * Logs in a user, sets cookies, and sends user details.
 */
router.post('/login', loginUser, setCookiesBasic, (req, res) => {
  console.log('login success');
  res.json(res.locals.userDetails);
});

/**
 * @route POST /api/users/logout
 * 
 * Logs out a user and clears cookies.
 */ 
router.post('/logout', clearCookies, (req, res) => {
  res.status(200).json('Logged Out');
});
router.get('/isAuthenticated', protect, (req, res) => {
  res.status(200).json(req.user);
})

/**
 * @route GET /api/users/user/friends
 * 
 * Gets all friends of the user.
 */
router.get('/user/friends', protect, getFriends, (req, res) => {
  res.status(200).json({ friends: res.locals.friends });
});

/**
 * @route POST /api/users/user/friends
 * 
 * Adds a friend to the user's friends list.
 */
router.post('/user/friends', protect, addFriend, (req, res) => {
  res.status(200).json('Friend added');
});

/**
 * @route GET /api/users/user
 * 
 * Gets the user.
 */
router.get('/user', protect, (req, res) => {
  res.status(200).json({ user: req.user });
});

/**
 * @route GET /api/users
 * 
 * Gets all users.
 */
router.get('/', protect, getUsers, (req, res) => {
  res.status(200).json({ users: res.locals.users });
});

/**
 * @route POST /api/users
 * 
 * Registers a user.
 */
router.post('/', registerUser);

module.exports = router;