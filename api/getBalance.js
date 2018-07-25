
var axios = require('axios');
var web3 = require('../web3');

etherBalance = (req, res)=>{
    var address = req.body.address
    web3.eth.getBalance(address).then((result) =>{
            if(result){
                var result = result/Math.pow(10,18);
                return res.json({status : true , message : "got your balance" ,data : result})
            }
            else return res.json({status : false, message : "somthing wrong happend" })
        }).catch((e)=>{
            console.log("#####" ,e);
        });
}
module.exports = {etherBalance};