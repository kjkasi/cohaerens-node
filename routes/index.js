var express = require('express');
var router = express.Router();
var Cs = require('./../models/cs');
var City = require('./../models/city');
//var Training = require('./../models/training');

//var synaptic = require('synaptic');

var Condition = require('./../models/condition');

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

  //res.json(req.body);

  console.log("req.body: " + req.body);

  Condition.findOne({cs: req.body.cs, sv: req.body.sv, kp: req.body.kp, count: req.body.count, power: req.body.power, city: req.body.city}, function(err, condition) {

    console.log("condition: " + condition);

    if (err) throw err;
    Cs.find({}, function(err, allCs) {
      if (err) throw err;
      City.find({}, function(err, allCity) {
        if (err) throw err;
        //res.json(condition);
        res.render('index', { title: 'Сohaerens', "allCs": allCs, "allCity": allCity, info: "Информация:" + condition.result});
      });
    });

    
    //res.render('index', { title: 'Сohaerens', "allCs": allCs, "allCity": allCity, info: "Информация:" + condition.result});

  });

  /*Training.find({city: req.body.city, cs: req.body.cs}, function(err, allTraining){
    if (err) throw err;

    var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;
    
    var myNet = new Architect.Perceptron(4, 4, 1);
    var trainer = new Trainer(myNet);

    var trainingSet = [];

    for (var i = 0; i < allTraining.length; i++) {

      item = allTraining[i];

      trainingSet.push({
        input: item.getInput(),
        output: item.getOutput()
      });
    }

    trainer.train(trainingSet);

    var test = new Training ({
          sv: req.body.sv,
          kp: req.body.kp,
          count: req.body.count,
          power: req.body.power,
          result: req.body.result,  
    });

    console.log(test.getInput());

    Cs.find({}, function(err, allCs) {
      if (err) throw err;
      City.find({}, function(err, allCity) {
        if (err) throw err;
        res.render('index', { title: 'Сohaerens', "allCs": allCs, "allCity": allCity, info: "Вероятность:" + myNet.activate(test.getInput())});
      });
    });
  });*/

});


module.exports = router;
