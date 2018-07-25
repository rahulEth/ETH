var util  = require('ethereumjs-util');
var hdkey = require('ethereumjs-wallet/hdkey');
var bip39 = require('bip39');

Createhdaddress = () =>{
    var count =0;
    var mnemonicseed     =  bip39.mnemonicToSeed(process.env.mnemonicphrase , process.env.passphrase);
    var hdwallet         =  hdkey.fromMasterSeed(mnemonicseed);
    var path             =   "m/44'/60'/0'/0/" + count;
    var childwallet      =  hdwallet.derivePath(path).getWallet();
    var childaddress     =  util.bufferToHex(childwallet.getAddress());
    console.log("childaddress", childaddress);
}

module.exports = {Createhdaddress};
