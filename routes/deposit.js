var express = require('express');
var router = express.Router();
var Deposit = require('../models/deposit');

router.get('/', (req, res) => {
  Deposit.mongo.find( (err, result) => {
    console.log(result);
    if(err) { res.json({ "result" : 0, "error" : err }); return ;}
    res.json(result);
  });
});

router.put('/', (req, res) => {
  //console.log(req.body[0]);
  var updateCnt = 0;
  for( i in req.body ){
    if(req.body[i]._id == null){
      req.body[i]._id = Deposit.objecId();
    }
    Deposit.mongo.update( {'_id':req.body[i]._id}, {$set:req.body[i]}
                   , {upsert:true}, (err,out) => {
       if(err) console.log(err);
       else updateCnt ++ ;
    });
  }
  res.json({message : "success", update : updateCnt});
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

  deposit.mongo.save( (err) => {
    if(err) {
      console.error(err);
      res.json({result:0});
      return;
    }
    res.json({result:1});
  })
});
router.delete('/', (req, res) => {
  for(i in req.body){
    Deposit.mongo.remove({_id:req.body[i]._id}, (err, out) => {
      if(err) console.log(err);
      //console.log(out.CommandResult.result);
    })
  }
  res.json(req.body);
});

module.exports = router;
