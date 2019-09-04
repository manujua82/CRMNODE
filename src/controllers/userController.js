const mongoose = require('mongoose');
const UserSchema = require('../models/userModel');

const User = mongoose.model('User', UserSchema);

exports.addNewUser = (request, response) => {
    let newUser = new User(request.body);
    newUser.save((error, user) => {
        if (error) {
            response.send(error);
        }
        response.json(user);
    });
}

exports.getUsers = (request, response) => {
    User.find({}, (error, user) => {
        if (error) {
            response.send(error);
        }
        response.json(user);
    });
};

exports.getUserWithID = (request, response) => {
    User.findById(request.params.userId, (error, user) => {
        if (error) {
            response.send(error);
        }
        response.json(user);
    });
};

exports.updateUser = (request, response) => {
    User.findOneAndUpdate({ _id: request.params.userId }, request.body, { new: true }, (error, user) => {
        if (error) {
            response.send(error);
        }
        response.json(user);
    });
};

exports.deleteUser = (request, response) => {
    User.findOneAndDelete( { _id: request.params.userId}, (error, user) => {
        if (error) {
            response.send(error);
        }
        response.json(user);
    });
};

