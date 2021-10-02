const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    profilePic : {
        type : String
    },
    coverPhoto : {
        type : String
    },
    name:{
        type : String,
        required :true
    },
    username:{
        type : String,
    },
    password:{
        type : String
    },
    phone:{
        type : String
    },
    email:{
        type:String
    },
    about : {
        type : String,
    },
    userInfo : {  
        type : String,
    },
    tweets :{
        type : Array,
        default : [] 
    },
    following : {
        type : Array,
        default : [] 
    },
    followers : {
        type : Array,
        default : [] 
    },
    birthDate:{
        type : String,
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('User', userSchema);