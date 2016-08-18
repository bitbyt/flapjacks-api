module.exports = function(app) {

  var usersController = require('../controllers/users.server.controller');
  var eventsController = require('../controllers/events.server.controller');

  //login routes
  app.route('/signup').post(usersController.signup);
  app.route('/login').post(usersController.login);

  //users routes
  app.route('/api/users')
    .get(usersController.index);

  app.route('/api/users/:id')
    .get(usersController.show)
    .put(usersController.update)
    .delete(usersController.destroy);

  //events routes
  app.route('/events')
    .get(eventsController.index)
    .post(eventsController.create);

  app.route('/events/:id')
    .get(eventsController.show)
    .put(eventsController.update)
    .delete(eventsController.destroy);
};
