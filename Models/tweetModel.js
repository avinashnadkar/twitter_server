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
    tweet : {
        type : String
    },
    whoCanReply : {
        type : String
    },
    reply : [
        {
            user:{ 
                type: Schema.ObjectId, 
                ref: 'User' 
            },
            comment : {
                type : String
            }
        }
    ],
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Tweet',tweetSchema);