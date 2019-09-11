import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SubscriberSchema } from '../models/subscriberModel';
import { createAccount } from './accountController';

const Subscriber = mongoose.model('subscriber', SubscriberSchema);
const DefaultAccount = {
    type: '',
    status: true,
    autoEmail: false,
    autoEmailAfter: false,
    phoneRequired: false,
    emailCopyBBC: false,
    emailRequired: false
}

function createNewAccount(request, response) {
    DefaultAccount.type = request.body.accountType;
    createAccount(DefaultAccount).then((account) => {
        request.body.accountId = account._id;
        const newSubscriber = new Subscriber(request.body);
        newSubscriber.hashPassword = bcrypt.hashSync(request.body.password, 10);
        newSubscriber.save((error, subscriber) => {
            if (error) {
                return response.status(400).send({
                    message: error
                });
            } else {
                subscriber.hashPassword = undefined;
                return response.json(subscriber);
            }
        });
    });
}

export function register(request, response) {
    Subscriber.findOne({ email: request.body.email}, (error, subscriber) => {
        if (error) {
            throw error;
        }
        if (subscriber) {
            response.status(401).json({
                message: 'Register failed. Email already register!'
            });
        } else {
            createNewAccount(request, response); 
        }
    });
}

export function login(request, response) {
    Subscriber.findOne({
        email: request.body.email
    }, (error, subscriber) => {
        if (error) {
            throw error;
        }
        if (!subscriber) {
            response.status(401).json({
                message: 'Authentication failed. No subscriber found!'
            });
        } else if (subscriber) {
            if (!subscriber.comparePassword(request.body.password, subscriber.hashPassword)) {
                response.status(401).json({
                    message: 'Authentication failed. Wrong password!'
                });
            } else {
                return response.json({
                    token: jwt.sign({
                        email: subscriber.email,
                        _id: subscriber.id
                    }, 'RESTFULAPIs'),
                    accountId: subscriber.accountId,
                    userId: subscriber._id
                });
            }
        }
    });
}

export function loginRequired(request, response, next) {
    if (request.subscriber) {
        next();
    } else {
        return response.status(401).json({
            message: 'Unauthorized subscriber!'
        })
    }
}
