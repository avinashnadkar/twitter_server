const router = require('express').Router();
let User = require('../Models/userModel');

router.get('/',(req,res)=>{
    res.send('server is running')
})

//Register user
router.post('/',(req,res)=>{
       const newUser = new User({
        // profilePic :  null,
        // coverPhoto : null,
        name : req.body.name,
        // username : req.body.username,
        password : req.body.password,
        phone : req.body.phone,
        email : req.body.email,
        birthDate : req.body.birthDate
        // about : req.body.about,
        // userInfo : req.body.user_info,
        // tweets : req.body.tweets
        // following :  req.body.tweets,
        // followers :  req.body.tweets
   })

    newUser.save()
    .then(()=>{
        res.json("New user added")
    }).catch((err)=>{
        res.status(400).json("error :" + err)
    })
})

module.exports = router;