import mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const LeadSchema = new Schema({
    userId: { type: String,  required: true },
    name: String,
    address: String,
    email: String,
    phone: Number,
    hasAgent: Boolean,
    created_date: { type: Date,  default: Date.now }
});
