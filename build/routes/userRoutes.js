'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.routes = routes;

var _userController = require('../controllers/userController');

var _clientController = require('../controllers/clientController');

function routes(app) {
    app.route('/user')
    // GET all users
    .get(function (request, response, next) {
        // middleware
        console.log('Request from: ' + request.originalUrl);
        console.log('Request type: ' + request.method);
        next();
    }, _clientController.loginRequired, _userController.getUsers)

    // POST endpoint
    .post(_clientController.loginRequired, _userController.addNewUser);

    app.route('/user/:userId')
    // GET specific User
    .get(_clientController.loginRequired, _userController.getUserWithID)

    // PUT request
    .put(_clientController.loginRequired, _userController.updateUser)

    // DELETE request
    .delete(_clientController.loginRequired, _userController.deleteUser);

    // registration route
    app.route('/auth/register').post(_clientController.register);

    // login route
    app.route('/auth/login').post(_clientController.login);
}