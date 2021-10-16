const router = require('express').Router();
let Tweet = require('../Models/tweetModel');
let User = require('../Models/userModel');
const checkAuth = require('../Middlewares/checkAuth')


router.post('/tweet', checkAuth, (req, res) => {

    let name;
    let username;
    let avtar;

    User.findById(req.body.u_id).then((user)=>{
        name = user.name
        username = user.username
        avtar = user.profilePic

        let newTweet = new Tweet({
            name: name,
            username: username,
            tweet: req.body.tweet,
            whoCanReply: req.body.whoCanReply,
            u_id: req.body.u_id
        })
        
        //post tweet in database
        newTweet.save()
            .then(() => {
                res.json({
                    msg: "Tweet succsessfully added"
                })
            }).catch((err) => {
                res.status(400).json("error :" + err)
            })

    }).catch(err=>{
        console.log(err)
    })

    
})

//Get all tweets
router.get('/tweets', checkAuth, (req,res) => {
    Tweet.find()
    .then(tweet => {
        res.json(tweet)
    }).catch(err => {
        res.status(400).json('Error :' + err)
    })
})


module.exports = router;
