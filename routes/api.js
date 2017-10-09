var express = require('express');
var router = express.Router();

var Usectnt = require('../models/use');
var Deposit = require('../models/deposit');

var keyboard = {
  "type": "buttons",
  "buttons": ["잔액확인","사용내역","입금확인"]
}
var useKeyboard = {
  "type": "buttons",
  "buttons": ["3개월","1년","HOME"]
}

router.get('/keyboard', (req, res) => {
  res.json(keyboard);
});

router.post('/message', (req, res) => {

  switch(req.body.content){

    case "HOME":
      res.json(setSendText("HOME", keyboard));
      break;

    case "잔액확인":
      getSum( (retAmt) => {
        res.json(setSendText("잔액 : "+ retAmt+"원", keyboard));
      });
      break;

    case "사용내역":
      getUseCtnt(1, (resText) => {res.json(setSendText(resText, useKeyboard));});
      break;

    case "3개월":
      getUseCtnt(3, (resText) => {res.json(setSendText(resText, useKeyboard));});
      break;

    case "1년":
      getUseCtnt(12, (resText) => {res.json(setSendText(resText, useKeyboard));});
      break;

    case "입금확인":
      res.json(setSendText("이름을 입력해주세요."));
      break;

    default :
      getDeposit(req.body.content, (resText) => {
        if(resText == "" ) res.json(setSendText("undefined", keyboard));
        else               res.json(setSendText(resText, keyboard));
      });
      break;
  }
});

function setSendText(p_text, p_keyboard){
  return {
    "message" : { "text": p_text },
    "keyboard": p_keyboard
  }
}
//사용내역 확인 함수
function getUseCtnt(p_month, callback){
  var fromDate = new Date();
  var toDate   = new Date();
  fromDate.setMonth( fromDate.getMonth() - p_month );

  var resText = "";
  var totalAmt = 0;
  Usectnt.mongo.find( {"use_date":{ "$gt":fromDate , "$lt":toDate } },
              (err, result) =>{

    for(i in result){
      console.log("ymd : " , result[i].use_date.toISOString());

      resText += result[i].use_place.substring(0,4)  + "/"
               + result[i].use_date.toISOString().substring(2,10).trim()+ "/"
               + result[i].use_amt.toLocaleString() + "\n";
      totalAmt += result[i].use_amt ;
    }
    resText += "------------------------\n"
             + "합계 : " + totalAmt.toLocaleString();
    callback(resText);

  });
}
//입금내역 확인 함수
function getDeposit(user_name, callback){
  var resText = user_name + "\n"
              + "해당월/입금액/입금일자\n";
  Deposit.find( {"user":user_name} , (err, result) => {
    if(err) { console.log(err) ; callback(resText); }
    if(result == "") { resText = "" }
    for( i in result ){
      resText += String(result[i].month.getYear()).substring(1,4) + '.' + ( result[i].month.getMonth() +1) + '월/'
               + result[i].amt.toLocaleString() + '/'
               + result[i].use_date.toISOString().substring(2,10).trim() + '\n';
    }
    callback(resText);
  });
}

// 잔액확인 함수
function getSum(callback){
  var retAmt = 0;
  Usectnt.mongo.aggregate([
    { $group : {_id : null, total : { $sum : "$use_amt" }}}
 ]).exec((err, result) => {
   retAmt = -1* result[0].total;
   Deposit.aggregate([
     { $group : {_id : null, total : { $sum : "$amt" }}}
   ]).exec((err, result2) => {
     retAmt = retAmt + result2[0].total;
     callback(retAmt.toLocaleString());
   });
 });
}
module.exports = router;
