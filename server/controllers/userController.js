const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const LocalStorage = require('node-localstorage').LocalStorage;

const registerUser = async (req, res) => {
  console.log('request to register user', req.body);
  try {
    const { firstName, lastName, email, password } = req.body;

    // check that all fields have been provided
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ error: 'Please add all required fields' })
      return;
    }

    // check if user already exists
    const userExists = await User.findOne({email});

    // console.log(userExists);
    if (userExists) {
      res.status(400).json({ error: 'User already exists'});
      return;
    }

    // hash password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({firstName, lastName, email, password: hashedPassword});

    if (user) {
      res.status(201).json({ _id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, token: generateToken(user._id) })
    } else {
      res.status(400).json({ error: 'Invalid user data'})
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error'});
  }
}

const loginUser = async (req, res, next) => {
  console.log('request to login user', req.body);
  const { email, password } = req.body;
  res.locals.email = email;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      // return res.status(400).json({ error: 'User not found' });
      console.log('User not found');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      console.log('Invalid credentials');
      // return res.status(400).json({ error: 'Invalid credentials' });
    }

    const jwtToken = generateToken(user._id);
    res.locals.jwtToken = jwtToken;
    res.locals.userDetails = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: jwtToken,
    };

    // res.status(200).json({
    //   _id: user._id,
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   email: user.email,
    //   token: jwtToken,
    // });
    return next();
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: 'Internal server error' });
  }
};

const getUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  try {
    res.status(200).json({ id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error'});
  }
  
}

const grantOauthJWT = (req, res, next) => {
  // console.log('grantOauthJWT middleware req.user._id ===>', req.user._id);
  const token = generateToken(req.user._id);
  
  res.locals.jwtToken = token;

  return next();
}

// generate json web token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = { registerUser, loginUser, getUser, grantOauthJWT };