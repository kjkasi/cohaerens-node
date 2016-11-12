var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var moment = require('moment');

var Condition = new Schema({
  title: String,
  cs:   {type: Schema.Types.ObjectId, ref: 'Cs'},
  sv:  Number,
  kp:  Number,
  count:  Number,
  power:  Number,
  place:  {type: Schema.Types.ObjectId, ref: 'Place'},
  date: Date,
  result: String
});

Condition.methods.getDateFormat = function() {
  //2014-01-02T11:42:13.510
  return moment(this.date).format("YYYY-MM-DDTHH:mm:ss");

};

module.exports = mongoose.model('Condition', Condition);