
sendToken = () =>{
    var address = document.getElementById("pubkey").value;
    var value = document.getElementById("val").value;
    console.log("address", address, value);
    axios.post('/api/sendToken',{to : address,amount : value}).then((result) =>{
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



