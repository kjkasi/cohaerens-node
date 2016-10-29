var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Training = new Schema({
  cs:   {type: Schema.Types.ObjectId, ref: 'Cs'},
  sv:  Number,
  kp:  Number,
  count:  Number,
  power:  Number,
  city:  {type: Schema.Types.ObjectId, ref: 'City'},
  result: Number
});

Training.methods.getInput = function() {

	var inputArr = [];
	inputArr.push(this.sv);
	inputArr.push(this.kp / 10);
	inputArr.push(this.count / 4);
	inputArr.push(this.power / 5);

	return inputArr;
};

Training.methods.getOutput = function() {

	var outputArr = [this.result];

	return outputArr;
};

module.exports = mongoose.model('Training', Training);