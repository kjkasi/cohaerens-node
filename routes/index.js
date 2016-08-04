var express = require('express');
var router = express.Router();
var Cs = require('./../models/cs');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  Cs.find({}, function(err, allCs) {
    if (err) throw err;
    //console.log(allCs);
    res.render('index', { title: 'Сohaerens', "allCs": allCs});
  });

  //res.render('index', { title: 'Сohaerens' });
});

router.post('/', function(req, res) {
  
  //console.log(req.param);
  res.json(req.body);

});


module.exports = router;
