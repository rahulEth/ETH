var Web3 = require('web3');
if (typeof web3 !== 'undefined')
{
    web3 = new Web3(web3.currentProvider);
}
else {
    web3 = new Web3(new Web3.providers.HttpProvider((process.env.networkType == 'testnet')?"https://rinkeby.infura.io/E0reoKQkjEo01Plq11VC":"https://mainnet.infura.io/E0reoKQkjEo01Plq11VC"));   //infura  https://rinkeby.infura.io/35NMhGPnpdBumCX2sWXp
//https://ethtest.devgenesis.com
}


//web3 = new web3(new web3.providers.HttpProvider("http://52.42.44.222:8547/"));
// if(!web3.utils.isConnected()){
//     console.log('Port=3000--------- web3 connection failed ---------');
// }
web3.eth.net.isListening(function(err, status){
    if(err || err == 'undefined'){
        console.log("Not able to connect with Ehtereum peers please try again")
    }
    else{
        web3.eth.getBlockNumber(async function(err, block){
            if(err){
                console.log("port=5000==>connection to web3 error", err);
            }
            if(process.env.networkType=='' || process.env.networkType=='testnet'){
                console.log(`Port=3000==>connection to web3 ${process.env.networkType} client==>`,'geth network=>',process.env.networkType,',latest block=>',block,',network id=>',await web3.eth.net.getId());
            }
            else{
                console.log(`Port=3000==>connection to web3 ${process.env.networkType} client==>`,'geth network=>',process.env.networkType,',latest block=>',block,',network id=>',await web3.eth.net.getId());
            }
        })
    }
})



module.exports = web3;
