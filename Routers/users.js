const router = require('express').Router();
require('dotenv').config()
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')
let User = require('../Models/userModel');

router.get('/',(req,res)=>{
    res.send('server is running')
})

//Register user
router.post('/signup', async (req,res)=>{
       
       //validate email and phone
    //    let findUser =  User.findone({email: req.body.email}).then(u=>{
    //        if(u){
    //           return res.status(400).json({
    //               "error" : "this user already exist" 
    //           })
    //        }
    //    })


       //hash password before post
       let hashedPasswrod = await bcrypt.hash(req.body.password,10);

       const newUser = new User({
        name : req.body.name,
        password : hashedPasswrod,
        phone : req.body.phone,
        email : req.body.email,
        birthDate : req.body.birthDate
   })
       
   //Create new JWT token (throwing error at this time need to be resolved)
   let name =  req.body.name
   const token = await JWT.sign({
       name
   }, process.env.KEY,{
       expiresIn : 72000000
   })

   //post data in database
    newUser.save()
    .then(()=>{
        res.json({
            token : token
        })
    }).catch((err)=>{
        res.status(400).json("error :" + err)
    })
})

module.exports = router;