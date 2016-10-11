var express = require('express');
var router = express.Router();
var Cs = require('./../models/cs');
var City = require('./../models/city');
var Training = require('./../models/training');

var synaptic = require('synaptic');

router.get('/', function(req, res, next) {

  Training.find({}, function(err, allTraining){
    Cs.find({}, function(err, allCs) {
      if (err) throw err;
      City.find({}, function(err, allCity) {
        if (err) throw err;
          res.render('training', {"allCs": allCs, "allCity": allCity, "allTraining": allTraining});
      });
    });    
  });

  /*
  var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;
  
  var myNet = new Architect.Perceptron(2, 2, 1);
  var trainer = new Trainer(myNet);

  console.log('00 ' + myNet.activate([0,0])); // 0.0268581547421616
  console.log('10 ' + myNet.activate([1,0])); // 0.9829673642853368
  console.log('01 ' + myNet.activate([0,1])); // 0.9831714267395621
  console.log('11 ' + myNet.activate([1,1])); // 0.02128894618097928

  var trainingSet = [
  {
    input: [0,0],
    output: [0]
  },
  {
    input: [0,1],
    output: [1]
  },
  {
    input: [1,0],
    output: [1]
  },
  {
    input: [1,1],
    output: [0]
  },
  ]

  trainer.train(trainingSet);

  console.log('00 ' + myNet.activate([0,0])); // 0.0268581547421616
  console.log('10 ' + myNet.activate([1,0])); // 0.9829673642853368
  console.log('01 ' + myNet.activate([0,1])); // 0.9831714267395621
  console.log('11 ' + myNet.activate([1,1])); // 0.02128894618097928

  res.sendStatus(200);
  */
});

router.post('/', function(req, res) {

  var training = new Training ({
        cs: req.body.cs,
        sv: req.body.sv,
        kp: req.body.kp,
        count: req.body.count,
        power: req.body.power,
        city: req.body.city,  
    });

  training.save(function(err){
    if (err) throw err;

    Training.find({}, function(err, allTraining) {
      if (err) throw err;
        res.render('training');
    });
  });
});

router.post('/:id/delete', function(req, res) {
  
  res.sendStatus(200);
  
});

router.get('/:id/edit', function(req, res) {
  
  res.sendStatus(200);

});

router.post('/new', function(req, res) {
  
  res.render("training-new");

});

module.exports = router;
