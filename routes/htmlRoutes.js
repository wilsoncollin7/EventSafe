const router = require('express').Router();

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
        // console.log(user);
        res.render('profile', user);
      });
    } else {
      res.redirect('/');
    }
  });

  // Load dashboard page

  router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      db.Event.findAll({ raw: true }).then(function (dbEvents) {
        console.log(dbEvents);
        res.render('dashboard', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          msg: 'Welcome!',
          events: dbEvents
        });
      });
    } else {
      res.redirect('/');
    }
  });
  //      db.Event.findOne({ where: { id: req.params.id }, raw: true }).then(function (dbEvent) {
  // Load dashboard page
  router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
      db.Event.findAll({ raw: true }).then(function (dbEvents) {
        res.render('dashboard', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          msg: 'Welcome!',
          events: dbEvents
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Load event index page
  router.get('/event', function (req, res) {
    if (req.isAuthenticated()) {
      db.Event.findAll({ }).then(function (dbEvents) {
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

  // Load example page and pass in an example by id
  router.get('/event/:id', function (req, res) {
    if (req.isAuthenticated()) {
      db.Event.findOne({ where: { id: req.params.id }, raw: true }).then(function (dbEvent) {
        res.render('event-detail', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          event: dbEvent
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Load review index page
  router.get('/review', function (req, res) {
    if (req.isAuthenticated()) {
      db.Review.findAll({ }).then(function (dbReviews) {
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
          review: dbReview
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
