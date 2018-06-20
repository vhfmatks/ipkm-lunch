var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var useCtnt = require('./routes/use');
var Deposit = require('./routes/deposit');
var api     = require('./routes/api');

var app = express();

app.set('views', './public');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var uri = process.env.MONGODB_URI || 'mongodb://localhost/ipkm-lunch' ;
//var uri = 'mongodb://localhost/ipkm-lunch';
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('connected to mongod server');
});
mongoose.connect(uri);

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/use', useCtnt);
app.use('/deposit', Deposit);
app.use('/api', api);

app.use('/js', express.static(__dirname + '/public/js'));

app.use('/static', express.static('apk'));
app.get('/', (req, res) => {
  res.render('grid', { "title" : "grid title" } );
});
app.get('/sample', (req, res) =>{
  res.render('sample');
});
// app.get('/UseCtnt.js', function(req, res) {
//     res.sendfile('./public/UseCtnt.js');
// });
var port = process.env.PORT || 80 ;
app.listen(port, () => {
  console.log("express server is running");
});
