const express = require('express');
const app = express();

app.get('/',(res,req)=>{
    req.send('server is running')
})

app.listen(2345, (err)=>{
   if(err){
       console.log(err)
   }else{
       console.log('Server is running in port no 2345')
   }
})
