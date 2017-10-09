var express = require('express');
var router = express.Router();

var Usectnt = require('../models/use');

router.get('/', (req, res) => {

  Usectnt.find( (err, result) => {
    if(err) { res.json({ "result" : 0, "error" : err }); return ;}
    res.json(result);
  });
});

router.put('/', (req, res) => {
  var updateCnt = 0;
  for( i in req.body ){
    console.log('getNewid' , Usectnt.getNewId('a'));
    if(req.body[i]._id == null){
      //req.body[i]._id = new mongoose.Types.ObjectId();

      console.log(req.body[i]._id);
    }
    Usectnt.update( {'_id':req.body[i]._id}, {$set:{ "use_place":req.body[i].use_place,
                                                     "use_date" :req.body[i].use_date,
                                                     "use_amt"  :req.body[i].use_amt   }
                                              }
                   , {upsert:true}, (err,out) => {
       if(err) console.log(err);
       else updateCnt ++ ;
    });
  }
  res.json({message : "success", update : updateCnt});

  // Usectnt.updateMany({}, {$set:req.body}, (err, output) => {
  //   res.json({ message : req.body});
  // });
  //res.json({ message : req.body});
  // Usectnt.update({_id:req.params.use_id}, {$set: req.body},{upsert:true}, (err, output) =>{
  //   console.log(output);
  //   if(err) return res.status(500).json({error:"databse error"});
  //   if(!output.n) return res.status(404).json({error:'book not found'});
  //   res.json({message : 'use updated'});
  // });
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
