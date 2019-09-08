import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ClientSchema } 
from '../models/clientModel';

const Client = mongoose.model('client', ClientSchema);

export function register(request, response) {
    const newClient = new Client(request.body);
    newClient.hashPassword = bcrypt.hashSync(request.body.password, 10);
    newClient.save((error, client) => {
        if (error) {
            return response.status(400).send({
                message: error
            });
        } else {
            client.hashPassword = undefined;
            return response.json(client);
        }
    });
}

export function login(request, response) {
    Client.findOne({
        clientId: request.body.clientId
    }, (error, client) => {
        if (error) {
            throw error;
        }
        if (!client) {
            response.status(401).json({
                message: 'Authentication failed. No client found!'
            });
        } else if (client) {
            if (!client.comparePassword(request.body.password, client.hashPassword)) {
                response.status(401).json({
                    message: 'Authentication failed. Wrong password!'
                });
            } else {
                return response.json({
                    token: jwt.sign({
                        clientId: client.clientId,
                        username: client.username,
                        _id: client.id
                    }, 'RESTFULAPIs')
                });
            }
        }
    });
}

export function loginRequired(request, response, next) {
    if (request.client) {
        next();
    } else {
        return response.status(401).json({
            message: 'Unauthorized client!'
        })
    }
}
