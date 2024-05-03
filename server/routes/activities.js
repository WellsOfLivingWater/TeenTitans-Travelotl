const express = require('express');

const activitiesController = require('../controllers/activitiesController');

const router = express.Router();

router.get('/', activitiesController.getActivities, (req, res) => {
  res.status(200).json(res.locals.activities);
});

router.post('/', activitiesController.getMoreActivities, (req, res) => {
  res.status(200).json(res.locals.activities);
});

module.exports = router;