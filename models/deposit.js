var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var depositSchema = new Schema(
  {
    month : String,     //해당월 ex)2017-09-01
    user  : String,
    amt   : Number,
    date  : String,     //입금일자
    hash_key : String,
  }
);

module.exports = {
  mongo : mongoose.model('deposit', depositSchema) ,
  objecId : function() { var newId = new mongoose.Types.ObjectId(); return newId}
}
