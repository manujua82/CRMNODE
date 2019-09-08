'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addNewUser = addNewUser;
exports.getUsers = getUsers;
exports.getUserWithID = getUserWithID;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userModel = require('../models/userModel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _mongoose2.default.model('User', _userModel.UserSchema);

function addNewUser(request, response) {
    var newUser = new User(request.body);
    newUser.save(function (error, user) {
        if (error) {
            response.send(error);
        }
        response.json(user);
    });
}

function getUsers(request, response) {
    User.find({}, function (error, user) {
        if (error) {
            response.send(error);
        }
        response.json(user);
    });
};

function getUserWithID(request, response) {
    User.findById(request.params.userId, function (error, user) {
        if (error) {
            response.send(error);
        }
        response.json(user);
    });
};

function updateUser(request, response) {
    User.findOneAndUpdate({ _id: request.params.userId }, request.body, { new: true }, function (error, user) {
        if (error) {
            response.send(error);
        }
        response.json(user);
    });
};

function deleteUser(request, response) {
    User.findOneAndDelete({ _id: request.params.userId }, function (error, user) {
        if (error) {
            response.send(error);
        }
        response.json(user);
    });
};