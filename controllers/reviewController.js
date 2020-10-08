module.exports = function (db) {
  return {
    // Get all reviews
    getReviews: function (req, res) {
      db.Review.findAll({}).then(function (dbReview) {
        res.json(dbReview);
      });
    },
    getUsersReviews: function (req, res) {
      db.Review.findAll({ where: { UserId: req.session.passport.user.id }, raw: true }).then(function (dbReview) {
        res.json(dbReview);
      });
    },
    // Create a new review
    createReview: function (req, res) {
      db.Review.create(req.body).then(function (dbReview) {
        res.json(dbReview);
      });
    },
    // Delete an review by id
    deleteReview: function (req, res) {
      db.Review.destroy({ where: { id: req.params.id } }).then(function (dbReview) {
        res.json(dbReview);
      });
    }
  };
};
