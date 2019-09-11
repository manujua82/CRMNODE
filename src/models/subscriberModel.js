import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
export const SubscriberSchema = new Schema({
    accountId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: String,
    address2: String,
    title: String,
    license: String,
    biography: String,
    phone: Number,
    email: { type: String, required: true },
    photoUrl: String,
    websiteUrl: String,
    hashPassword: { type: String, required: true },
    created_date: { type: Date,  default: Date.now }
});

SubscriberSchema.methods.comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};
