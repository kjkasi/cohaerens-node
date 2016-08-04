var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('./../models/account');

//need authorization verify
router.get('/accounts', function(req, res) {

  Account.find({}, function(err, users) {
    if (err) throw err;
    //console.log(users);
    res.render('admin-accounts', { "users" : users });
  });

  //res.render('admin-accounts', { accounts : query });
});

//need authorization verify
router.post('/accounts', function(req, res) {

  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {

          Account.find({}, function(err, users) {
            if (err) throw err;
            //console.log(users);
            res.render('admin-accounts', { users : users, info: "Sorry. That username already exists. Try again." });
          });

        } else {

          passport.authenticate('local')(req, res, function () {
            res.redirect('/admin/accounts');
          });
        }
    });
});

//need authorization verify
router.post('/accounts/:id/delete', function(req, res) {

  Account.findOne({"_id" : req.params.id}, function(err, user) {
    //if (err) throw err;
    if (err) {
      res.sendStatus(404);
    } else {
      res.json({user});
    }
  });

  //res.redirect('/');
});

module.exports = router;