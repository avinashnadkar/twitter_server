const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = mongoose.Schema({
    u_id : {
        type: Schema.ObjectId, 
        ref: 'User'
    },
    name:{
        type : String
    },
    username:{
        type : String
    },
    tweet : {
        type : String
    },
    media : {
        type : String
    },
    whoCanReply : {
        type : String
    },
    likes : [
        {
            user:{ 
                type: Schema.ObjectId, 
                ref: 'User' 
            },
            avatar : {
                type : String
            },
            name:{
                type : String
            },
            username:{
                type : String
            },
            date: {
                type: Date,
                default: Date.now
            },
            _id : false 
        }
    ],
    reply : [
        {
            user:{ 
                type: Schema.ObjectId, 
                ref: 'User' 
            },
            comment : {
                type : String
            },
            avatar : {
                type : String
            },
            name:{
                type : String
            },
            username:{
                type : String
            },
            date: {
                type: Date,
                default: Date.now
            },
            _id : false 
        }
    ],
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Tweet',tweetSchema);