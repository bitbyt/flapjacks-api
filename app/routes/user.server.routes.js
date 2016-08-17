module.exports = function(app) {

  var usersController = require('../controllers/users.server.controller');

  app.route('/users')
    .get(usersController.index);

  app.route('/signup').post(usersController.signup);
  app.route('/login').post(usersController.login);

  app.route('/users/:id')
    .get(usersController.show)
    .put(usersController.update)
    .delete(usersController.destroy);

};
