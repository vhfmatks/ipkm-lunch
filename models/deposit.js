var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var depositSchema = new Schema(
  {
    month : Date,     //해당월 ex)2017-09-01
    user  : String,
    amt   : Number,
    date  : Date,     //입금일자
    hash_key : String,
  }
);

module.exports = mongoose.model('deposit', depositSchema);
