const express = require('express');
const tourController = require('../controllers/tourController'); //equivalent of exports in tourRoutes

const router = express.Router();

router.param('id', tourController.checkID);

//todo create checkBody middleware function and check if body contaains name and price property
//todo if not send back 400 (bad request)
//todo add it to post handler stack

//routing from tourRouter' url in app.js
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
