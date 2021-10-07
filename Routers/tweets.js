const router = require('express').Router();
let Tweet = require('../Models/tweetModel');
const checkAuth = require('../Middlewares/checkAuth')


router.post('/tweet', checkAuth, (req,res)=>{
     let newTweet = new Tweet({
         name : req.body.name,
         tweet : req.body.tweet,
         whoCanReply : req.body.whoCanReply
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
})


module.exports = router;
