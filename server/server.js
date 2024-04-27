const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
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

// TEST CODE - CAN DELETE WHEN FINISHED
// const tripController = require('./controllers/itinerary_controller');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.urlencoded({ extended: true })); //parse urlencoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use('/api/google-api', require('./routes/googleMapApiRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/trip', require('./routes/itineraryRoutes'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, () => console.log(`Server is running on ${port}`));
