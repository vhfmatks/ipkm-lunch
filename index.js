var express = require('express');
//var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var useCtnt = require('./routes/use');
var Deposit = require('./routes/deposit');
var api     = require('./routes/api');

var app = express();


var uri = process.env.MONGODB_URI;
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('connected to mongod server');
});
mongoose.connect(uri);

//app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/use', useCtnt);
app.use('/deposit', Deposit);
app.use('/api', api);

var port = process.env.PORT || 80 ;
app.listen(port, () => {
  console.log("express server is running");
});
