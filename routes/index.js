var express = require('express');
var router = express.Router();
var Cs = require('./../models/cs');
var City = require('./../models/city');

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
  
  //console.log(req.param);
  res.json(req.body);

});


module.exports = router;
