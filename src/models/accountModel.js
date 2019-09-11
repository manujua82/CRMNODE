import mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const AccountSchema = new Schema({
    type: Number,
    status: Boolean,
    autoEmail: Boolean,
    autoEmailAfter: Boolean,
    phoneRequired: Boolean,
    emailCopyBBC: Boolean,
    emailRequired: Boolean,
    created_date: { type: Date,  default: Date.now }
});