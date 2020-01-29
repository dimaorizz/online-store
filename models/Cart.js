const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    items: {
        type: Array,
        default: [],
    },
})

module.exports = mongoose.model('cart', CartSchema)