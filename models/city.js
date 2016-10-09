var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var City = new Schema({
  title:  String,
  lat: Number,
  long: Number
});

module.exports = mongoose.model('City', City);