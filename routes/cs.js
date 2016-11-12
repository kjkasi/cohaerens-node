var express = require('express');
var router = express.Router();
var Cs = require('./../models/cs');
var condition = require('./../models/condition');

router.get('/', function(req, res, next) {
  
  //console.log(req.query);

  Cs.find({}, function(err, allCs) {
    if (err) throw err;
    res.json(allCs);
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

router.delete('/', function(req, res) {
  
  console.log('delete: ' + req.body);
  res.sendStatus(200);

});

router.post('/:id/delete', function(req, res) {
  
  res.redirect("/cs");
  Cs.findById(req.params.id, function (err, cs) {
    console.log('delete ' + cs);
    cs.remove();
    res.render("cs");
  });
});

router.get('/:id/edit', function(req, res) {
  
  Cs.findById(req.params.id, function (err, cs) {
    if (err) throw err;
    condition.find({}, function(err, conditions) {
      res.render("cs-edit", {"cs": cs, "conditions": conditions});
    });
  });

});

router.post('/new', function(req, res) {
  
  res.render("cs-new");

});

module.exports = router;
