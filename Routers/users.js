const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../Models/userModel');

router.get('/',(req,res)=>{
    res.send('server is running')
})

//Register user
router.post('/signup', async (req,res)=>{
       //hash password before post
       let hashedPasswrod = await bcrypt.hash(req.body.password,10)
       const newUser = new User({
        name : req.body.name,
        password : hashedPasswrod,
        phone : req.body.phone,
        email : req.body.email,
        birthDate : req.body.birthDate
   })

    newUser.save()
    .then(()=>{
        res.json("New user added")
    }).catch((err)=>{
        res.status(400).json("error :" + err)
    })
})

module.exports = router;