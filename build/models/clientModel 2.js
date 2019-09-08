'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ClientSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var ClientSchema = exports.ClientSchema = new Schema({
    username: { type: String, required: true },
    clientId: { type: String, required: true },
    hashPassword: { type: String, required: true },
    created_date: { type: Date, default: Date.now }
});

ClientSchema.methods.comparePassword = function (password, hashPassword) {
    return _bcrypt2.default.compareSync(password, hashPassword);
};