module.exports = function(app) {

  var usersController = require('../controllers/users.server.controller');

  app.route('/users')
    .get(usersController.index)
    .post(usersController.create);

  app.route('/users/:id')
    .get(usersController.show)
    .put(usersController.update)
    .delete(usersController.destroy);

};
