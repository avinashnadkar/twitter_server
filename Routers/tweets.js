const router = require('express').Router();
let Tweet = require('../Models/tweetModel');
let User = require('../Models/userModel');
const checkAuth = require('../Middlewares/checkAuth')

//Add tweet
router.post('/tweet', checkAuth, (req, res) => {

    let name;
    let username;
    let avtar;

    User.findById(req.body.u_id).then((user) => {
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
                res.status(200).json({
                    msg: "Tweet succsessfully added"
                })
            }).catch((err) => {
                res.status(400).json("error :" + err)
            })

    }).catch(err => {
        console.log(err)
    })


})

//Like the tweet
router.post('/like', checkAuth, (req, res) => {
    let tweetId = req.body.tweet_id;
    let userId = req.body.u_id;

    Tweet.findByIdAndUpdate(tweetId, {
        $push: {
            likes:
            {
                user: userId
            }
        }
    }).then(result => {
        res.status(200).json({
            "msg": "You liked this tweet",
        })
    }).catch(err => {
        res.status(400).json(err)
    })
})

//Reply on tweet
router.post('/reply', checkAuth, (req, res) => {
    let tweetId = req.body.tweet_id;
    let userId = req.body.u_id;
    let reply = req.body.reply;

    User.findById(userId).then(user => {
        Tweet.findByIdAndUpdate(tweetId, {
            $push: {
                reply:
                {
                    user: user._id,
                    name: user.name,
                    username: user.username,
                    avtar: user.profilePic,
                    comment: reply
                }
            }
        }).then(result => {
            res.status(200).json({
                "msg": "Reply successfully added",
            })
        }).catch(err => {
            res.status(400).json(err)
        })
    }).catch(err => {
        res.status(400).json(err)
    })


})

//Get single user tweet
router.get('/tweet/:u_id',checkAuth,(req,res)=>{
    let userId = req.params.u_id;

    Tweet.find({u_id : userId }).then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        res.status(400).json({"Error":err})
    })
})

//Get all tweets
router.get('/tweets', checkAuth, (req, res) => {
    Tweet.find()
        .then(tweet => {
            res.status(200).json(tweet)
        }).catch(err => {
            res.status(400).json('Error :' + err)
        })
})


module.exports = router;
