const router = require('express').Router();
let User = require('../Models/userModel');

router.get('/',(req,res)=>{
    res.send('server is running')
})

//Register user
router.post('/',(req,res)=>{
       const newUser = new User({
        name : req.body.name,
        password : req.body.password,
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