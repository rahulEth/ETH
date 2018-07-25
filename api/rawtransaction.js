var web3 = require('../web3');
var hdkey = require('ethereumjs-wallet/hdkey');
var bip39 = require('bip39');
var bignumber = require('bignumber.js');
var ethereumTx = require('ethereumjs-tx');
var util = require('ethereumjs-util');
sendFunds = async (req, res)=>{
    var to = req.body.to;
    var val = req.body.amount;
    var count = 0;
    var ether = bignumber(val).multipliedBy(Math.pow(10, 18)).toString();
    if(val > 0){
        if(web3.utils.isAddress(to)){
            var mnemonicseed     =  bip39.mnemonicToSeed(process.env.mnemonicphrase , process.env.passphrase);
            var hdwallet         =  hdkey.fromMasterSeed(mnemonicseed);
            var path             =  "m/44'/60'/0'/0/" +count;
            var childwallet      =  hdwallet.derivePath(path).getWallet();
            var address          =  util.bufferToHex(childwallet.getAddress());
            var privateKey       =  childwallet._privKey;
            var nonce            =  await web3.eth.getTransactionCount(address);
            var gasPrice         =  web3.utils.toHex(21000000000);
            var gasLimit         =  web3.utils.toHex(21000);
            var value            =  web3.utils.toHex(ether);
            var balanceinWei     =  await web3.eth.getBalance(address);
            var txFeeinWei       =  bignumber(21000*21000000000);
            var effbalance       =  bignumber(balanceinWei -txFeeinWei).toString();
            if(parseFloat(effbalance) >= parseFloat(ether))
            {
                const txParams = {
                    nonce: nonce,
                    gasPrice: gasPrice,
                    gasLimit: gasLimit,
                    to: to,
                    value: value,
                // EIP 155 chainId - mainnet: 1, ropsten: 3
                    chainId: 4
                }
                const tx = new ethereumTx(txParams);
                tx.sign(privateKey);
                const serializedTx = '0x'+tx.serialize().toString('hex')
                console.log("serializedTx" ,serializedTx);
                try{
                    web3.eth.sendSignedTransaction(serializedTx)
                    .on('transactionHash', function(hash){
                    console.log('hash',hash)
                    return res.send({status:true ,message : "success" ,data : hash})
                    }).catch(err=>{
                        //console.log("err", err);
                    })
                }
                catch(error){
                    console.log("Internal server error please try again", error);
                }
            }
            else{
                return res.send({status: false, message: 'Insufficient Balance For Gas * Price + Value'})
            }
        }
        else{
            return res.send({status: false, message: 'This is not a valid ethereum address'})
        }
    }
    else{
        return res.send({status : false, message : 'value should be greater than zero'})
    }


}

module.exports = {sendFunds};