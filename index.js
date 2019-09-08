import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import client from './src/models/clientModel';
import routes from './src/routes/userRoutes';

var app = express()
app.listen(3400, function()
{console.log(`Server is listening on port 3400`)})
module.exports = app;

// import dotenv from 'dotenv';
// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import jsonwebtoken from 'jsonwebtoken';
// import client from './src/models/clientModel';
// import routes from './src/routes/userRoutes';

// const result = dotenv.config({path: __dirname + '/.env'});
// if (result.error) {
//     console.log(result.error)
// }

// const app = express();
// const PORT =  process.env.PORT;

// // mongoose connection
// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

// // bodyparser setup
// app.use(bodyParser.urlencoded({ extended: true}));
// app.use(bodyParser.json());

// // JWT Setup
// app.use((request, response, next) => {
//     if (request.headers && request.headers.authorization && request.headers.authorization.split(' ')[0] === 'JWT') {
//         jsonwebtoken.verify(request.headers.authorization.split(' ')[1], 'RESTFULAPIs', (error, decode) => {
//             if (error) request.client = undefined;
//             request.client = decode;
//             next();
//         });
//     } else {
//         request.client = undefined;
//         next();
//     }
// });

// routes(app);

// // serving static files
// app.use(express.static('public/images'));

// app.listen(PORT, () => {
//     console.log(`your server is running on port ${PORT}`);
// });
