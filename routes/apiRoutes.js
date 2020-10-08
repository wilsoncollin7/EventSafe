const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

module.exports = (passport, db) => {
  const AuthController = require('../controllers/authController')(passport, db);
  const EventController = require('../controllers/eventController')(db);
  const ReviewController = require('../controllers/reviewController')(db);

  // Authentication
  router.post('/register', AuthController.register);
  router.post('/login', AuthController.login);
  router.get('/logout', AuthController.logout);
  router.put('/user/:id', ensureAuthenticated, AuthController.updateUser);
  router.delete('/user/:id', ensureAuthenticated, AuthController.deleteUser);
  router.post('/user/confirm', AuthController.confirmAuth);

  // Event
  router.get('/events', EventController.getUsersEvents);
  router.post('/events', EventController.createEvent);
  router.delete('/events/:id', EventController.deleteEvent);

  // Review
  router.get('/reviews', ReviewController.getUsersReviews);
  router.post('/reviews', ReviewController.createReview);
  router.delete('/reviews/:id', ReviewController.deleteReview);

  return router;
};
