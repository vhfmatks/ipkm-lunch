var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var useSchema = new Schema(
  {
    use_place : String,
    use_amt   : Number,
    use_date  : String,
  }
);


module.exports = {
  mongo : mongoose.model('usectnt', useSchema) ,
  objecId : function() { var newId = new mongoose.Types.ObjectId(); return newId}
}
