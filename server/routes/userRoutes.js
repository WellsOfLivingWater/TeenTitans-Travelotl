const express = require('express');

const { registerUser, loginUser, getUsers } = require('../controllers/userController');
const { setCookiesBasic, clearCookies } = require('../controllers/cookie_controller');
const { protect } = require('../controllers/auth_controller');
const { getFriends, addFriend, deleteFriend } = require('../controllers/friendsController');

const router = express.Router();

/**
 * @route POST /api/users/login
 * 
 * Logs in a user, sets cookies, and sends user details.
 */
router.post('/login', loginUser, setCookiesBasic, (req, res) => {
  console.log('login success');
  res.status(200).json(res.locals.userDetails);
});

/**
 * @route POST /api/users/logout
 * 
 * Logs out a user and clears cookies.
 */ 
router.post('/logout', clearCookies, (req, res) => {
  res.status(200).json('Logged Out');
});

/**
 * @route GET /api/users/isAuthenticated
 * 
 * Checks if a user is authenticated.
 */
router.get('/isAuthenticated', protect, (req, res) => {
  const response = req.user ? { user: req.user } : { user: null };
  res.status(200).json(response);
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
 * @route DELETE /api/users/user/friends
 * 
 * Deletes a friend from the user's friends list.
 */
router.delete('/user/friends', protect, deleteFriend, (req, res) => {
  res.status(200).json('Friend deleted');
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
router.post('/', registerUser, setCookiesBasic, (req, res) => {
  console.log('register success');
  res.status(201).json(res.locals.userDetails);
});

module.exports = router;