var express = require('express');
var router = express.Router();

var Condition = require('./../models/condition');

router.get('/', function(req, res, next) {
  
  //console.log(req.query);

  Condition.find({}, function(err, allConditions) {
    if (err) throw err;
    res.json(allConditions);
  });
  
});

router.get('/:id', function(req, res) {

  Condition.findById(req.params.id, function(err, condition) {
    res.json(condition);
  });

});

router.post('/', function(req, res) {

  /*title: String,
  cs:   {type: Schema.Types.ObjectId, ref: 'Cs'},
  sv:  Number,
  kp:  Number,
  count:  Number,
  power:  Number,
  place:  {type: Schema.Types.ObjectId, ref: 'Place'},
  date: Date,
  result: String*/

  var condition = new Condition ({
    title: req.body.title,
    cs: req.body.cs,
    sv: req.body.sv,
    kp: req.body.kp,
    count: req.body.count,
    power: req.body.power,
    place: req.body.place,
    result: req.body.result,
  });

  condition.save(function(err){
    if (err) throw err;
    res.sendStatus(200);
  });

});

router.put('/:id', function(req, res) {
  
  Condition.findById(req.params.id, function(err, condition) {
    condition.title = req.body.title,
    condition.cs = req.body.cs,
    condition.sv = req.body.sv,
    condition.kp = req.body.kp,
    condition.count = req.body.count,
    condition.power = req.body.power,
    condition.place = req.body.place,
    condition.result = req.body.result,

    condition.save(function(err) {
      if (err) throw err;
      res.sendStatus(200);
    });
  });

});

router.delete('/:id', function(req, res) {
  
  Condition.findById(req.params.id, function (err, condition) {
    condition.remove();
    res.sendStatus(200);
  });
});

module.exports = router;