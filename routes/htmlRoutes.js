const router = require('express').Router();
const moment = require('moment');

module.exports = (db) => {
  // Load register page
  router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    } else {
      res.render('register');
    }
  });

  // Load profile page
  router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: req.session.passport.user.id
        }
      }).then(() => {
        const user = {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        res.render('profile', user);
      });
    } else {
      res.redirect('/');
    }
  });

  // Load dashboard page
  router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      db.Event.findAll({ limit: 10, order: [['date', 'ASC']], include: [db.User], raw: true }).then(function (dbEvents) {
        db.Review.findAll({ limit: 10, order: [['createdAt', 'DESC']], include: [db.User], raw: true }).then(function (dbReviews) {
          for (let i = 0; i < dbEvents.length; i++) {
            dbEvents[i].postedBy = dbEvents[i]['User.firstName'] + ' ' + dbEvents[i]['User.lastName'];
            dbEvents[i].date = moment(dbEvents[i].date).format('MMM Do YYYY, h:mm a');
            dbEvents[i].createdAt = moment(dbEvents[i].createdAt).format('MMM Do YYYY, h:mm a');
          }
          for (let i = 0; i < dbReviews.length; i++) {
            dbReviews[i].postedBy = dbReviews[i]['User.firstName'] + ' ' + dbReviews[i]['User.lastName'];
            dbReviews[i].createdAt = moment(dbReviews[i].createdAt).format('MMM Do YYYY, h:mm a');
          }
          res.render('dashboard', {
            userInfo: req.session.passport.user,
            isloggedin: req.isAuthenticated(),
            events: dbEvents,
            reviews: dbReviews
          });
        });
      });
    } else {
      res.render('dashboard');
    }
  });

  // Load dashboard page
  router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
      db.Event.findAll({ limit: 10, order: [['date', 'ASC']], include: [db.User], raw: true }).then(function (dbEvents) {
        db.Review.findAll({ limit: 10, order: [['createdAt', 'DESC']], include: [db.User], raw: true }).then(function (dbReviews) {
          for (let i = 0; i < dbEvents.length; i++) {
            dbEvents[i].postedBy = dbEvents[i]['User.firstName'] + ' ' + dbEvents[i]['User.lastName'];
            dbEvents[i].date = moment(dbEvents[i].date).format('MMM Do YYYY, h:mm a');
            dbEvents[i].createdAt = moment(dbEvents[i].createdAt).format('MMM Do YYYY, h:mm a');
          }
          for (let i = 0; i < dbReviews.length; i++) {
            dbReviews[i].postedBy = dbReviews[i]['User.firstName'] + ' ' + dbReviews[i]['User.lastName'];
            dbReviews[i].createdAt = moment(dbReviews[i].createdAt).format('MMM Do YYYY, h:mm a');
          }
          res.render('dashboard', {
            userInfo: req.session.passport.user,
            isloggedin: req.isAuthenticated(),
            events: dbEvents,
            reviews: dbReviews
          });
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Load event index page
  router.get('/event', function (req, res) {
    if (req.isAuthenticated()) {
      db.Event.findAll({ where: { UserId: req.session.passport.user.id }, raw: true }).then(function (dbEvents) {
        res.render('event', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          msg: 'Let\'s do this!',
          events: dbEvents
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Load event page and pass in an event by id
  router.get('/event/:id', function (req, res) {
    if (req.isAuthenticated()) {
      db.Event.findOne({ where: { id: req.params.id }, raw: true }).then(function (dbEvent) {
        res.render('event-detail', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          event: { ...dbEvent, date: moment(dbEvent.date).format('MMM Do YYYY, h:mm a') }
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Load review index page
  router.get('/review', function (req, res) {
    if (req.isAuthenticated()) {
      db.Review.findAll({ where: { UserId: req.session.passport.user.id }, raw: true }).then(function (dbReviews) {
        res.render('review', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          msg: 'Let\'s do this!',
          reviews: dbReviews
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Load review page and pass in an review by id
  router.get('/review/:id', function (req, res) {
    if (req.isAuthenticated()) {
      db.Review.findOne({ where: { id: req.params.id }, raw: true }).then(function (dbReview) {
        res.render('review-detail', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          review: { ...dbReview, date: moment(dbReview.date).format('MMM Do YYYY') }
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Logout
  router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.redirect('/');
    });
  });

  // Render 404 page for any unmatched routes
  router.get('*', function (req, res) {
    res.render('404');
  });

  return router;
};
