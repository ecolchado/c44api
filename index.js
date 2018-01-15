const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');


//set up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/maps');
mongoose.Promise = global.Promise;

var whitelist = ["http://localhost:3000", "http://192.168.0.5:3000"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    console.log(whitelist.indexOf(req.header('Origin')) !== -1);
    corsOptions = {
      origin: true,
      methods: 'GET,PUT,POST',
      allowedHeaders: 'Content-Type, Authorization, application/json, text/html, multipart/form-data',
      credentials: true
    } // reflect (enable) the requested origin in the CORS response
  }else{
    console.log(whitelist.indexOf(req.header('Origin')) !== -1);
    corsOptions = {
      origin: false,
      methods: 'GET,PUT,POST',
      allowedHeaders: 'Content-Type, Authorization, json, text/html, multipart/form-data',
      credentials: true
    } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
};


//initialize routes
app.options('*', cors());
app.use(cors(corsOptionsDelegate));
app.use(bodyParser.json());
app.use('/api', require('./routes/api'));



//error handling middleware
app.use(function(err, req, res, next){
  //console.log(err);
  res.status(422).send({err: err.message});
});


//listen for requests
app.listen(process.env.port||4000, function(){
  console.log('now listening for requests');
});
