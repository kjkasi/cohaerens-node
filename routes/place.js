var express = require('express');
var router = express.Router();
var Place = require('./../models/place');

router.get('/', function(req, res, next) {

  var filters = {};

  if (req.query._filters) {
    filters = JSON.parse(req.query._filters);
  }

  /*Place.find(filters, function(err, allPlaces) {
    if (err) throw err;
    res.json(allPlaces);
  });*/

  var page = Number(req.query._page);
  var perPage = Number(req.query._perPage);

  var offset = (page - 1) * perPage;
  var limit = perPage;

  Place.find(filters).skip(offset).limit(limit).exec(function(err, result) {
    if (err) throw err;
    Place.count(filters, function(err, count) {
      res.set({"X-Total-Count": count});
      res.json(result);
    });
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
