var express = require('express');
var router = express.Router();

var Cs = require('./../models/cs');
var City = require('./../models/city');
var Condition = require('./../models/condition');

router.get('/', function(req, res, next) {

  Condition.find({}).populate('city').populate('cs').exec(function(err, allConditions){
    if (err) throw err;
    Cs.find({}, function(err, allCs) {
      if (err) throw err;
      City.find({}, function(err, allCity) {
        if (err) throw err;
        res.render('condition', {"allCs": allCs, "allCity": allCity, "allConditions": allConditions});
      });
    });
  });
});

router.post('/', function(req, res) {
  
  var condition = new Condition ({
        title: req.body.title,
        cs: req.body.cs,
        sv: req.body.sv,
        kp: req.body.kp,
        count: req.body.count,
        power: req.body.power,
        city: req.body.city,
        date: req.body.date,
        result: req.body.result,  
  });

  condition.save(function(err){

    if (err) throw err;
    res.redirect('/condition');

  });

});

router.post('/:id/delete', function(req, res) {
  
  Condition.findById(req.params.id, function (err, condition) {
    condition.remove();
    res.redirect("/condition");
  });
  
});

router.get('/:id/edit', function(req, res) {

  Condition.find({}).populate('city').populate('cs').exec(function(err, allConditions){
    if (err) throw err;
    Cs.find({}, function(err, allCs) {
      if (err) throw err;
      City.find({}, function(err, allCity) {
        if (err) throw err;
        Condition.findById(req.params.id, function(err, condition){
          if (err) throw err;
          res.render('condition-edit', {"allCs": allCs, "allCity": allCity, "allConditions": allConditions, condition: condition, "info": condition.getDateFormat(), "date": condition.getDateFormat()});
        });
      });
    });
  });

});

module.exports = router;