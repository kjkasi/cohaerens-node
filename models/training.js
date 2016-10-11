var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Training = new Schema({
  cs:  Schema.Types.ObjectId,
  sv:  Boolean,
  kp:  Number,
  count:  Number,
  power:  Number,
  city:  Schema.Types.ObjectId
});

module.exports = mongoose.model('Training', Training);