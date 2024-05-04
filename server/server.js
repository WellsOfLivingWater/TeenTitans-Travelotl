const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session  = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//use environmental variables
dotenv.config({ path: './config.env' });

// connect to MongoDB cluster
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB();

const app = express();
const port = 3000;

app.use(session({ secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.urlencoded({ extended: true })); //parse urlencoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use('/api/google-api', require('./routes/googleMapApiRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/trip', require('./routes/itineraryRoutes'));
app.use('/api/auth', require('./routes/oauth'));

app.use('/activities', require('./routes/activities'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.use('*', (req, res) => {
  res.status(404).send('Page not found');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => console.log(`Server is running on ${port}`));
