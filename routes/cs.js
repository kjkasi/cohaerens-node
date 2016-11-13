var express = require('express');
var router = express.Router();
var Cs = require('./../models/cs');

router.get('/', function(req, res, next) {
  
  //res.json(req.query);

  var filters = {};

  if (req.query._filters) {
    filters = JSON.parse(req.query._filters);
  }
    //{"title": /qw/i}
  Cs.find(filters, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
  
});

router.get('/:id', function(req, res) {

  Cs.findById(req.params.id, function(err, cs) {
    res.json(cs);
  });

});

router.post('/', function(req, res) {

  var cs = new Cs ({
    title: req.body.title,
    fqStart: req.body.fqStart,
    fqEnd: req.body.fqEnd,
  });

  cs.save(function(err){
    if (err) throw err;
    res.sendStatus(200);
  });

});

router.put('/:id', function(req, res) {
  
  Cs.findById(req.params.id, function(err, cs) {
    cs.title = req.body.title;
    cs.fqStart = req.body.fqStart;
    cs.fqEnd = req.body.fqEnd;

    cs.save(function(err) {
      if (err) throw err;
      res.sendStatus(200);
    });
  });

});

router.delete('/:id', function(req, res) {
  
  Cs.findById(req.params.id, function (err, cs) {
    cs.remove();
    res.sendStatus(200);
  });
});

module.exports = router;
