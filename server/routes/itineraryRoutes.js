const express = require('express');
const router = express.Router();
const tripController = require('../controllers/itinerary_controller');
const authController = require('../controllers/auth_controller');
const googleController = require('../controllers/googleController');

router.post(
  '/build',
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

router.post(
  '/addEditor',
  authController.protect,
  tripController.addEditor,
  (req, res) => {
    res.status(200).send('Editor added successfully.');
  }
);

router.post(
  '/removeEditor',
  authController.protect,
  tripController.removeEditor,
  (req, res) => {
    res.status(200).send('Editor removed successfully.');
  }
);

router.post(
  '/addViewer',
  authController.protect,
  tripController.addViewer,
  (req, res) => {
    res.status(200).send('Viewer added successfully.');
  }
);

router.post(
  '/removeViewer',
  authController.protect,
  tripController.removeViewer,
  (req, res) => {
    res.status(200).send('Viewer removed successfully.');
  }
);

module.exports = router;
