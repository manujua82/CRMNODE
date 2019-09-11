import mongoose from 'mongoose';
import { AccountSchema } from '../models/accountModel';

const Account = mongoose.model('account', AccountSchema);

export function createAccount(options) {
    return new Promise ((resolve, reject) => {
        let newAccount = new Account(options);
        newAccount.save((error, account) => {
            if (error) {
                reject;
            }
            resolve(account);
        });
    });
    
}