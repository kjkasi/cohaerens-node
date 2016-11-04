var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var Training = new Schema({
  title: String,
  cs:   {type: Schema.Types.ObjectId, ref: 'Cs'},
  sv:  Number,
  kp:  Number,
  count:  Number,
  power:  Number,
  city:  {type: Schema.Types.ObjectId, ref: 'City'},
  date: Date,
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

Training.methods.getDateFormat = function() {
  //2014-01-02T11:42:13.510
  return moment(this.date).format("YYYY-MM-DDTHH:mm:ss");

};

module.exports = mongoose.model('Training', Training);