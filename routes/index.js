var express = require('express');
var router = express.Router();
var Cs = require('./../models/cs');
var City = require('./../models/city');
var Training = require('./../models/training');

var synaptic = require('synaptic');

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

    var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;
    
    var myNet = new Architect.Perceptron(4, 4, 1);
    var trainer = new Trainer(myNet);

    var trainingSet = [];

    allTraining.forEach(function(item){
      trainingSet.push({
        input: item.getInput(),
        output: item.getOutput()
      });
    });

    trainer.train(trainingSet);

    var test = new Training ({
          sv: req.body.sv,
          kp: req.body.kp,
          count: req.body.count,
          power: req.body.power,
          result: req.body.result,  
    });

    console.log(test);

//    console.log("set: \n" + trainingSet + "\nresult: " + myNet.activate(test.getInput));

    /*trainingSet.push({
      activate: test,
      result: myNet.activate(test)
    });*/

    res.json(trainingSet);
  });

});


module.exports = router;
