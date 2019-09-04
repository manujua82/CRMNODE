const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const client = require('./src/models/clientModel');
const routes = require('./src/routes/userRoutes');

const result = dotenv.config({path: __dirname + '/.env'});
if (result.error) {
    console.log(result.error)
}

const app = express();
const PORT =  process.env.PORT;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// JWT Setup
app.use((request, response, next) => {
    if (request.headers && request.headers.authorization && request.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(request.headers.authorization.split(' ')[1], 'RESTFULAPIs', (error, decode) => {
            if (error) request.client = undefined;
            request.client = decode;
            next();
        });
    } else {
        request.client = undefined;
        next();
    }
});

routes(app);

// serving static files
app.use(express.static('public/images'));

app.listen(PORT, () => {
    console.log(`your server is running on port ${PORT}`);
});
