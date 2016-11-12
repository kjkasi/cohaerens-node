var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  title:  String,
  lat: Number,
  long: Number
});

//schema.plugin(mongoosePaginate);

var Model = mongoose.model('Place',  schema);

module.exports = Model;