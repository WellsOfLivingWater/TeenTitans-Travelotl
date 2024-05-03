const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createErr = require('../utils/createErr');

// JWT generator
const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// Controller for user routes
const userController = {

  getUsers: async (req, res, next) => {
    try {
      const users = await User.find({}, '_id firstName lastName');
      res.locals.users = users;
      return next();
    } catch (err) {
      return next(createErr({
        method: 'userController.getUsers',
        type: 'database',
        err
      }));
    }
  },

  registerUser: async (req, res, next) => {
    console.log('request to register user', req.body);
    try {
      const { firstName, lastName, email, password } = req.body;

      // check that all fields have been provided
      if (!firstName || !lastName || !email || !password)
        throw new Error('Please add all required fields');

      // check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists)
        throw new Error('User already exists');

      // hash password using bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // create user
      const user = await User.create({ firstName, lastName, email, password: hashedPassword });

      if (user) {
        const token = generateToken(user._id);
        res.locals.userDetails = { _id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email };
        res.locals.jwtToken = token;
        res.locals.email = user.email;
        return next();
      } else {
        throw new Error('Invalid user data');
      }
    } catch (err) {
      return next(createErr({
        method: 'userController.registerUser',
        type: 'registration',
        err
      }));
    }
  },

  loginUser: async (req, res, next) => {
    console.log('request to login user', req.body);
    const { email, password } = req.body;
    res.locals.email = email;

    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user)
        throw new Error('User not found');

      // Check if password is correct
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid)
        throw new Error('Invalid password');

      // Create token
      const jwtToken = generateToken(user._id);
      res.locals.jwtToken = jwtToken;
      res.locals.userDetails = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      return next();
    } catch (err) {
      return next(createErr({
        method: 'userController.loginUser',
        type: 'authentication',
        err
      }))
    }
  },

  getUser: async (req, res) => {
    const user = await User.findById(req.user.id);
    try {
      res.status(200)
        .json({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          friends: user.friends
        })
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error'});
    }
  },

  grantOauthJWT: (req, res, next) => {
    try {
      const token = generateToken(req.user._id);
      console.log("OAUTH user details", req.user);
      res.locals.jwtToken = token;
      return next();
    } catch (err) {
      return next(createErr({
        method: 'userController.grantOauthJWT',
        type: 'authentication',
        err
      }));
    }
  },
};

module.exports = userController;