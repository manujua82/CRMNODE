'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _userRoutes = require('./routes/userRoutes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var result = _dotenv2.default.config({ path: __dirname + '/.env' });
if (result.error) {
    console.log(result.error);
}

var app = (0, _express2.default)();
var PORT = process.env.PORT;

// mongoose connection
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(process.env.MONGO_URL, { useNewUrlParser: true });

// bodyparser setup
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// JWT Setup
app.use(function (request, response, next) {
    if (request.headers && request.headers.authorization && request.headers.authorization.split(' ')[0] === 'JWT') {
        _jsonwebtoken2.default.verify(request.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (error, decode) {
            if (error) request.client = undefined;
            request.client = decode;
            next();
        });
    } else {
        request.client = undefined;
        next();
    }
});

(0, _userRoutes.routes)(app);

// serving static files
app.use(_express2.default.static('public'));

app.listen(PORT, function () {
    console.log('your server is running on port ' + PORT);
});