
sendETH = () =>{
    console.log("xxxxaxa");
    var address = document.getElementById("publickey").value;
    var value = document.getElementById("value").value;
    console.log("address", address, value);
    axios.post('/api/sendEther',{to : address,amount : value}).then((result) =>{
        console.log(result, result.data.status);
        if(result.data.status){
            return swal({
                title : "success",
                text: "your transaction Id:" + `${result.data.data}`,
                icon : "success"
            })
        }
        else if(!result.data.status) {
            return swal({
                title : "Error",
                text: result.data.message,
                icon : "warning"
            })
        }
        else {
            return swal({
                title : "error",
                text : "Internal Server Error",
                icon: "warning"
            })
        }
    }).catch((e)=>{
        return swal({
            title : "error",
            text : "Internal Server Error",
            icon: "warning"
        })
    })
}



