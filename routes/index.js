var express = require('express');
var router = express.Router();
var Cs = require('./../models/cs');
var City = require('./../models/city');
var Training = require('./../models/training');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  Cs.find({}, function(err, allCs) {
    if (err) throw err;
    //console.log(allCs);
    City.find({}, function(err, allCity) {
    	if (err) throw err;
        res.render('index', { title: 'Сohaerens', "allCs": allCs, "allCity": allCity});
    });
  });

  //res.render('index', { title: 'Сohaerens' });
});

router.post('/', function(req, res) {

  Training.find({city: req.body.city, cs: req.body.cs}, function(err, allTraining){
    if (err) throw err;
    res.json(allTraining);
  });

  Training.findOne({city: req.body.city, cs: req.body.cs}, function(err, training){
    if (err) throw err;
    console.log("test: " + training.convert());
  });

  //console.log(req.param);
  //res.json(req.body);

});


module.exports = router;
