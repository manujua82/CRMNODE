import { addNewUser, getUsers, getUserWithID, updateUser, deleteUser }  from '../controllers/userController';
import { login, register, loginRequired } from '../controllers/clientController';

export function routes(app) {
    app.route('/user')
    // GET all users
    .get((request, response, next) => {
        // middleware
        console.log(`Request from: ${request.originalUrl}`);
        console.log(`Request type: ${request.method}`);
        next();
    }, loginRequired , getUsers)

    // POST endpoint
    .post(loginRequired , addNewUser);

    app.route('/user/:userId')
    // GET specific User
    .get(loginRequired , getUserWithID)

    // PUT request
    .put(loginRequired , updateUser)

    // DELETE request
    .delete(loginRequired , deleteUser);

    // registration route
    app.route('/auth/register')
        .post(register);

    // login route
    app.route('/auth/login')
        .post(login);
} 
