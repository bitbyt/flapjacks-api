module.exports = function(app) {

  var eventsController = require('../controllers/events.server.controller');

  app.route('/events')
    .get(eventsController.index)
    .post(eventsController.create);

  app.route('/events/:id')
    .get(eventsController.show)
    .put(eventsController.update)
    .delete(eventsController.destroy);

};
