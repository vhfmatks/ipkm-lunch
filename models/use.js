var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var useSchema = new Schema(
  {
    use_place : String,
    use_amt   : Number,
    use_date  : Date,
  }
);

module.exports = mongoose.model('usectnt', useSchema);
