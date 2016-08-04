var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cs = new Schema({
  title:  String,
  fqStart: String,
  fqEnd: String
});

module.exports = mongoose.model('Cs', Cs);