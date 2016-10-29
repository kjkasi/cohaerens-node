var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Training = new Schema({
  cs:   {type: Schema.Types.ObjectId, ref: 'Cs'},
  sv:  Boolean,
  kp:  Number,
  count:  Number,
  power:  String,
  city:  {type: Schema.Types.ObjectId, ref: 'City'}
});

Training.methods.convert = function() {

	var neurons = "test";
	return neurons;
};

module.exports = mongoose.model('Training', Training);