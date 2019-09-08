import mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const UserSchema = new Schema({
    name: String,
    title: String,
    email: String,
    phone: Number ,
    created_date: { type: Date,  default: Date.now }
});
