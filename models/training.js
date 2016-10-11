var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Training = new Schema({
  cs:   {type: Schema.Types.ObjectId, ref: 'Cs'},
  sv:  Boolean,
  kp:  Number,
  count:  Number,
  power:  Number,
  city:  {type: Schema.Types.ObjectId, ref: 'City'}
});

module.exports = mongoose.model('Training', Training);