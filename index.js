var express = require('express');
//var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var useCtnt = require('./routes/use');
var Deposit = require('./routes/deposit');
var api     = require('./routes/api');

var app = express();

app.set('views', './public');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var uri = process.env.MONGODB_URI || 'mongodb://localhost/ipkm-lunch' ;
//var uri = 'mongodb://localhost/ipkm-lunch';
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

app.get('/', (req, res) => {

  var list = [
    {
          "date": "20160603",
          "code": "01",
          "name": "CNY",
          "amt": 300
      },
      {
        "date": "20160603",
        "code": "04",
        "name": "CNY",
        "amt": 200
      },
  ];
  res.render('grid', { "title" : "grid title", "list" : list } );
});

var port = process.env.PORT || 3000 ;
app.listen(port, () => {
  console.log("express server is running");
});
