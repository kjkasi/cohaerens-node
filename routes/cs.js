var express = require('express');
var router = express.Router();
var Cs = require('./../models/cs');
var condition = require('./../models/condition');

router.get('/', function(req, res, next) {
  
  Cs.find({}, function(err, allCs) {
    if (err) throw err;
    res.render('cs', { title: 'Системы связи', "allCs": allCs});
  });
  //res.render('cs', { title: 'Системы связи' });
});

router.post('/', function(req, res) {

  var cs = new Cs ({
        title: req.body.title,
        fqStart: req.body.fqStart,
        fqEnd: req.body.fqEnd,  
    });

  cs.save(function(err){
    if (err) throw err;

    Cs.find({}, function(err, allCs) {
      if (err) throw err;
        res.render('cs');
    });
  });
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
