const express = require('express');
const router = express.Router();
const tripController = require('../controllers/itinerary_controller');
const authController = require('../controllers/auth_controller');
const googleController = require('../controllers/googleController');

router.post(
  '/build',
  (req, res, next) => {
    console.log('build route invoked');
    return next();
  },
  authController.protect,
  tripController.buildTrip,
  googleController.getPlaceDetailsByText,
  tripController.saveTrip,
  (req, res) => {
    res.status(201).send(res.locals.detailedItinerary);
  }
);

router.post(
  '/suggest',
  authController.protect,
  tripController.generateSuggestions,
  googleController.getSuggestionDetailsByText,
  (req, res) => {
    res.status(201).send(res.locals.detailedSuggestions);
  }
);

router.get(
  '/retrieve',
  authController.protect,
  tripController.retrieveAll,
  (req, res) => {
    // console.log(res.locals.allTrips[0]._id);
    res.status(200).json(res.locals.allTrips);
  }
);

router.post(
  '/update',
  authController.protect,
  tripController.updateTrip,
  (req, res) => {
    res.status(200).send(res.locals.updatedTrip);
  }
);

router.delete(
  '/delete',
  authController.protect,
  tripController.deleteTrip,
  (req, res) => {
    res.status(200).send('Trip deleted successfully.');
  }
);

module.exports = router;
