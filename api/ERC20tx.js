var web3 = require('../web3');
var bip39 = require('bip39');
var hdkey = require('ethereumjs-wallet/hdkey');
var randomstring = require('randomstring');
var bignumber = require('bignumber.js');
var util = require('ethereumjs-util');
var ethereumTx = require('ethereumjs-tx');
var config = require('../config');
sendToken = async (req, res)=>{
var count = 0;
var to = (req.body.to).toUpperCase();
var value = req.body.amount;
    if(value>0){
        if(web3.utils.isAddress(to)){
            var amountInHex       = web3.utils.toHex(bignumber(value).multipliedBy(Math.pow(10,18)).toString())
            var mnemonicseed      = bip39.mnemonicToSeed(process.env.mnemonicphrase, process.env.passphrase)
            var hdwallet          = hdkey.fromMasterSeed(mnemonicseed);
            var path              = "m/44'/60'/0'/0/" + count;
            var childwallet       = hdwallet.derivePath(path).getWallet();
            var childaddress      = util.bufferToHex(childwallet.getAddress());
            var childaddress      = childaddress.toString();
            var privateKey        = childwallet._privKey;
            var balanceinWei      = await web3.eth.getBalance(childaddress);
            var balanceeth        = bignumber(balanceinWei).toString();
            var amountData        = randomstring.generate({length : 66 - amountInHex.length, charset: "0"})  + amountInHex.substring(2);
            var addressdata       = randomstring.generate({length : 24 , charset : "0"}) + to.substring(2);
            var data              = web3.utils.sha3('transfer(address,uint256)').slice(0,10) + addressdata + amountData;
            var txfee             = bignumber(100000*21000000000).toString();
            if(parseFloat(balanceeth) >= parseFloat(txfee)){
                var rawTx = {
                    nonce:  await web3.eth.getTransactionCount(childaddress),
                    gasPrice:  web3.utils.toHex(21000000000),
                    gasLimit:  web3.utils.toHex(100000),
                    to: config.ContractAddress,
                    data: data,
                    // chainId : 4
                }
                var tx = new ethereumTx(rawTx);
                tx.sign(privateKey);
                var serializedTx = '0x' + tx.serialize().toString('hex');
                web3.eth.sendSignedTransaction(serializedTx, (error, result) =>{
                    if(error || error == 'undefined'){
                        return res.send({status : false , message : "due to some resion,Transaction was not successful please try again"});
                    }
                    else{
                        console.log("result", result);
                        return res.send({status : true , message : "Transaction has been initiated" , data : result})
                    }
                    
                }).on(receipt=>{
                    //console.log("receipt...", receipt)
                }).on(error=>{
                    console.log("error", error);
                });
            }
            else {
                return  res.send({status : false, message : "Please make sure you have proper ETH for gas fee"})
            }    
        }
        else{
            console.log("Please enter correct ethereum address");
        }
    }
    else{
        console.log('value should be greater than zero');
    }
  

}

module.exports = {sendToken};