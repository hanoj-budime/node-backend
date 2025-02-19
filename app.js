const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
/*Parse incoming request bodies in a middleware before your handlers, available under the req.body property*/
const bodyParser = require('body-parser');

const user = require('./routes/user');
const userProfile = require('./routes/userProfile');

// mongoose connections
mongoose.connect(
    `mongodb+srv://${username}:${password}@node-rest-shop-7gyns.mongodb.net/test?retryWrites=true`, 
    {
    useNewUrlParser : true
    }
);

//Handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/Hello',(req, res, next) =>{
    res.status(201).json({
        message : 'Hello world'
    });
});

app.use('/user',user);
app.use('/userProfile',userProfile);

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;
