'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var UserSchema = exports.UserSchema = new Schema({
    name: String,
    title: String,
    email: String,
    phone: Number,
    created_date: { type: Date, default: Date.now }
});