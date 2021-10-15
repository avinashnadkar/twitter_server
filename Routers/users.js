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

    const newUser = new User({
        name: req.body.name,
        password: hashedPasswrod,
        phone: req.body.phone,
        email: req.body.email,
        birthDate: req.body.birthDate
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
        .then(() => {
            res.json({
                status: "success",
                code: 200,
                message: "Welcome to Twitter.",
                results: {
                    token: token,
                    name: name
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
            avtar : user.profilePic,
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


module.exports = router;