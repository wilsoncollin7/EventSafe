// need to use Sequelize to get, add, and delete an event

module.exports = function (db) {
  return {
    // Get all examples
    getEvents: function (req, res) {
      db.Event.findAll({}).then(function (dbEvent) {
        res.json(dbEvent);
      });
    },
    // Create a new example
    createEvent: function (req, res) {
      db.Event.create(req.body).then(function (dbEvent) {
        res.json(dbEvent);
      });
    },
    // Delete an example by id
    deleteEvent: function (req, res) {
      db.Event.destroy({ where: { id: req.params.id } }).then(function (dbEvent) {
        res.json(dbEvent);
      });
    }
  };
};
