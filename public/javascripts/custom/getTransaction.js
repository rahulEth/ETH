
getTransaction =()=>{
    var TxId = document.getElementById("TransactionId").value;
    axios.post('/api/getTransaction', {TxId : TxId}).then((result) =>{
        if(result.data.status){
            document.getElementById("ledger").innerText = result.data.data.block;
            document.getElementById("from").innerText = result.data.data.from;
            document.getElementById("to").innerText = result.data.data.to;
            document.getElementById("timestamp").innerText = result.data.data.timestamp;
        }
    })

}