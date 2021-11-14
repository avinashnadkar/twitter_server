const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    avatar: {
        type: String
    },
    coverPhoto: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    about: {
        type: String,
    },
    userInfo: {
        type: String,
    },
    followers: [
        {
            user: {
                type: Schema.ObjectId,
                ref: 'User'
            },
            name: {
                type: String
            },
            username: {
                type: String
            },

            _id: false

        }
    ],
    following: [
        {
            user: {
                type: Schema.ObjectId,
                ref: 'User'
            },
            name: {
                type: String
            },
            username: {
                type: String
            },
            _id: false

        }
    ],
    birthDate: {
        type: String,
    },
    status: {
        type: String,
        default: "active"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);