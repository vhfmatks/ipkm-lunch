var express = require('express');
var router = express.Router();

var Usectnt = require('../models/use');

router.get('/', (req, res) => {

  Usectnt.mongo.find( (err, result) => {
    if(err) { res.json({ "result" : 0, "error" : err }); return ;}
    res.json(result);
  });
});

router.put('/', (req, res) => {
  var updateCnt = 0;
  for( i in req.body ){
    if(req.body[i]._id == null){
      req.body[i]._id = Usectnt.objecId();
    }
    Usectnt.mongo.update( {'_id':req.body[i]._id}, {$set:req.body[i]}
                   , {upsert:true}, (err,out) => {
       if(err) console.log(err);
       else updateCnt ++ ;
    });
  }
  res.json({message : "success", update : updateCnt});
});

router.post('/', (req, res) => {
  console.log('post' + req.body);
  res.json({ message : req.body});
  // var useCtnt = new Usectnt();
  //
  // console.log(req.body.use_place);
  // console.log(req.body.use_amt);
  // console.log(req.body.use_date);
  //
  // useCtnt.use_place = req.body.use_place;
  // useCtnt.use_amt   = req.body.use_amt;
  // useCtnt.use_date  = Date.parse(req.body.use_date);
  //
  // useCtnt.save( (err) => {
  //   if(err) {
  //     console.error(err);
  //     res.json({result:0});
  //     return;
  //   }
  //   res.json({result:1});
  // })
});


module.exports = router;
