var express = require('express');
var router = express.Router();

var Usectnt = require('../models/use');

router.get('/', (req, res) => {
  console.log(req.body);
  Usectnt.find( (err, result) => {
    if(err) { res.json({ "result" : 0, "error" : err }); return ;}
    res.json(result);
  });
});

router.post('/', (req, res) => {
  var useCtnt = new Usectnt();

  console.log(req.body.use_place);
  console.log(req.body.use_amt);
  console.log(req.body.use_date);

  useCtnt.use_place = req.body.use_place;
  useCtnt.use_amt   = req.body.use_amt;
  useCtnt.use_date  = Date.parse(req.body.use_date);

  useCtnt.save( (err) => {
    if(err) {
      console.error(err);
      res.json({result:0});
      return;
    }
    res.json({result:1});
  })
});


module.exports = router;
