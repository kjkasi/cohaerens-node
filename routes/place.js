var express = require('express');
var router = express.Router();
var Place = require('./../models/place');

router.get('/', function(req, res, next) {

  var filters = {};

  if (req.query._filters) {
    filters = JSON.parse(req.query._filters);
  }

  Place.find(filters, function(err, allPlaces) {
    if (err) throw err;
    res.json(allPlaces);
  });
  
});

router.get('/:id', function(req, res) {

  Place.findById(req.params.id, function(err, place) {
    res.json(place);
  });

});

router.post('/', function(req, res) {

  var place = new Place ({
    title: req.body.title,
    lat: req.body.lat,
    long: req.body.long,
  });

  place.save(function(err){
    if (err) throw err;
    res.sendStatus(200);
  });

});

router.put('/:id', function(req, res) {
  
  Place.findById(req.params.id, function(err, place) {
    place.title = req.body.title;
    place.lat = req.body.lat;
    place.lat = req.body.long;

    place.save(function(err) {
      if (err) throw err;
      res.sendStatus(200);
    });
  });

});

router.delete('/:id', function(req, res) {
  
  Place.findById(req.params.id, function (err, place) {
    place.remove();
    res.sendStatus(200);
  });
});

module.exports = router;
