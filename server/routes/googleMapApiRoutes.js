const express = require('express');
const router = express.Router();
const googleController = require('../controllers/googleController');

//validate api
router.get('/', (req, res) => {
  res.json({ message: 'Hello from google api' });
});

router.post(
  '/placeId',
  googleController.getPlaceId,
  googleController.getPlaceDetails,
  (req, res) => {
    console.log('in router', req.body);
    res.status(200).send(res.locals.details);
  }
);

//No more needed - code combined with post request
router.get(
  '/details/:placeId',
  googleController.getPlaceDetails,
  (req, res) => {
    res.status(200).send(res.locals.details);
  }
);

module.exports = router;
