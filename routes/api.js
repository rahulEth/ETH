var express = require('express');
var router = express.Router();
require('../web3');
var hdaddress  = require('../api/hdwallet');
var rawTx      = require('../api/rawtransaction');
var tokenSend  = require('../api/ERC20tx');
var ethBalance = require('../api/getBalance');
var tokenBalance = require('../api/tokenbalance');
var ethTransaction = require('../api/txether');

/* GET users listing. */
router.get('/', function(req, res, next) {
   res.send('respond with a resource');
});

router.get('/Address', hdaddress.Createhdaddress);
router.post('/sendEther', rawTx.sendFunds);
router.post('/sendToken', tokenSend.sendToken);
//var history = require('../api/txHistory');
router.post('/getBalance', ethBalance.etherBalance);
router.post('/getTransaction', ethTransaction.transaction);

module.exports = router;
