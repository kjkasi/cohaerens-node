var express = require('express');
var router = express.Router();
var Cs = require('./../models/cs');
var City = require('./../models/city');
var Training = require('./../models/training');

var synaptic = require('synaptic');

router.get('/', function(req, res, next) {

  /*
  Training.find({}).populate('city').exec(function (err, allTraining){
    res.json(allTraining);
  });s
*/

  Training.find({}).populate('city').populate('cs').exec(function(err, allTraining){
    if (err) throw err;
    Cs.find({}, function(err, allCs) {
      if (err) throw err;
      City.find({}, function(err, allCity) {
        if (err) throw err;
        //res.json(allTraining);
        res.render('training', {"allCs": allCs, "allCity": allCity, "allTraining": allTraining});
      });
    });
  });
/*
  Training.find({}, function(err, allTraining){
    Cs.find({}, function(err, allCs) {
      if (err) throw err;
      City.find({}, function(err, allCity) {
        if (err) throw err;
        //res.json(allTraining);
        res.render('training', {"allCs": allCs, "allCity": allCity, "allTraining": allTraining});
      });
    });    
  }); */

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

  City.findById(req.body.city, function(err, city){

    if (err) throw err;
    var training = new Training ({
          cs: req.body.cs,
          sv: req.body.sv,
          kp: req.body.kp,
          count: req.body.count,
          power: req.body.power,
          city: city._id,
          result: req.body.result,  
      });

    //res.json(training);

    
    training.save(function(err){

      if (err) throw err;
      res.redirect('training');

    });
  });

});

router.post('/:id/delete', function(req, res) {
  
  //res.redirect("/city");
  Training.findById(req.params.id, function (err, training) {
    training.remove();
    res.redirect("/training");
  });

  //res.sendStatus(200);
  
});

router.get('/:id/edit', function(req, res) {
  
  res.sendStatus(200);

});

router.post('/new', function(req, res) {
  
  res.render("training-new");

});

module.exports = router;
