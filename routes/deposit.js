var express = require('express');
var router = express.Router();
var Deposit = require('../models/deposit');

router.get('/', (req, res) => {
  var desposit = new Desposit();
  deposit.find( (err, result) => {
    if(err) { res.json({ "result" : 0, "error" : err }); return ;}
    res.json(result);
  });
});

router.post('/', (req, res) => {
  var deposit = new Deposit();

  console.log(req.body.month);
  console.log(req.body.user);
  console.log(req.body.amt);

  deposit.month  = Date.parse(req.body.month);
  deposit.user   = req.body.user;
  deposit.amt    = req.body.amt
  deposit.date   = Date.parse(req.body.date);

  deposit.save( (err) => {
    if(err) {
      console.error(err);
      res.json({result:0});
      return;
    }
    res.json({result:1});
  })
});


module.exports = router;
