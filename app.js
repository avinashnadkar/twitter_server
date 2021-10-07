const express = require('express');
require('dotenv').config()
const mongoose = require("mongoose")
const cors = require("cors")
const app = express();
const port = process.env.PORT || 2345;
const usersRouter = require('./Routers/users')
const tweetsRouter = require('./Routers/tweets')

//middlewares
app.use(express.json());
app.use(cors());

//Connect to database. the username and password is safe in .env file
mongoose.connect(process.env.DB_URI,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

//TO check if databse connected
const db = mongoose.connection;
db.once('open', () => console.log('connected to db'))


//Route req to users Router
app.use('/users',usersRouter)
//Route req to users Router
app.use('/tweets',tweetsRouter)

app.listen(port, (err)=>{
   if(err){
       console.log(err)
   }else{
       console.log('Server is running in port no 2345')
   }
})
