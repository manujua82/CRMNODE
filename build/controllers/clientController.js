'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = register;
exports.login = login;
exports.loginRequired = loginRequired;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _clientModel = require('../models/clientModel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Client = _mongoose2.default.model('client', _clientModel.ClientSchema);

function register(request, response) {
    var newClient = new Client(request.body);
    newClient.hashPassword = _bcrypt2.default.hashSync(request.body.password, 10);
    newClient.save(function (error, client) {
        if (error) {
            return response.status(400).send({
                message: error
            });
        } else {
            client.hashPassword = undefined;
            return response.json(client);
        }
    });
}

function login(request, response) {
    Client.findOne({
        clientId: request.body.clientId
    }, function (error, client) {
        if (error) {
            throw error;
        }
        if (!client) {
            response.status(401).json({
                message: 'Authentication failed. No client found!'
            });
        } else if (client) {
            if (!client.comparePassword(request.body.password, client.hashPassword)) {
                response.status(401).json({
                    message: 'Authentication failed. Wrong password!'
                });
            } else {
                return response.json({
                    token: _jsonwebtoken2.default.sign({
                        clientId: client.clientId,
                        username: client.username,
                        _id: client.id
                    }, 'RESTFULAPIs')
                });
            }
        }
    });
}

function loginRequired(request, response, next) {
    if (request.client) {
        next();
    } else {
        return response.status(401).json({
            message: 'Unauthorized client!'
        });
    }
}