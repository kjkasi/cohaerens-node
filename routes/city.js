var express = require('express');
var router = express.Router();
var City = require('./../models/city');

router.get('/', function(req, res, next) {
  
  City.find({}, function(err, allCity) {
    if (err) throw err;
    res.render('city', { title: 'Города', "allCity": allCity});
  });
  //res.render('cs', { title: 'Системы связи' });
});

router.post('/', function(req, res) {

  var city = new City ({
        title: req.body.title,
        lat: req.body.lat,
        long: req.body.long,  
    });

  city.save(function(err){
    if (err) throw err;

    City.find({}, function(err, allCity) {
      if (err) throw err;
        res.render('city');
    });
  });
});

router.post('/:id/delete', function(req, res) {
  
  res.redirect("/city");
  City.findById(req.params.id, function (err, city) {
    console.log('Delete ' + city);
    city.remove();
    res.render("city");
  });
});

router.get('/:id/edit', function(req, res) {
  
  City.findById(req.params.id, function (err, city) {
    console.log('Edit ' + city);
    res.render("city-edit", {"city": city});
  });

});

router.post('/new', function(req, res) {
  
  res.render("city-new");

});

module.exports = router;
