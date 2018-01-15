const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const Photo = require('../models/Photo');
const fs = require('fs');
const multer = require('multer');
const FormData = require('form-data');
const path = require('path');

//get item from db
router.get('/locations', function(req, res, next){
  Location.find({}).then(function(location){
    res.send(location);
  });
});

//add item to the db
router.post('/locations', function(req, res, next){
  Location.create(req.body).then(function(location){
    res.send(location);
  }).catch(next);
});

//update item to the db
router.put('/locations/:id', function(req, res, next){
  Location.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function(){
    Location.findOne({_id: req.params.id}).then(function(location){
      res.send(location);
      res.end();
    }).catch(next);
  });
});

//delete item to the db
router.delete('/locations/:id', function(req, res, next){
  Location.findByIdAndRemove({ _id : req.params.id }).then(function(location){
    res.send(location);
    res.end();
  }).catch(next);
});

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function(req, body, cb){
    cb(null, body.originalname + '_' + Date.now() +
    path.extname(body.originalname));
  }
});

const upload = multer({ storage:storage });

router.post('/uploads', upload.any(), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  console.log(req.files[0]);
  const date = new Date(Number(req.body.date));
  console.log(date);

  const tmp_path = req.files[0].path;
  const target_path = 'C:/Projects/c44API/uploads/' + req.body.loc + '_' +
  Date.now() + path.extname(req.files[0].originalname);
  fs.rename(tmp_path, target_path, function(err){
    if(err) throw err;
  });
  res.send(req.body);
  res.end();
});
/*
  const request = {
    locId : req.body.loc,
    description: req.body.look,
    imgName : req.body.name,
  }

  const reqJSON = JSON.stringify(request);
  console.log(reqJSON);

  Photo.create(reqJSON).then(function(location){
      res.send(location);
      res.end();
    }).catch(next);
});
*/
router.get('/uploads', function(req, res, next){
  Photo.find({}).then(function(location){
    res.send(location);
    res.end();
  });
});

module.exports = router;
