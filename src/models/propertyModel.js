import mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const PropertySchema = new Schema({
    userId: { type: String,  required: true },
    active: Boolean,
    title: String,
    description: String,
    address: String,
    city: String,
    state: String,
    postalcode: Number,
    type: Number,
    price: Number,
    sqft: Number,
    beds: Number,
    fullBath: Number,
    halfBath: Number,
    created_date: { type: Date,  default: Date.now }
});