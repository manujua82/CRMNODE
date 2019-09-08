import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
export const ClientSchema = new Schema({
    username: { type: String, required: true },
    clientId: { type: String, required: true },
    hashPassword: { type: String, required: true },
    created_date: { type: Date,  default: Date.now }
});

ClientSchema.methods.comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};
