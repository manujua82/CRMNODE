const userController = require ('../controllers/userController');
const clientController = require ('../controllers/clientController');

const addNewUser = userController.addNewUser;
const getUsers = userController.getUsers;
const getUserWithID = userController.getUserWithID;
const updateUser = userController.updateUser;
const deleteUser = userController.deleteUser;

const login = clientController.login;
const register = clientController.register;
const loginRquired = clientController.loginRequired;

const routes = (app) => {
    app.route('/user')
    // GET all users
    .get((request, response, next) => {
        // middleware
        console.log(`Request from: ${request.originalUrl}`);
        console.log(`Request type: ${request.method}`);
        next();
    }, loginRquired, getUsers)

    // POST endpoint
    .post(loginRquired, addNewUser);

    app.route('/user/:userId')
    // GET specific User
    .get(loginRquired, getUserWithID)

    // PUT request
    .put(loginRquired, updateUser)

    // DELETE request
    .delete(loginRquired, deleteUser);


    // registration route
    app.route('/auth/register')
        .post(register);

    // login route
    app.route('/auth/login')
        .post(login);
}

module.exports = routes;
