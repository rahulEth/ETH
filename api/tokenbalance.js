
var config          = require('../config');
var web3            = require('../web3');
var randomstring = require("randomstring");

tokenBalance = (req, res) =>{

                var address         = response.address;
                var contractAddress = process.env.contractAddress;
                var tokenFunction   =  web3.utils.sha3('balanceOf(address)').slice(0,10);
                var data   = web3.utils.sha3('balanceOf(address)').slice(0,10) + randomstring.generate({ length:24, charset:'0'}) + address.substring(2);
                web3.eth.call({to :config.ContractAddress, data : data},(error, result) =>{
                    if(result){
                        var tokenValue = (web3.utils.hexToNumber(result))/Math.pow(10,8);
                        console.log("................" , error,tokenValue);
                        res.send({status: true , message : "success" , data : tokenValue})
                    }
                    else if(error){
                        return res.send({status : false , message : "please try again"})
                    }
                }

    );
}
module.exports = {tokenBalance};