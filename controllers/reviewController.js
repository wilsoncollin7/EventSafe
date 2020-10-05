module.exports = function (db) {
  return {
    // Get all examples
    getReviews: function (req, res) {
      db.Review.findAll({}).then(function (dbReview) {
        res.json(dbReview);
      });
    },
    // Create a new example
    createReview: function (req, res) {
      db.Review.create(req.body).then(function (dbReview) {
        res.json(dbReview);
      });
    },
    // Delete an example by id
    deleteReview: function (req, res) {
      db.Review.destroy({ where: { id: req.params.id } }).then(function (dbReview) {
        res.json(dbReview);
      });
    }
  };
};
