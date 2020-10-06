module.exports = function (db) {
  return {
    // Get all events
    getEvents: function (req, res) {
      db.Event.findAll({}).then(function (dbEvent) {
        res.json(dbEvent);
      });
    },
    // Create a new event
    createEvent: function (req, res) {
      console.log('made it to the creat event: ' + req.body);
      db.Event.create(req.body).then(function (dbEvent) {
        res.json(dbEvent);
      });
    },
    // Delete an event
    deleteEvent: function (req, res) {
      db.Event.destroy({ where: { id: req.params.id } }).then(function (dbEvent) {
        res.json(dbEvent);
      });
    }
  };
};
