var express = require('express');
var router = express.Router();
var Place = require('./../models/place');

router.get('/', function(req, res, next) {

  Place.find({}, function(err, allPlaces) {
    if (err) throw err;
    //res.render('place', { title: 'Города', "allPlaces": allPlaces});
    res.json(allPlaces);
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
    res.redirect('place');
  });
});

router.post('/:id/delete', function(req, res) {
  
  Place.findById(req.params.id, function (err, place) {
    place.remove();
    res.redirect("/place");
  });
});

router.get('/:id/edit', function(req, res) {
  
  Place.findById(req.params.id, function (err, place) {
    res.render("place-edit", {"place": place});
  });

});

router.post('/:id/edit', function(req, res) {
  
  Place.findById(req.params.id, function (err, place) {
    place.title = req.body.title;
    place.lat = req.body.lat;
    place.long = req.body.long;
    
    place.save(function(err) {
      if (err) throw err;
      res.redirect('place');
    })

  });

});

router.post('/new', function(req, res) {
  
  res.render("place-new");

});

module.exports = router;
