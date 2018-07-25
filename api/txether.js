var config = require('../config');
var axios  =require('axios');
var web3   = require('../web3');

transaction = (req,res) =>{
    var txHash = req.body.TxId;
    web3.eth.getTransactionReceipt(txHash).then((response)=>{
        if(response) {
            console.log("response", response);
            web3.eth.getBlock(response.blockNumber).then((result) =>{
            var timestamp   = result.timestamp;
            txHash          = response.transactionHash,
            block           = response.blockNumber,
            _from           = response.from,
            _to             = response.to,
            res.send({status : true , message : "ether send successfully", data :{timestamp:result.timestamp, block :response.blockNumber,from : _from, to: _to}})
  }).catch(e=>{
      console.log("block number error ", e);
  })
//  var IntervalId = setInterval(function() {
//   // var reciept =web3.eth.getTransactionReceipt(txHash);
//   if(web3.eth.getTransactionReceipt(txHash))
//   {
//      console.log("vvvvvvvvv" , web3.eth.getTransactionReceipt(txHash));
//      clearInterval(IntervalId);
//   }

//  }, 2000)


  //var publickey = req.currentUser.publickey;
  // var publickey =req.body.publickey

  // axios.get(`http://rinkeby.etherscan.io/api?module=account&action=txlist&address=${publickey}&startblock=0&endblock=99999999&sort=asc&apikey=${config.etherApiKey}`).then((history) =>{

  //   //console.log("nnnnnn" , history);
  // if(history.status){
  //     //console.log(',,,,,,,,,,,' , history.data.result);
  //     var Tx = history.data.result;
  //     console.log("......" ,Tx);
  //     //var email = req.currentUser.email
  //  Tx.forEach(function(dbstore)
  //   {
  //    //console.log("length" , dbstore.length)
  //    if(dbstore.value >0)
  //       {
  //         var TxHistory = new txHistory({

  //           txHash         :       dbstore.hash,
  //           block          :       dbstore.blockNumber,
  //           timestamp      :       dbstore.timeStamp,
  //           _from          :       dbstore.from,
  //           _to            :       dbstore.to,
  //           amount         :       dbstore.value/10000000000,
  //       //    email          :       email
  //         }) ;


  //         console.log("txHistory" ,TxHistory);
  //         TxHistory.save().then((resp) =>{

  //         console.log("history saved successfully");

  //         //res.send({status : true , message : "success" , resp})

  //           }).catch((e) =>{

  //            console.log ("3" , e);

  //           })

  //     }
  //   } )
  // }
  // }).catch((e) =>{

  //   console.log("error1" ,e);
  // })



}}).catch(e=>{
    console.log("errorrrrrr", e);
})}

 //


module.exports = {transaction};
