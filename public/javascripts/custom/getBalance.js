getBalance = () =>{
    var address = document.getElementById("eth").value
   axios.post('api/getBalance', {address : address}).then((resp) =>{
       console.log("response", resp);
       if(resp.data.status) {
           console.log(resp.data);
           document.getElementById("balance").innerText =resp.data.data;
       }

   })
   }