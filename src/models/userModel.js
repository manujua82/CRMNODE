const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    title: String,
    email: String,
    phone: Number ,
    created_date: { type: Date,  default: Date.now }
});

module.exports = UserSchema;
