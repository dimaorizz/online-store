const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: { // add bcrypt
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    regDate: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('users', UserSchema);