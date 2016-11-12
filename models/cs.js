var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cs = new Schema({
  title:  String,
  fqStart: Number,
  fqEnd: Number,
});

module.exports = mongoose.model('Cs', Cs);