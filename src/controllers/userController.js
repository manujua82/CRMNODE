import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User', UserSchema);

export function addNewUser(request, response) {
    // create account first
    let newUser = new User(request.body);
    newUser.save((error, user) => {
        if (error) {
            response.send(error);
        }
        response.json(user);
    });
}

export function getUsers(request, response) {
    User.find({}, (error, user) => {
        if (error) {
            response.send(error);
        }
        response.json(user);
    });
};

export function getUserWithID(request, response) {
    User.findById(request.params.userId, (error, user) => {
        if (error) {
            response.send(error);
        }
        response.json(user);
    });
};

export function updateUser(request, response) {
    User.findOneAndUpdate({ _id: request.params.userId }, request.body, { new: true }, (error, user) => {
        if (error) {
            response.send(error);
        }
        response.json(user);
    });
};

export function deleteUser(request, response) {
    User.findOneAndDelete( { _id: request.params.userId}, (error, user) => {
        if (error) {
            response.send(error);
        }
        response.json(user);
    });
};

