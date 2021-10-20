const router = require('express').Router();
require('dotenv').config()
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')
let User = require('../Models/userModel');
const checkAuth = require('../Middlewares/checkAuth.js');
const { findById } = require('../Models/userModel');

router.get('/', (req, res) => {
    res.send('server is running')
})

//Register user
router.post('/signup', async (req, res) => {

    //validate email and phone
    //    let findUser =  User.findone({email: req.body.email}).then(u=>{
    //        if(u){
    //           return res.status(400).json({
    //               "error" : "this user already exist" 
    //           })
    //        }
    //    })


    //hash password before post
    let hashedPasswrod = await bcrypt.hash(req.body.password, 10);
   
    //create default username
    let userName = "@";
    let spaceIncluded = false;
    for(let i=0;i<req.body.name.length;i++){
        if(req.body.name[i] == " "){
            spaceIncluded = true
            break;
        }
    }
    if(spaceIncluded){
        let arr = req.body.name.split(" ");
        for(let j=0;j<arr.length;j++){
             userName += arr[j];
        }
    }else{
        userName += req.body.name
    }


    const newUser = new User({
        name: req.body.name,
        password: hashedPasswrod,
        phone: req.body.phone,
        email: req.body.email,
        birthDate: req.body.birthDate,
        username : userName
    })

    //Create new JWT token (throwing error at this time need to be resolved)
    let name = req.body.name
    const token = await JWT.sign({
        name
    }, process.env.KEY, {
        expiresIn: 72000000
    })

    //post data in database
    newUser.save()
        .then((user) => {
            res.json({
                status: "success",
                code: 200,
                message: "Welcome to Twitter.",
                results: {
                    token: token,
                    u_id: user._id,
                    name: user.name,
                    username: user.username,
                    avtar: user.profilePic
                }
            })
        }).catch((err) => {
            res.status(400).json("error :" + err)
        })
})

//Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).send('Invalid Email or Password.')

    // let user = User.find(user=>{
    //     return user.email === email
    // })

    // if(!user){
    //     return res.status(400).json({
    //         "errors" : [{"msg" : "invalid credentials"}]
    //     })
    // }

    let isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).json({
            "errors": [{ "msg": "invalid credentials" }]
        })
    }

    //Create new JWT token 
    let name = email
    const token = JWT.sign({
        name
    }, process.env.KEY, {
        expiresIn: 72000000
    })

    res.json({
        status: "success",
        code: 200,
        message: "Welcome to Twitter.",
        results: {
            token: token,
            u_id: user._id,
            name: user.name,
            username: user.username,
            avtar: user.profilePic,
        }
    })
})


//Get all users
router.get('/all', checkAuth, (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        }).catch(err => {
            res.status(400).json('Error :' + err)
        })
})

//Get user info
router.get('/:id', checkAuth, (req, res) => {
    let id = req.params.id;
    User.findById(id)
        .then(user => {
            if (user != null) {
                res.json({
                    avtar: user.profilePic,
                    coverPhoto: user.coverPhoto,
                    name: user.name,
                    username: user.username,
                    about: user.about,
                    phone: user.phone,
                    email: user.email,
                    following: user.following,
                    followers: user.followers,
                    status: user.status,
                    birthDate: user.birthDate
                })
            } else {
                res.status(400).json({
                    "errors": [{ "msg": "invalid user id" }]
                })
            }
        }).catch(err => {
            res.status(400).json('Error:' + err)
        })
})

//Follow A user
router.post('/follow/:id', checkAuth, (req, res) => {

    let followPersonId = req.params.id
    let followerId = req.body.u_id
    let followrName = req.body.name
    let followrUserName = req.body.username

    //First push followers name in persons followers array
    User.findByIdAndUpdate(followPersonId, {
        $push: {
            followers:
            {
                user : followerId,
                name : followrName,
                userName : followrUserName
            }
        }
    }).then(user => {
        //Second push in folllowing persons name in users following array
        User.findByIdAndUpdate(followerId, {
            $push: {
                following:
                {
                    user : followPersonId,
                    name : user.name,
                    userName : req.body.username
                }
            }
        }).then(result=>{
            res.status(400).json({
                "msg": "Successfully followed" + " " + user.name
            })
        })
            
        }).catch(err => {
            res.status(500).json(err)
        })

    // res.json(req.params.id)
})



module.exports = router;