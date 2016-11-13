var express = require('express');
var router = express.Router();
var Cs = require('./../models/cs');

router.get('/', function(req, res, next) {

  var filters = {};

  if (req.query._filters) {
    filters = JSON.parse(req.query._filters);
  }

  var page = Number(req.query._page);
  var perPage = Number(req.query._perPage);

  var offset = (page - 1) * perPage;
  var limit = perPage;

  Cs.find(filters).skip(offset).limit(limit).exec(function(err, result) {
    if (err) throw err;
    Cs.count(filters, function(err, count) {
      res.set({"X-Total-Count": count});
      res.json(result);
    });
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
